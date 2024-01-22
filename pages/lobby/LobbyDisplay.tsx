import React from "react";
import { Lobby } from "boardgame.io/react";
import { FCM, TicTacToe } from "../../games/src/Game";
import { Gomoku } from "../games/pages/gomoku/GameDef";
import { FCMBoard } from "../../gameboards/fcm/FCMBoard";

import { TicTacToeBoard } from "../../gameboards/ttt/TicTacToeBoard";
import { GomokuBoard } from "../../gameboards/gomoku/GomokuBoard";
const LobbyDisplay = () => {
  const server = "http://" + window.location.hostname + ":8000";

  return (
    <>
      <Lobby
        gameServer={server}
        lobbyServer={server}
        gameComponents={[
          { game: TicTacToe, board: TicTacToeBoard },
          { game: FCM, board: FCMBoard },
          { game: Gomoku, board: GomokuBoard },
        ]}
      />
    </>
  );
};

export default LobbyDisplay;
