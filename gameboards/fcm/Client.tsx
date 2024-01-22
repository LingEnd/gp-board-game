import { Client } from "boardgame.io/react";
import { FCM } from "../../games/src/Game";
import { FCMBoard } from "./FCMBoard";

const GameClient = Client({
  game: FCM,
  board: FCMBoard,
  numPlayers: 2,
});
export default GameClient;
