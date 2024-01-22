// @ts-nocheck
export default Page;

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useReducer,
} from "react";

import { GomokuBoard } from "../../../../gameboards/gomoku/GomokuBoard";
import { Game } from "./Game";

//const App = Client({ game: Gomoku });

function Page() {
  const [gameId, newGame] = useReducer((id) => id + 1, 1);
  const game = useMemo(() => {
    let game = new Game({
      playAs: Math.random() > 0.5 ? "0" : "1",
    });
    return game;
  }, [gameId]);
  const [state, setState] = useState(game.getState());

  const moves = useMemo(
    () => ({
      putStone: (id: any) => game.putStone(id),
    }),
    [game]
  );

  useEffect(() => {
    game.start();
    let unsub = game.subscribe(setState);
    return () => {
      unsub();
      game.stop();
    };
  }, [game]);

  let currentPlayer = game.currentPlayer;
  let status = "please set a status";
  let gameOver = state.ctx.gameover;

  if (gameOver) {
    if (gameOver.winner === "0") status = "black wins";
    else if (gameOver.winner === "1") status = "white wins";
    else status = "draw";
  } else if (game.playAs && game.playAs !== currentPlayer) {
    status = "thinking...";
  }

  return (
    <>
      <div className="menu-bar">
        <button onClick={newGame}>new</button>
      </div>
      <GomokuBoard {...state} moves={moves} />
      <div className="status-bar">
        <p className="main">{status}</p>
      </div>
    </>
  );
}
