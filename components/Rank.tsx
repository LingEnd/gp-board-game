import { MilitaryTechTwoTone } from "@mui/icons-material";
import { SxProps } from "@mui/material";
import React from "react";

export const ranks = ["bronze", "silver", "gold", "platinum", "diamond"];

type Props = {
  rank: string;
  sx?: SxProps;
};

function Rank({ rank, sx }: Props) {
  switch (rank) {
    case "bronze":
      return (
        <MilitaryTechTwoTone
          sx={{
            color: "#cd7f32",
            ...sx,
          }}
        />
      );
    case "silver":
      return (
        <MilitaryTechTwoTone
          sx={{
            color: "#c0c0c0",
            ...sx,
          }}
        />
      );
    case "gold":
      return (
        <MilitaryTechTwoTone
          sx={{
            color: "#ffd700",
            ...sx,
          }}
        />
      );
    case "platinum":
      return (
        <MilitaryTechTwoTone
          sx={{
            color: "#e5e4e2",
            ...sx,
          }}
        />
      );
    case "diamond":
      return (
        <MilitaryTechTwoTone
          sx={{
            color: "#b9f2ff",
            ...sx,
          }}
        />
      );
  }
}

export function nextRank(rank: string) {
  switch (rank) {
    case "bronze":
      return "silver";
    case "silver":
      return "gold";
    case "gold":
      return "platinum";
    case "platinum":
      return "diamond";
    case "diamond":
      return "diamond";
  }
  return "bronze";
}

export default Rank;
