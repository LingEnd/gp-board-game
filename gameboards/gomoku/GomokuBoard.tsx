// @ts-nocheck
import { Box } from "@mui/material";

export function GomokuBoard({ G, ctx, moves }) {
  function handleClick(id) {
    moves.putStone(id);
  }

  let winner = "";
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  let tbody = [];
  for (let i = 0; i < 9; i++) {
    let cells = [];
    for (let j = 0; j < 9; j++) {
      const id = 9 * i + j;
      cells.push(
        <Box
          component={"td"}
          sx={{
            m: 0,
            bgcolor: "#ceb053",
            width: "50px",
            height: "50px",
            lineHeight: "50px",
            textAlign: "center",
          }}
          key={id}
          onClick={() => handleClick(id)}
        >
          {G.stones[id] === 1 ? (
            <Box
              sx={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                backgroundColor: "#000",
              }}
            />
          ) : G.stones[id] === -1 ? (
            <Box
              sx={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                backgroundColor: "#fff",
              }}
            />
          ) : null}
        </Box>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div>
      <table id="board">
        <tbody>{tbody}</tbody>
      </table>
      {winner}
    </div>
  );
}
