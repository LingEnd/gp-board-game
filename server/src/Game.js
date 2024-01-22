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
import { PlayerView } from "boardgame.io/core";
import { phases } from "./phases";
import company from "./resources/company";
import { EMPLOYEES } from "./resources/Employees";
import { MAP_SET, rotate, solveMapSize } from "./resources/Map";
import achievements from "./achievements";
import { INVALID_MOVE } from "boardgame.io/core";
export var FCM = {
    name: "Food-Chain-Magnate",
    playerView: PlayerView.STRIP_SECRETS,
    setup: function (_a) {
        var _b;
        var ctx = _a.ctx, random = _a.random;
        // 获取玩家数量
        var numPlayers = ctx.numPlayers;
        // 随机玩家顺序
        var turnOrder = random.Shuffle(Array.from(Array(numPlayers), function (_, i) { return i.toString(); }));
        // 根据玩家数量调整员工数量
        var employeeLeft = EMPLOYEES;
        var key;
        if (numPlayers > 3) {
            for (key in employeeLeft) {
                if (employeeLeft[key] === 1)
                    employeeLeft[key] += numPlayers - 2;
            }
        }
        // 初始化公司情况
        var companys = {};
        // 初始化玩家非公开数据
        var players = {};
        for (var i = 0; i < numPlayers; i++) {
            players[i] = {
                // 初始化银行储备金
                bankReserve: null,
            };
            companys = __assign(__assign({}, companys), (_b = {}, _b[i] = company, _b));
        }
        // 初始化地图尺寸
        var mapSize = solveMapSize(numPlayers);
        // 初始化地图
        var maps = Array.from(Array(mapSize[0]), function () { return new Array(0); });
        // 洗混地图片池，使得靠前的地图片被选择每局地图不同
        var mapList = random.Shuffle(MAP_SET);
        // 地图片数量
        var tileSize = mapSize[2] * mapSize[3];
        // 将5x5地图片逐一随即旋转后拼接成大地图
        for (var i = 0; i < tileSize; i++) {
            var mapTile = rotate(mapList[i], random.D4());
            for (var y = 0; y < 5; y++) {
                for (var x = 0; x < 5; x++) {
                    maps[Math.floor(i / mapSize[3]) * 5 + y].push(mapTile[y][x]);
                }
            }
        }
        return {
            // 银行初始资金
            bank: numPlayers * 50,
            // 地图
            maps: maps,
            // 每位玩家的公司情况
            companys: companys,
            // 每位玩家的广告牌数量
            billboards: 2,
            // 剩余可雇佣员工数量
            employeeLeft: employeeLeft,
            // 地图尺寸
            mapSize: mapSize,
            // 玩家非公开数据
            players: players,
            // 玩家顺序
            turnOrder: turnOrder,
            // 玩家公司插槽
            slot: 3,
            // 成就
            achievements: achievements,
        };
    },
    phases: phases,
    minPlayers: 2,
    maxPlayers: 5,
};
export var TicTacToe = {
    name: "tic-tac-toe",
    setup: function () { return ({ cells: Array(9).fill(null) }); },
    turn: {
        minMoves: 1,
        maxMoves: 1,
    },
    moves: {
        clickCell: function (_a, id) {
            var G = _a.G, playerID = _a.playerID;
            if (G.cells[id] !== null) {
                return INVALID_MOVE;
            }
            G.cells[id] = playerID;
        },
    },
    endIf: function (_a) {
        var G = _a.G, ctx = _a.ctx;
        if (IsVictory(G.cells)) {
            return { winner: ctx.currentPlayer };
        }
        if (IsDraw(G.cells)) {
            return { draw: true };
        }
    },
    ai: {
        enumerate: function (G, ctx) {
            var moves = [];
            for (var i = 0; i < 9; i++) {
                if (G.cells[i] === null) {
                    moves.push({ move: "clickCell", args: [i] });
                }
            }
            return moves;
        },
    },
    minPlayers: 2,
    maxPlayers: 2,
};
function IsVictory(cells) {
    var positions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return positions
        .map(function (row) {
        var symbols = row.map(function (i) { return cells[i]; });
        return symbols.every(function (i) { return i !== null && i === symbols[0]; });
    })
        .some(function (i) { return i === true; });
}
// Return true if all `cells` are occupied.
function IsDraw(cells) {
    return cells.filter(function (c) { return c === null; }).length === 0;
}
