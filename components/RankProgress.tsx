import { LinearProgress, SxProps, linearProgressClasses } from "@mui/material";
import React from "react";

type Props = {
  credit: number;
  sx?: SxProps;
};

export const rankColor = {
  bronze: "#cd7f32",
  silver: "#c0c0c0",
  gold: "#ffd700",
  platinum: "#e5e4e2",
  diamond: "#b9f2ff",
};

export function getRankColor(credit: number) {
  if (credit < 100)
    // bronze
    return "#cd7f32";
  else if (credit < 200)
    // silver
    return "#c0c0c0";
  else if (credit < 300)
    // gold
    return "#ffd700";
  else if (credit < 400)
    // platinum
    return "#e5e4e2";
  else if (credit < 500)
    // diamond
    return "#b9f2ff";
  else return "#ffffff";
}

function RankProgress({ credit, sx }: Props) {
  return (
    <LinearProgress
      variant="determinate"
      value={credit % 100}
      sx={{
        ...sx,

        [`& .${linearProgressClasses.bar}`]: {
          bgcolor: getRankColor(credit + 100),
        },
        bgcolor: getRankColor(credit),
      }}
    />
  );
}

export default RankProgress;
