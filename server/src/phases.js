var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { setReverse, startRestaurant, byPass, restructure } from "./moves";
export var phases = {
    startBusiness1: {
        start: true,
        moves: { startRestaurant: startRestaurant, byPass: byPass },
        turn: {
            order: {
                // 反转顺序
                playOrder: function (_a) {
                    var G = _a.G;
                    return __spreadArray([], __read(G.turnOrder), false).reverse();
                },
                first: function (_a) { return 0; },
                next: function (_a) {
                    var ctx = _a.ctx;
                    if (ctx.playOrderPos < ctx.playOrder.length - 1) {
                        return ctx.playOrderPos + 1;
                    }
                },
            },
            minMoves: 1,
            maxMoves: 1,
        },
        next: "startBusiness2",
    },
    startBusiness2: {
        moves: { startRestaurant: startRestaurant },
        endIf: function (_a) {
            var G = _a.G;
            if (!Object.values(G.companys).every(function (company) { return company.started; }))
                return false;
            return true;
        },
        turn: {
            order: {
                playOrder: function (_a) {
                    var G = _a.G;
                    var playerStarted = Object.values(G.companys).map(function (company, index) {
                        if (company.started)
                            return index.toString();
                    });
                    var order = G.turnOrder.filter(function (player) {
                        if (!playerStarted.includes(player))
                            return player;
                    });
                    return order;
                },
                first: function (_a) { return 0; },
                next: function (_a) {
                    var ctx = _a.ctx;
                    return (ctx.playOrderPos + 1) % ctx.numPlayers;
                },
            },
            minMoves: 1,
            maxMoves: 1,
        },
        next: "chooseReverse",
    },
    chooseReverse: {
        endIf: function (_a) {
            var G = _a.G, ctx = _a.ctx;
            for (var index = 0; index < ctx.numPlayers; index++) {
                if (G.players[index].bankReserve === null)
                    return false;
            }
            return true;
        },
        turn: {
            activePlayers: {
                all: "setReverse",
                minMoves: 1,
                maxMoves: 1,
            },
            stages: {
                setReverse: {
                    moves: { setReverse: setReverse },
                },
            },
        },
        next: "restructuring",
    },
    restructuring: {
        turn: {
            minMoves: 1,
            maxMoves: 1,
            activePlayers: {
                all: "restructuring",
            },
            stages: {
                restructuring: {
                    moves: {
                        restructure: restructure,
                    },
                },
            },
        },
        next: "working",
    },
    working: {
        onBegin: function (_a) {
            var G = _a.G, ctx = _a.ctx;
            var currentOrder = ctx.playOrder;
            var companys = G.companys;
            var playerID;
            var slotsLeft = {};
            var _loop_1 = function () {
                // 计算空位
                slotsLeft[playerID] =
                    companys[playerID].working.filter(function (item) { return item === ""; }).length +
                        (G.companys[playerID].achieve.FIRST_AIRPLANE_CAMPAIGN ? 2 : 0);
                var WorkerCount = {
                    Regional_Manager: 0,
                    Luxuries_Manager: 0,
                    Zeppelin_Pilot: 0,
                    CFO: 0,
                    Brand_Director: 0,
                    Burger_Chef: 0,
                    Pizza_Chef: 0,
                    Executive_Vice_President: 0,
                    Guru: 0,
                    HR_Director: 0,
                    Local_Manager: 0,
                    Discount_Manager: 0,
                    Cart_Operator: 0,
                    Truck_Driver: 0,
                    New_Business_Developer: 0,
                    Campaign_Manager: 0,
                    Brand_Manager: 0,
                    Burger_Cook: 0,
                    Pizza_Cook: 0,
                    Vice_President: 0,
                    Senior_Vice_President: 0,
                    Coach: 0,
                    Recruiting_Manager: 0,
                    Pricing_Manager: 0,
                    Errand_Boy: 0,
                    Waitress: 0,
                    Marketing_Trainee: 0,
                    Kitchen_Trainee: 0,
                    Junior_Vice_President: 0,
                    Trainer: 0,
                    Recruiting_Girl: 0,
                    Management_Trainee: 0,
                    CEO: 1,
                };
                G.companys[playerID].working.forEach(function (item) {
                    if (item !== "") {
                        if (WorkerCount[item]) {
                            WorkerCount[item] += 1;
                        }
                        else {
                            WorkerCount[item] = 1;
                        }
                    }
                });
                if (WorkerCount.Pricing_Manager > 0) {
                    G.companys[playerID].price -= WorkerCount.Pricing_Manager;
                }
                if (WorkerCount.Discount_Manager > 0) {
                    G.companys[playerID].price -= WorkerCount.Discount_Manager * 3;
                }
                if (WorkerCount.Luxuries_Manager > 0) {
                    G.companys[playerID].price += WorkerCount.Brand_Director * 10;
                }
                if (WorkerCount.Recruiting_Manager > 0) {
                    G.companys[playerID].extraHire += WorkerCount.Recruiting_Manager * 2;
                }
                if (WorkerCount.HR_Director > 0) {
                    G.companys[playerID].extraHire += WorkerCount.HR_Director * 4;
                }
            };
            for (playerID in companys) {
                _loop_1();
            }
            currentOrder.sort(function (a, b) {
                if (slotsLeft[a] === slotsLeft[b])
                    return currentOrder.indexOf(a) - currentOrder.indexOf(b);
                return slotsLeft[b] - slotsLeft[a];
            });
            G.turnOrder = currentOrder;
        },
        turn: {
            order: {
                playOrder: function (_a) {
                    var G = _a.G;
                    return G.turnOrder;
                },
                first: function (_a) { return 0; },
                next: function (_a) {
                    var ctx = _a.ctx;
                    return (ctx.playOrderPos + 1) % ctx.numPlayers;
                },
            },
        },
        moves: {},
    },
    end: {},
};
