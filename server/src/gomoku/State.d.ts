export function checkWinnerByMove(boardSize: any, stones: any, p: any): any;
export const PLAYER_BLACK: 1;
export const PLAYER_WHITE: -1;
export class State {
    constructor({ boardSize }: {
        boardSize: any;
    });
    boardSize: any;
    stones: any[];
    currentPlayer: number;
    moveHistory: any[];
    _gameover: any;
    clone(): State;
    copy(src: any): void;
    makeMove(mov: any): this;
    legalMoves(): number[];
    gameover(): any;
}
