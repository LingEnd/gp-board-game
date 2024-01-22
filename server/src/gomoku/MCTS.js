var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { dirichletK, randomPick } from "./Random";
export function Node(a) {
    return {
        a: a,
        p: 1,
        q: 0,
        w: 0,
        n: 0,
        // null - unexpanded, [] - terminal node, [...] - intermediate node
        children: null,
    };
}
function isLeaf(node) {
    return node.n === 0 || node.children === null || node.children.length === 0;
}
function ucbScore(node, c) {
    return node.q + (c * node.p) / (node.n + 1);
}
function ucbSelectChild(node) {
    var c = 5 * Math.sqrt(node.n);
    var best = node.children[0];
    var bestScore = ucbScore(best, c);
    for (var i = 1; i < node.children.length; i++) {
        var child = node.children[i];
        var score = ucbScore(child, c);
        if (score > bestScore) {
            best = child;
            bestScore = score;
        }
    }
    return best;
}
function applyPrioProb(root, probs, useNoise) {
    if (!useNoise) {
        for (var i = 0; i < root.children.length; ++i) {
            var child = root.children[i];
            child.p = probs[child.a];
        }
        return;
    }
    var dir = dirichletK(root.children.length, 0.03);
    for (var i = 0; i < root.children.length; ++i) {
        var child = root.children[i];
        child.p = dir[i] * 0.25 + 0.75 * probs[child.a];
    }
}
function backprop(path, r) {
    var i = path.length;
    while (i-- > 0) {
        var leaf = path[i];
        leaf.n += 1;
        leaf.w += r;
        leaf.q = leaf.w / leaf.n;
        r = -r;
    }
}
function backpropAndRevertVirtualLoss(path, r) {
    var i = path.length;
    while (i-- > 0) {
        var leaf = path[i];
        leaf.w += r;
        leaf.q = leaf.w / leaf.n;
        r = -r;
    }
}
function applyVirtualLoss(path) {
    var i = path.length;
    while (i-- > 0) {
        var leaf = path[i];
        leaf.n += 1;
        leaf.q = leaf.w / leaf.n;
    }
}
function revertVirtualLoss(path) {
    var i = path.length;
    while (i-- > 0) {
        var leaf = path[i];
        leaf.n -= 1;
        leaf.q = leaf.w / leaf.n;
    }
}
var MCTS = /** @class */ (function () {
    function MCTS(_a) {
        var evaluator = _a.evaluator, maxIteration = _a.maxIteration, maxTime = _a.maxTime, useNoise = _a.useNoise;
        if (!maxIteration && !maxTime)
            throw new Error("maxIteration and maxTime cannot be 0 at same time");
        this._eval = evaluator;
        this._maxIteration = maxIteration;
        this._maxTime = maxTime;
        this._batch = new Set();
        this._batchSize = 8;
        this._useNoise = useNoise;
        this._searching = false;
        this._timer = null;
    }
    MCTS.prototype.exec = function (root, state, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, maxIteration, maxTime, tao, it, probs;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this._searching)
                            throw new Error("another searching is in progress!");
                        _a = __assign({ maxIteration: this._maxIteration, maxTime: this._maxTime, tao: 0.001 }, opts), maxIteration = _a.maxIteration, maxTime = _a.maxTime, tao = _a.tao;
                        if (maxIteration === 0 && maxTime === 0)
                            throw new Error("maxIteration and maxTime cannot be 0 at same time");
                        if (maxTime > 0) {
                            this._timer = setTimeout(function () {
                                _this.stop();
                            }, maxTime);
                        }
                        if (!maxIteration)
                            maxIteration = Number.MAX_SAFE_INTEGER;
                        this._searching = true;
                        it = 0;
                        _b.label = 1;
                    case 1:
                        if (!(it < maxIteration && !this._stop)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._step(root, state.clone())];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        ++it;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this._flush()];
                    case 5:
                        _b.sent();
                        this._searching = false;
                        this._stop = false;
                        clearTimeout(this._timer);
                        probs = getActionProbs(root, tao);
                        return [2 /*return*/, {
                                bestChild: randomPick(root.children, probs),
                                actionProbs: probs.reduce(function (acc, p, i) {
                                    acc[root.children[i].a] = p;
                                    return acc;
                                }, {}),
                            }];
                }
            });
        });
    };
    MCTS.prototype.stop = function () {
        if (!this._searching)
            return;
        this._stop = true;
        clearTimeout(this._timer);
    };
    MCTS.prototype._step = function (root, st) {
        return __awaiter(this, void 0, void 0, function () {
            var path, leaf, gameover, score, actions, job;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = [root];
                        leaf = root;
                        while (!isLeaf(leaf)) {
                            leaf = ucbSelectChild(leaf);
                            path.push(leaf);
                            st.makeMove(leaf.a);
                        }
                        gameover = st.gameover();
                        if (gameover) {
                            leaf.children = [];
                            score = 0;
                            if (gameover.winner === st.currentPlayer)
                                score = 1;
                            else if (gameover.draw)
                                score = 0;
                            else
                                score = -1;
                            return [2 /*return*/, backprop(path, -score)];
                        }
                        else if (leaf.children === null) {
                            actions = st.legalMoves();
                            leaf.children = actions.map(function (a) { return Node(a); });
                        }
                        applyVirtualLoss(path);
                        job = {
                            state: st,
                            node: leaf,
                            path: path,
                        };
                        if (!(this._batch.add(job).size === this._batchSize)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._flush()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MCTS.prototype._flush = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, vals, i, info, leaf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._batch.size === 0)
                            return [2 /*return*/];
                        list = Array.from(this._batch.values());
                        return [4 /*yield*/, this._eval(list.map(function (b) { return b.state; }))];
                    case 1:
                        vals = _a.sent();
                        for (i = 0; i < list.length; i++) {
                            info = list[i];
                            leaf = info.node;
                            applyPrioProb(leaf, vals[i].probs, this._useNoise);
                            backpropAndRevertVirtualLoss(info.path, -vals[i].value);
                        }
                        this._batch.clear();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MCTS;
}());
export { MCTS };
function getActionProbs(root, tao) {
    tao = 1 / tao;
    var maxv = root.children.reduce(function (x, c) { return Math.max(x, c.n); }, 0);
    var sum = 0;
    var probs = root.children.map(function (child) {
        var p = Math.pow(child.n / maxv, tao);
        sum += p;
        return p;
    });
    for (var i = 0; i < probs.length; i++)
        probs[i] /= sum;
    return probs;
}
