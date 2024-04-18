import { Server, Origins } from "boardgame.io/server";
import { FCM, TicTacToe } from "./Game";
import { PostgresStore } from "bgio-postgres";
import { Gomoku } from "./gomoku/GameDef";
import { env } from "process";

const server = Server({
  // Provide the definitions for your game(s).
  games: [FCM, TicTacToe, Gomoku],

  // Provide the database storage class to use.
  db: new PostgresStore(
    "postgresql://ling_end:Chu2637268298@139.196.89.94:5433/db7196a037e2544a26b49754ecb00b96ecpbg?schema=public"
  ),

  origins: [
    // Allow your game site to connect.
    "https://localhost:8000",
    "http://192.168.0.11",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://192.168.0.11:3000",
    "http://10.13.66.229:3000",
    "http://10.13.66.229",
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT,
  ],
});

server.run(8000);
