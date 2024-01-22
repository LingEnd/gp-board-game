import { Client } from "boardgame.io/react";
import { TicTacToe } from "../../games/src/Game";
import { TicTacToeBoard } from "./TicTacToeBoard";

const GameClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  numPlayers: 2,
});
export default GameClient;
