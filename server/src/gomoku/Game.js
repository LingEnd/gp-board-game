var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { Client } from "boardgame.io/client";
import { MCTS, Node } from "./MCTS";
import { MCEvaluator } from "./Evals";
import { State } from "./State";
import { Gomoku } from "./GameDef.js";
var Game = /** @class */ (function () {
    function Game(_a) {
        var playAs = _a.playAs;
        this._client = Client({ game: Gomoku });
        this._mcts = new MCTS({
            evaluator: MCEvaluator(),
            useNoise: false,
            maxIteration: 3200 * 2,
        });
        this._root = Node(null);
        this._state = new State({ boardSize: 9 });
        this._playAs = playAs;
        this._started = false;
        this._stopped = false;
        this._aiPlayer = { 0: "1", 1: "0" }[this._playAs];
        this._currentPlayer = this.getState().ctx.currentPlayer;
        this._stateId = this.getState()._stateID - 1;
    }
    Object.defineProperty(Game.prototype, "currentPlayer", {
        get: function () {
            return this._currentPlayer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "playAs", {
        get: function () {
            return this._playAs;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.getState = function () {
        return this._client.getState();
    };
    Game.prototype.putStone = function (id) {
        if (!this._started || this._stopped)
            return;
        if (this._playAs && this._playAs !== this.currentPlayer)
            return;
        this._client.moves.putStone(id);
    };
    Game.prototype.subscribe = function (f) {
        return this._client.subscribe(f);
    };
    Game.prototype.start = function () {
        var _this = this;
        if (this._started || this._stopped)
            return;
        this._client.subscribe(function (s) {
            var e_1, _a;
            _this._currentPlayer = s.ctx.currentPlayer;
            var moves = (s.deltalog || [])
                .filter(function (log) { return log.action.type === "MAKE_MOVE"; })
                .map(function (log) { return log.action.payload.args[0]; });
            try {
                for (var moves_1 = __values(moves), moves_1_1 = moves_1.next(); !moves_1_1.done; moves_1_1 = moves_1.next()) {
                    var mov = moves_1_1.value;
                    _this._advance(mov);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (moves_1_1 && !moves_1_1.done && (_a = moves_1.return)) _a.call(moves_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (s.ctx.gameover)
                return;
            if (s._stateID === _this._stateId)
                return;
            _this._stateId = s._stateID;
            if (_this._aiPlayer === s.ctx.currentPlayer) {
                _this._mcts.exec(_this._root, _this._state).then(function (result) {
                    if (_this._stopped)
                        return;
                    _this._client.moves.putStone(result.bestChild.a);
                });
            }
        });
        this._client.start();
        this._started = true;
    };
    Game.prototype.stop = function () {
        this._client.stop();
        this._mcts.stop();
        this._stopped = true;
    };
    Game.prototype._advance = function (mov) {
        this._state.makeMove(mov);
        var root = this._root;
        if (!root.children)
            root = Node(mov);
        else if (root.children.length === 0)
            throw new Error("try to make move on terminal node");
        else
            root = root.children.find(function (c) { return c.a === mov; });
        this._root = root;
    };
    return Game;
}());
export { Game };
