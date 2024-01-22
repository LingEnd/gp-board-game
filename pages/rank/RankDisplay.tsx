import React from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { onQueryRank } from "./RankDisplay.telefunc";
import { Avatar, Box, Typography } from "@mui/material";
import Rank from "../../components/Rank";
import { rankColor } from "../../components/RankProgress";

export default function RankDisplay() {
  const [users, setUsers] = React.useState<
    Array<{
      name: string | null;
      rank: string;
      credits: number;
      image: string | null;
    }>
  >();

  React.useEffect(() => {
    onQueryRank().then((users) => {
      setUsers(users);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "Rank", width: 100 },
    {
      field: "image",
      headerName: "Image",
      width: 110,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Avatar
          src={params.value}
          sx={{
            width: 40,
            height: 40,
            m: "auto",
          }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 150 },

    {
      field: "level",
      headerName: "Level",
      width: 150,
      renderCell: (params: GridRenderCellParams<any>) => (
        <>
          <Rank rank={params.value} />
          <Typography
            sx={{
              // @ts-ignore
              color: rankColor[params.value],
            }}
          >
            {params.value}
          </Typography>
        </>
      ),
    },
    { field: "score", headerName: "Score", width: 150 },
  ];
  const rows = users?.map((user, index) => {
    return {
      id: index,
      name: user.name ? user.name : "Anonymous",
      image: user.image,
      level: user.rank,
      score: user.credits,
    };
  });

  return (
    <DataGrid
      autoHeight
      sx={{
        width: "min-content",
        m: "auto",
      }}
      rows={rows ? rows : []}
      columns={columns}
    />
  );
}
