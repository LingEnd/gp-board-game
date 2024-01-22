export var PLAYER_BLACK = 1;
export var PLAYER_WHITE = -1;
function checkWinnerByLine(stones, clr, start, end, stride) {
    var cnt = 0;
    for (; cnt < 5 && start !== end; start += stride) {
        if (stones[start] === clr)
            cnt++;
        else
            cnt = 0;
    }
    return cnt >= 5;
}
export function checkWinnerByMove(boardSize, stones, p) {
    var _min = 4;
    var c = stones[p];
    if (c === 0)
        return 0;
    var x0 = p % boardSize;
    var y0 = Math.floor(p / boardSize);
    var x1 = boardSize - 1 - x0;
    var y1 = boardSize - 1 - y0;
    var start = 0, end = 0, stride = 1;
    x0 = Math.min(x0, _min);
    x1 = Math.min(x1, _min);
    start = p - x0;
    end = p + x1 + 1;
    if (checkWinnerByLine(stones, c, start, end, 1))
        return c;
    stride = boardSize;
    y0 = Math.min(y0, _min);
    y1 = Math.min(y1, _min);
    start = p - y0 * stride;
    end = p + (y1 + 1) * stride;
    if (checkWinnerByLine(stones, c, start, end, stride))
        return c;
    stride = boardSize + 1;
    var ma = Math.min(x0, y0), mb = Math.min(x1, y1);
    start = p - ma * stride;
    end = p + (mb + 1) * stride;
    if (checkWinnerByLine(stones, c, start, end, stride))
        return c;
    stride = boardSize - 1;
    ma = Math.min(x1, y0);
    mb = Math.min(x0, y1);
    start = p - ma * stride;
    end = p + (mb + 1) * stride;
    if (checkWinnerByLine(stones, c, start, end, stride))
        return c;
    return 0;
}
var State = /** @class */ (function () {
    function State(_a) {
        var boardSize = _a.boardSize;
        this.boardSize = boardSize;
        this.stones = new Array(boardSize * boardSize).fill(0);
        this.currentPlayer = PLAYER_BLACK;
        this.moveHistory = [];
        this._gameover = null;
    }
    State.prototype.clone = function () {
        var newObj = new State({
            boardSize: this.boardSize,
        });
        newObj.copy(this);
        return newObj;
    };
    State.prototype.copy = function (src) {
        if (src.boardSize !== this.boardSize)
            throw new Error("incompatible board");
        for (var i = 0; i < src.stones.length; i++) {
            this.stones[i] = src.stones[i];
        }
        this.currentPlayer = src.currentPlayer;
        for (var i = 0; i < src.moveHistory.length; i++) {
            this.moveHistory[i] = src.moveHistory[i];
        }
        this.moveHistory.length = src.moveHistory.length;
        this._gameover = src._gameover;
    };
    State.prototype.makeMove = function (mov) {
        if (this._gameover)
            return this;
        this.stones[mov] = this.currentPlayer;
        this.moveHistory.push(mov);
        this.currentPlayer = -this.currentPlayer;
        return this;
    };
    State.prototype.legalMoves = function () {
        var moves = [];
        for (var i = 0; i < this.stones.length; i++) {
            if (this.stones[i] === 0)
                moves.push(i);
        }
        return moves;
    };
    State.prototype.gameover = function () {
        if (this._gameover || this.moveHistory.length === 0)
            return this._gameover;
        var mov = this.moveHistory[this.moveHistory.length - 1];
        var winner = checkWinnerByMove(this.boardSize, this.stones, mov);
        if (winner !== 0) {
            this._gameover = { winner: winner };
        }
        else if (this.moveHistory.length === this.stones.length) {
            this._gameover = { draw: true };
        }
        return this._gameover;
    };
    return State;
}());
export { State };
