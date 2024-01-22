export default Page;
// import {
//   Box,
//   Breadcrumbs,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   Link,
//   MenuItem,
//   Select,
//   Stack,
//   TextField,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { LobbyAPI } from "boardgame.io";
// import { LobbyClient } from "boardgame.io/client";
// import { useEffect, useState } from "react";
// import { reload } from "vike/client/router";
// import { FCM } from "../../games/src/Game";
// import { usePageContext } from "vike-react/usePageContext";
// import { Person, PersonOutlined } from "@mui/icons-material";

// function Page() {
//   const server = "http://" + window.location.hostname + ":8000";
//   const lobbyClient = new LobbyClient({
//     server: server,
//   });
//   const { user } = usePageContext();
//   const [open, setOpen] = useState(false);
//   const games = ["Food-Chain-Magnate", "tic-tac-toe", "gomoku"];
//   const [game, setGame] = useState("gomoku");
//   const [numPlayers, setNumPlayers] = useState(0);
//   const [playerName, setPlayerName] = useState("");
//   const [matches, setMatches] = useState<LobbyAPI.MatchList>({ matches: [] });

//   const gamePlayers = {
//     "Food-Chain-Magnate": Array.from(
//       Array((FCM.maxPlayers as number) - 1).keys()
//     ).map((i) => i + 2),
//     "tic-tac-toe": [2],
//     gomoku: [2],
//   };

//   useEffect(() => {
//     setPlayerName(user?.name || "");
//     let m: any = [];
//     games.forEach((game) => {
//       lobbyClient.listMatches(game).then((matchList) => {
//         m = m.concat(matchList.matches);
//         setMatches({ matches: m });
//       });
//     });
//   }, []);

//   const ToolBar = () => {
//     return (
//       <Box
//         sx={{
//           p: 1,
//           display: "flex",
//           gap: 3,
//         }}
//       >
//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={() => {
//             let m: any = [];
//             games.forEach((game) => {
//               lobbyClient.listMatches(game).then((matchList) => {
//                 m = m.concat(matchList.matches);
//                 setMatches({ matches: m });
//               });
//             });
//           }}
//         >
//           Refresh
//         </Button>
//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={() => {
//             setOpen(true);
//           }}
//         >
//           Create Match
//         </Button>
//       </Box>
//     );
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 200 },
//     { field: "matchID", headerName: "Match ID", width: 200, hide: true },
//     { field: "gameName", headerName: "Game", width: 200 },
//     {
//       field: "players",
//       headerName: "Players",
//       width: 200,
//       renderCell: (params: any) =>
//         params.value.map((player: any) => {
//           return Object.keys(player).includes("name") ? (
//             <Tooltip title={player.name}>
//               <Person />
//             </Tooltip>
//           ) : (
//             <Tooltip title="empty">
//               <PersonOutlined />
//             </Tooltip>
//           );
//         }),
//     },
//     {
//       field: "createdAt",
//       headerName: "Created At",
//       width: 200,
//       valueGetter: (params: any) => {
//         return new Date(params.value).toLocaleString();
//       },
//     },
//     {
//       field: "updatedAt",
//       headerName: "Updated At",
//       width: 200,
//       valueGetter: (params: any) => {
//         return new Date(params.value).toLocaleString();
//       },
//     },
//   ];

//   const rows = matches.matches.map((match, index) => {
//     return {
//       id: index,
//       matchID: match.matchID,
//       gameName: match.gameName,
//       players: match.players,
//       createdAt: match.createdAt,
//       updatedAt: match.updatedAt,
//     };
//   });

//   return (
//     <Box height="100%">
//       <Breadcrumbs aria-label="breadcrumb">
//         <Link underline="hover" color="inherit" href="/">
//           PBG
//         </Link>
//         <Typography color="text.primary">Lobby</Typography>
//       </Breadcrumbs>
//       <DataGrid
//         initialState={{
//           columns: {
//             columnVisibilityModel: {
//               id: false,
//             },
//           },
//         }}
//         rows={rows}
//         columns={columns}
//         slots={{
//           toolbar: ToolBar,
//         }}
//       />
//       <Dialog
//         open={open}
//         onClose={() => {
//           setOpen(false);
//         }}
//       >
//         <DialogTitle
//           sx={{
//             bgcolor: "primary.main",
//           }}
//         >
//           Create Match
//         </DialogTitle>
//         <DialogContent
//           sx={{
//             bgcolor: "background.default",
//           }}
//         >
//           <Stack
//             sx={{
//               width: "max-content",
//               minWidth: "200px",
//             }}
//             spacing={2}
//             p={2}
//           >
//             <FormControl fullWidth>
//               <InputLabel id="chose-a-game-label">Chose a game</InputLabel>
//               <Select
//                 value={game}
//                 label="Chose a game"
//                 labelId="chose-a-game-label"
//                 id="chose-a-game"
//                 onChange={(e) => {
//                   setGame(e.target.value);
//                 }}
//               >
//                 {games.map((game) => {
//                   return <MenuItem value={game}>{game}</MenuItem>;
//                 })}
//               </Select>
//             </FormControl>

//             <FormControl fullWidth>
//               <InputLabel id="chose-num-player-label">
//                 Chose player number
//               </InputLabel>
//               <Select
//                 value={numPlayers}
//                 label="Chose player number"
//                 labelId="chose-num-player-label"
//                 id="chose-num-player"
//                 onChange={(e) => {
//                   setNumPlayers(e.target.value as number);
//                 }}
//               >
//                 {game &&
//                   // @ts-ignore
//                   gamePlayers[game as keyof gamePlayers].map((n) => {
//                     return <MenuItem value={n}>{n}</MenuItem>;
//                   })}
//               </Select>
//             </FormControl>

//             <TextField
//               fullWidth
//               label="Player Name"
//               value={playerName}
//               onChange={(e) => {
//                 setPlayerName(e.target.value);
//               }}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions
//           sx={{
//             bgcolor: "background.default",
//           }}
//         >
//           <Button
//             onClick={() => {
//               setOpen(false);
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={() => {
//               lobbyClient
//                 .createMatch(game, {
//                   numPlayers: numPlayers,
//                 })
//                 .then((Match) => {
//                   lobbyClient.joinMatch(game, Match.matchID, {
//                     playerID: "0",
//                     playerName: playerName,
//                   });
//                 })
//                 .then(() => {
//                   setOpen(false);
//                 });
//             }}
//           >
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// @ts-ignore
import { ClientOnly } from "vike-react/ClientOnly";
import Loading from "../../components/Loading";

function Page() {
  return (
    <ClientOnly
      load={async () => import("./LobbyDisplay")}
      fallback={<Loading />}
    >
      {
        // @ts-ignore
        (Map) => <Map />
      }
    </ClientOnly>
  );
}
