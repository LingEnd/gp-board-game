import React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import { onQueryUser, onUpdateUser, onDeleteUser } from "./UserQuery.telefunc";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Breadcrumbs,
  DialogContentText,
  Link,
  DialogTitle,
  Typography,
} from "@mui/material";
import Rank from "../../../../components/Rank";
import { rankColor } from "../../../../components/RankProgress";
import { User } from "@prisma/client";
import { Done, Close, Delete } from "@mui/icons-material";
import { usePageContext } from "vike-react/usePageContext";

export default function UserDisplay() {
  const { user } = usePageContext();
  const [users, setUsers] = React.useState<Array<User>>();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [chosenId, setChosenId] = React.useState<string>();
  const handleLogoutOpen = () => {
    setDialogOpen(true);
  };

  const handleLogoutClose = () => {
    setDialogOpen(false);
  };

  React.useEffect(() => {
    onQueryUser().then((users) => {
      setUsers(users);
    });
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
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
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
      renderCell: (params: GridRenderCellParams<any>) =>
        // if params.value is undefined, return "Anonymous"
        params.value ? params.value : "Anonymous",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "emailVerified",
      headerName: "Email Verified",
      width: 160,
      renderCell: (params: GridRenderCellParams<any>) =>
        params.value ? (
          <Chip label="Verified" icon={<Done />} color="success" />
        ) : (
          <Chip label="Unverified" icon={<Close />} color="error" />
        ),
    },
    {
      field: "rank",
      headerName: "Level",
      editable: true,
      width: 110,
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
    { field: "credits", headerName: "Score", width: 110, editable: true },
    { field: "played", headerName: "Played", width: 120 },
    { field: "wins", headerName: "Wins", width: 100 },
    {
      field: "role",
      headerName: "Role",
      width: 100,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => {
            setChosenId(params.row.id);
            handleLogoutOpen();
          }}
          disabled={params.row.id === user?.id}
        />,
      ],
    },
  ];
  const rows = users?.map((user) => {
    return {
      id: user.id,
      name: user.name,
      image: user.image,
      rank: user.rank,
      credits: user.credits,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
      played: user.played,
      wins: user.wins,
    };
  });

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          PBG
        </Link>
        <Link underline="hover" color="inherit" href="/admin">
          admin
        </Link>
        <Typography color="text.primary">user management</Typography>
      </Breadcrumbs>
      <DataGrid
        autoHeight
        sx={{
          width: "min-content",
          m: "auto",
          mt: 2,
        }}
        rows={rows ? rows : []}
        columns={columns}
        processRowUpdate={async (params) => onUpdateUser(params)}
      />
      <Dialog open={dialogOpen} onClose={handleLogoutClose}>
        <Box
          sx={{
            bgcolor: "background.default",
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: "bold",
              bgcolor: "primary.main",
            }}
          >
            DELETE
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                fontWeight: "bold",
              }}
            >
              <br />
              Are you sure you want to delete ID {chosenId}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{ fontWeight: "bold" }} onClick={handleLogoutClose}>
              Cancel
            </Button>
            <Button
              sx={{ fontWeight: "bold" }}
              onClick={async () => {
                if (!chosenId) return;
                await onDeleteUser(chosenId);
                handleLogoutClose();
                setUsers(
                  users?.filter((user) => {
                    return user.id !== chosenId;
                  })
                );
              }}
            >
              confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
