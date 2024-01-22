import type { BoardProps } from "boardgame.io/react";
import type { FCMState } from "../../games/src/Game";
import { MapBase, Position, getID } from "../../games/src/resources/Map";
import { createContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Grid,
  BoxProps,
  Typography,
  Paper,
  Card,
} from "@mui/material";
import styled from "@emotion/styled";
import { DoorSliding } from "@mui/icons-material";

interface TileProps extends BoxProps {
  info: MapBase;
  borderType?: number;
}

const colorInfoMap: { [key: number | string]: string } = {
  0: "#fef1d9",
  1: "#cecfd1",
  2: "#7b3452",
  3: "#d1ff23",
  4: "#8ed226",
  5: "#c42b1c",
  r0: "#c09ba9",
  r1: "#a9d2d8",
  r2: "#f7a38c",
  r3: "#8da95e",
  r4: "#231f20",
};

const Item = styled(Box, {
  shouldForwardProp: (prop) => prop !== "borderType",
})<TileProps>(({ info, borderType }) => {
  const colorInfo =
    typeof info === "number"
      ? info > 100
        ? Math.floor(info / 100)
        : info
      : info[0] === "r"
        ? info.slice(0, 2)
        : info;
  return {
    backgroundColor: colorInfoMap[colorInfo],
    borderInline: borderType === 1 ? "1px solid #000" : undefined,
    borderBlock: borderType === 2 ? "1px solid #000" : undefined,
    height: "40px",
    width: "40px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
});

const Strong = styled("strong")(({ theme }) => ({
  // @ts-ignore
  color: theme.palette.primary.main,
}));

interface FCMProps extends BoardProps<FCMState> {
  // Additional custom properties for your component
}

export function FCMBoard(props: FCMProps) {
  const { G, ctx, moves, playerID } = props;
  const [position, setPosition] = useState<Position>([0, 0]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const renderDialog = (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <Box
        sx={{
          bgcolor: "background.default",
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            mb: 1,
            fontWeight: "bold",
            bgcolor: "primary.main",
          }}
        >
          Choose the door
        </DialogTitle>
        <DialogActions
          sx={{
            justifyContent: "center",
            bgcolor: "Background.paper",
            mb: 2,
          }}
        >
          <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={() => {
                  moves.startRestaurant(position, 0);
                  setDialogOpen(false);
                }}
              >
                ↖️
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  moves.startRestaurant(position, 2);
                  setDialogOpen(false);
                }}
              >
                ↗️
              </Button>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={() => {
                  moves.startRestaurant(position, 1);
                  setDialogOpen(false);
                }}
              >
                ↙️
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  moves.startRestaurant(position, 3);
                  setDialogOpen(false);
                }}
              >
                ↘️
              </Button>
            </Stack>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );

  const renderMap = [];

  const [mx, my, mtx, mty] = G.mapSize;

  for (let tx = 0; tx < mtx; tx++) {
    const row = [];
    for (let ty = 0; ty < mty; ty++) {
      const tile = [];
      for (let x = 0; x < 5; x++) {
        const tRow = [];
        const ix = tx * 5 + x;
        for (let y = 0; y < 5; y++) {
          const iy = ty * 5 + y;
          const info = G.maps[ix][iy];
          let borderType = 0;
          if (x === 2 && y === 2 && info === "1")
            if (G.maps[ix - 1][iy] === "1") borderType = 2;
            else borderType = 1;
          if (
            (ctx.phase === "startBusiness1" ||
              ctx.phase === "startBusiness2") &&
            info === 0
          )
            tRow.push(
              <Item
                key={getID(G.mapSize, [iy, ix])}
                info={info}
                borderType={borderType}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    border: "1px solid #000",
                  },
                }}
                onClick={() => {
                  setPosition([iy, ix]);
                  setDialogOpen(true);
                }}
              />
            );
          else
            tRow.push(
              <Item
                key={getID(G.mapSize, [iy, ix])}
                info={info}
                borderType={borderType}
              >
                {typeof info === "string" &&
                info.length > 2 &&
                info[2] === "d" ? (
                  <DoorSliding
                    sx={{
                      color: "black",
                    }}
                  />
                ) : null}
              </Item>
            );
        }
        tile.push(
          <Stack key={"row" + ix} direction="row">
            {tRow}
          </Stack>
        );
      }
      row.push(
        <Stack key={"tile" + (tx * my + ty)} border=" 2px solid #000">
          {tile}
        </Stack>
      );
    }
    renderMap.push(
      <Stack key={"trow" + tx} direction="row">
        {row}
      </Stack>
    );
  }

  let optionPanel;

  if (ctx.phase === "startBusiness1") {
    optionPanel = (
      <Box>
        set the restaurant or
        <Button onClick={() => moves.byPass()}>pass</Button>
      </Box>
    );
  }

  if (ctx.phase === "startBusiness2") {
    optionPanel = <Box>set the restaurant</Box>;
  }

  if (ctx.phase === "chooseReverse" && ctx.activePlayers) {
    if (playerID && Object.keys(ctx.activePlayers).includes(playerID))
      optionPanel = (
        <Box>
          choose bank reverse
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={() => {
                moves.setReverse(1);
              }}
            >
              100
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                moves.setReverse(2);
              }}
            >
              200
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                moves.setReverse(3);
              }}
            >
              300
            </Button>
          </Stack>
        </Box>
      );
    else
      optionPanel = (
        <Box>
          wait for player: {Object.keys(ctx.activePlayers).map((e) => e + "  ")}
        </Box>
      );
  }

  if (ctx.phase === "restructuring") {
    optionPanel = (
      <Box width="100%">
        <Box>
          <Stack spacing={1}>
            <Stack
              direction="row"
              sx={{
                justifyContent: "center",
              }}
              spacing={1}
            >
              <Card variant="outlined" sx={{ p: 2, m: 1 }}>
                <Strong>CEO</Strong>
              </Card>
            </Stack>
            <Stack
              direction="row"
              sx={{
                justifyContent: "center",
              }}
              spacing={1}
            >
              {Array.from({ length: G.slot }).map((_, i) => (
                <Card variant="outlined" sx={{ p: 2, m: 1 }}>
                  <Strong>{i}</Strong>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Box>
        <Box>
          {G.companys[playerID as string].beach.map((e, i) => {
            return (
              <Button
                key={e + i}
                sx={{
                  height: 90,
                  width: 40,
                }}
                variant="contained"
                onClick={() => {}}
              >
                {e}
              </Button>
            );
          })}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          p: 2,
          m: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">
          <Strong>phase: </Strong>
          {ctx.phase} <Strong>turn: </Strong>
          {ctx.turn}
        </Typography>
        <Typography variant="h6">
          <Strong>current player:</Strong> {ctx.currentPlayer}{" "}
          <Strong>next player: </Strong>
          {ctx.playOrder[(ctx.playOrderPos + 1) % ctx.numPlayers]}
        </Typography>
      </Card>
      <Stack>{renderMap}</Stack>
      {renderDialog}
      <Card
        variant="outlined"
        sx={{
          p: 2,
          m: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {optionPanel}
      </Card>
    </Box>
  );
}
