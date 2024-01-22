import type { Game } from "boardgame.io";
import { PlayerView } from "boardgame.io/core";
import { phases } from "./phases";
import company from "./resources/company";
import { EMPLOYEES } from "./resources/Employees";
import { Map, MapSize, MAP_SET, rotate, solveMapSize } from "./resources/Map";
import achievements from "./achievements";
import { INVALID_MOVE } from "boardgame.io/core";

type player = Record<string, number | null>;

export interface FCMState {
  maps: Map;
  mapSize: MapSize;
  bank: number;
  companys: Record<string, typeof company>;
  billboards: number;
  employeeLeft: typeof EMPLOYEES;
  players: Record<string, player>;
  turnOrder: string[];
  slot: number;
  achievements: Record<string, boolean>;
}

export const FCM: Game<FCMState> = {
  name: "Food-Chain-Magnate",
  playerView: PlayerView.STRIP_SECRETS,
  setup: ({ ctx, random }) => {
    // 获取玩家数量
    const numPlayers = ctx.numPlayers;
    // 随机玩家顺序
    const turnOrder = random.Shuffle(
      Array.from(Array(numPlayers), (_, i) => i.toString())
    );
    // 根据玩家数量调整员工数量
    let employeeLeft = EMPLOYEES;
    let key: keyof typeof employeeLeft;
    if (numPlayers > 3) {
      for (key in employeeLeft) {
        if (employeeLeft[key] === 1) employeeLeft[key] += numPlayers - 2;
      }
    }
    // 初始化公司情况
    let companys = {};
    // 初始化玩家非公开数据
    const players: Record<string, player> = {};
    for (let i = 0; i < numPlayers; i++) {
      players[i] = {
        // 初始化银行储备金
        bankReserve: null,
      };
      companys = {
        ...companys,
        [i]: company,
      };
    }
    // 初始化地图尺寸
    let mapSize = solveMapSize(numPlayers);
    // 初始化地图
    let maps = Array.from(Array(mapSize[0]), () => new Array(0));
    // 洗混地图片池，使得靠前的地图片被选择每局地图不同
    let mapList = random.Shuffle(MAP_SET);
    // 地图片数量
    const tileSize = mapSize[2] * mapSize[3];
    // 将5x5地图片逐一随即旋转后拼接成大地图
    for (let i = 0; i < tileSize; i++) {
      let mapTile = rotate(mapList[i], random.D4());
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
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

export const TicTacToe: Game = {
  name: "tic-tac-toe",
  setup: () => ({ cells: Array(9).fill(null) }),
  turn: {
    minMoves: 1,
    maxMoves: 1,
  },
  moves: {
    clickCell: ({ G, playerID }, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = playerID;
    },
  },
  endIf: ({ G, ctx }) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },
  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
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

function IsVictory(cells: Array<string | null>) {
  const positions = [
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
    .map((row) => {
      const symbols = row.map((i) => cells[i]);
      return symbols.every((i) => i !== null && i === symbols[0]);
    })
    .some((i) => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells: Array<string | null>) {
  return cells.filter((c) => c === null).length === 0;
}
