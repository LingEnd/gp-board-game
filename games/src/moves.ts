import { Move } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { FCMState } from "./Game";
import {
  canSetRestaurant,
  canStartRestaurant,
  Position,
  setRestaurant,
} from "./resources/Map";
import { workerList } from "./resources/company";

export const startRestaurant: Move<FCMState> = (
  { G, ctx },
  position: Position,
  door: 0 | 1 | 2 | 3 = 0
) => {
  const restaurant = canStartRestaurant(G.maps, G.mapSize, position, door);
  if (restaurant) {
    setRestaurant(G.maps, "r" + ctx.currentPlayer, restaurant, door);
    G.companys[ctx.currentPlayer].started = true;
    return;
  } else return INVALID_MOVE;
};

export const byPass: Move<FCMState> = () => {
  return;
};

export const newRestaurant: Move<FCMState> = (
  { G, ctx },
  position: Position,
  door: 0 | 1 | 2 | 3 = 0
) => {
  const restaurant = canSetRestaurant(G.maps, G.mapSize, position);
  if (restaurant) {
    setRestaurant(G.maps, "r" + ctx.currentPlayer, restaurant, door);
    return;
  } else return INVALID_MOVE;
};

export const setReverse: Move<FCMState> = (
  { G, playerID },
  bankReserve: 1 | 2 | 3
) => {
  if (typeof bankReserve !== "number") return INVALID_MOVE;
  if (bankReserve < 1 || bankReserve > 3) return INVALID_MOVE;
  G.players[playerID].bankReserve = bankReserve * 100;
};

export const restructure: Move<FCMState> = (
  { G, playerID },
  structure: Array<Array<workerList>>
) => {
  if (structure.length !== G.slot) return INVALID_MOVE;
  const head = [
    "Executive_Vice_President",
    "Vice_President",
    "Senior_Vice_President",
    "Junior_Vice_President",
    "Management_Trainee",
  ];
  structure.forEach((tree) => {
    // 如果tree是数组且不以head中的元素开头
    if (Array.isArray(tree)) {
      if (!head.includes(tree[0])) return INVALID_MOVE;
      else {
        switch (tree[0]) {
          case "Executive_Vice_President":
            if (tree.length !== 10) return INVALID_MOVE;
            break;
          case "Vice_President":
            if (tree.length !== 4) return INVALID_MOVE;
            break;
          case "Senior_Vice_President":
            if (tree.length !== 5) return INVALID_MOVE;
            break;
          case "Junior_Vice_President":
            if (tree.length !== 3) return INVALID_MOVE;
            break;
          case "Management_Trainee":
            if (tree.length !== 2) return INVALID_MOVE;
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
