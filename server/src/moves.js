import { INVALID_MOVE } from "boardgame.io/core";
import { canSetRestaurant, canStartRestaurant, setRestaurant, } from "./resources/Map";
export var startRestaurant = function (_a, position, door) {
    var G = _a.G, ctx = _a.ctx;
    if (door === void 0) { door = 0; }
    var restaurant = canStartRestaurant(G.maps, G.mapSize, position, door);
    if (restaurant) {
        setRestaurant(G.maps, "r" + ctx.currentPlayer, restaurant, door);
        G.companys[ctx.currentPlayer].started = true;
        return;
    }
    else
        return INVALID_MOVE;
};
export var byPass = function () {
    return;
};
export var newRestaurant = function (_a, position, door) {
    var G = _a.G, ctx = _a.ctx;
    if (door === void 0) { door = 0; }
    var restaurant = canSetRestaurant(G.maps, G.mapSize, position);
    if (restaurant) {
        setRestaurant(G.maps, "r" + ctx.currentPlayer, restaurant, door);
        return;
    }
    else
        return INVALID_MOVE;
};
export var setReverse = function (_a, bankReserve) {
    var G = _a.G, playerID = _a.playerID;
    if (typeof bankReserve !== "number")
        return INVALID_MOVE;
    if (bankReserve < 1 || bankReserve > 3)
        return INVALID_MOVE;
    G.players[playerID].bankReserve = bankReserve * 100;
};
export var restructure = function (_a, structure) {
    var G = _a.G, playerID = _a.playerID;
    if (structure.length !== G.slot)
        return INVALID_MOVE;
    var head = [
        "Executive_Vice_President",
        "Vice_President",
        "Senior_Vice_President",
        "Junior_Vice_President",
        "Management_Trainee",
    ];
    structure.forEach(function (tree) {
        // 如果tree是数组且不以head中的元素开头
        if (Array.isArray(tree)) {
            if (!head.includes(tree[0]))
                return INVALID_MOVE;
            else {
                switch (tree[0]) {
                    case "Executive_Vice_President":
                        if (tree.length !== 10)
                            return INVALID_MOVE;
                        break;
                    case "Vice_President":
                        if (tree.length !== 4)
                            return INVALID_MOVE;
                        break;
                    case "Senior_Vice_President":
                        if (tree.length !== 5)
                            return INVALID_MOVE;
                        break;
                    case "Junior_Vice_President":
                        if (tree.length !== 3)
                            return INVALID_MOVE;
                        break;
                    case "Management_Trainee":
                        if (tree.length !== 2)
                            return INVALID_MOVE;
                        break;
                }
            }
        }
    });
    G.companys[playerID].working = structure.flat();
};
//================================================
// EmployeeMoves
//================================================
