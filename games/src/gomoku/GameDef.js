import { INVALID_MOVE } from "boardgame.io/core";

/**
 * 检查一条线上某一方是否成 5
 * @param {number[]} stones
 * @param {number} clr
 * @param {number} start
 * @param {number} end
 * @param {number} stride
 */
function checkWinnerByLine(stones, clr, start, end, stride) {
  let cnt = 0;
  for (; cnt < 5 && start !== end; start += stride) {
    if (stones[start] === clr) cnt++;
    else cnt = 0;
  }
  return cnt >= 5;
}

/**
 * 检查某位玩家是否获胜
 * @param {number[]} stones
 * @param {number} clr
 */
function isVictory(stones, clr) {
  const boardSize = 9;
  let x = 0,
    y = 0;
  let start = 0,
    end = 0,
    stride = 1;

  // horizontal
  stride = 1;
  start = 0;
  end = start + boardSize;
  for (y = 0; y < boardSize; y++) {
    let win = checkWinnerByLine(stones, clr, start, end, stride);
    if (win) return true;
    start += boardSize;
    end += boardSize;
  }

  // vertical
  stride = boardSize;
  start = 0;
  end = start + stride * boardSize;
  for (x = 0; x < boardSize; x++) {
    let win = checkWinnerByLine(stones, clr, start, end, stride);
    if (win) return true;
    start += 1;
    end += 1;
  }

  // major diag
  stride = boardSize + 1;
  start = 0;
  end = start + stride * boardSize;

  for (x = 0; x < boardSize - 4; x++) {
    let win = checkWinnerByLine(stones, clr, start, end, stride);
    if (win) return true;
    start += 1;
    end -= boardSize;
  }

  start = boardSize;
  end = start + stride * (boardSize - 1);

  for (y = 1; y < boardSize - 4; y++) {
    let win = checkWinnerByLine(stones, clr, start, end, stride);
    if (win) return true;
    start += boardSize;
    end -= 1;
  }

  // secondary diag
  stride = boardSize - 1;
  start = 4;
  end = start + stride * 5;

  for (x = 4; x < boardSize; x++) {
    let win = checkWinnerByLine(stones, clr, start, end, stride);
    if (win) return true;
    start += 1;
    end += boardSize;
  }

  start = 2 * boardSize - 1;
  end = start + stride * (boardSize - 1);

  for (y = 1; y < boardSize - 4; y++) {
    let win = checkWinnerByLine(stones, clr, start, end, stride);
    if (win) return true;
    start += boardSize;
    end += 1;
  }

  return false;
}

/**
 * @param {number[]} stones
 */
function isDraw(stones) {
  return stones.every((s) => s !== 0);
}

export const Gomoku = {
  name: "gomoku",
  setup: () => ({ stones: Array(9 * 9).fill(0) }),

  moves: {
    putStone: ({ G, ctx }, id) => {
      if (G.stones[id] !== 0) {
        return INVALID_MOVE;
      }
      G.stones[id] = [1, -1][ctx.currentPlayer];
    },
  },

  turn: {
    moveLimit: 1,
  },

  endIf: ({ G, ctx }) => {
    if (isVictory(G.stones, [1, -1][ctx.currentPlayer])) {
      return { winner: ctx.currentPlayer };
    }
    if (isDraw(G.stones)) {
      return { draw: true };
    }
  },
  ai: {
    enumerate: ({ G, ctx }) => {
      let moves = [];
      for (let i = 0; i < G.stones.length; i++) {
        if (G.stones[i] === 0) {
          moves.push({ move: "putStone", args: [i] });
        }
      }
      return moves;
    },
  },
};
