import { Close, Done, Edit, Refresh } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  OutlinedInput,
  Skeleton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { User } from "@prisma/client";
import { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { prisma } from "../../database/prisma";
import { onChangeUserName } from "./ChangeUserName.telefunc";
import { reload } from "vike/client/router";
import ChangeUserName from "./ChangeUserName";
import ChangeEmail from "./ChangeEmail";
import Rank, { nextRank } from "../../components/Rank";
import RankProgress, { rankColor } from "../../components/RankProgress";

export default Page;

function Page() {
  const user = usePageContext().user as User;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snakbarOpen, setSnakbarOpen] = useState(false);
  const [Reloading, setReloading] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);

  const handleDialogClose = () => setDialogOpen(false);

  const handleSnakbarOpen = () => setSnakbarOpen(true);

  const handleSnakbarClose = () => setSnakbarOpen(false);

  return (
    <Container maxWidth="lg">
      <Card elevation={5}>
        <CardMedia
          sx={{
            height: 240,
          }}
          image="/assets/user-bg.jpg"
        />
        <CardContent>
          <Snackbar
            open={snakbarOpen}
            onClose={handleSnakbarClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Alert severity="error">Please set up email first</Alert>
          </Snackbar>
          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle bgcolor="primary.main">
              <Typography variant="h6" fontWeight="bold">
                Set Up / Change Avatar
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ bgcolor: "background.default" }}>
              <DialogContentText>
                <Typography mt={2}>
                  Use Gravatar to set up your avatar and refresh the page after
                  setting up
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ bgcolor: "background.default" }}>
              <Button onClick={handleDialogClose}>Cancel</Button>
              {
                // open the site in a new tab
              }
              <Button
                onClick={() => {
                  handleDialogClose();
                  window.open("https://en.gravatar.com/", "_blank");
                }}
              >
                Go to Gravatar
              </Button>
            </DialogActions>
          </Dialog>

          <IconButton
            sx={{
              bgcolor: "background.paper",
              width: 100,
              height: 100,
              mt: -8,
              mb: 4,
            }}
            onClick={
              user.email
                ? () => {
                    handleDialogOpen();
                  }
                : () => {
                    handleSnakbarOpen();
                  }
            }
          >
            {Reloading ? (
              <Skeleton variant="circular">
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                />
              </Skeleton>
            ) : (
              <Avatar
                alt={user.name ? user.name : "Unset Name"}
                src={
                  user.image
                    ? user.image
                    : "https://www.gravatar.com/avatar/?d=mp"
                }
                sx={{
                  cursor: "pointer",
                  width: 100,
                  height: 100,
                }}
              />
            )}
          </IconButton>

          <IconButton
            size="small"
            sx={{
              ml: -3,
            }}
            onClick={async () => {
              setReloading(true);
              await reload();
              setReloading(false);
            }}
          >
            <Refresh />
          </IconButton>

          <Stack
            direction="column"
            useFlexGap
            flexWrap="wrap"
            spacing={5}
            sx={{
              m: 3,
            }}
          >
            {/* role and name */}
            <ChangeUserName user={user} />
            {/* email */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              overflow="hidden"
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                }}
                variant="h5"
                color="primary.main"
              >
                Email
              </Typography>
              {
                // only show the tooltip when os is mobile
              }
              <Tooltip
                title={user.email ? user.email : "Unset Email"}
                placement="bottom"
                arrow
              >
                {/* <Typography
                  noWrap
                  component="div"
                  sx={{
                    fontWeight: 500,
                    textOverflow: "ellipsis",
                    minWidth: 0,
                    overflow: "hidden",
                    maxWidth: {
                      xs: 100,
                      sm: 300,
                      md: 400,
                      lg: 500,
                      xl: 600,
                    },
                  }}
                  variant="h6"
                >
                  {user.email ? user.email : "Unset Email"}
                </Typography> */}
                <ChangeEmail user={user} />
              </Tooltip>
              {user.email ? (
                user.emailVerified ? (
                  <Chip label="Verified" icon={<Done />} color="success" />
                ) : (
                  <Chip label="Unverified" icon={<Close />} color="error" />
                )
              ) : (
                <IconButton size="large">
                  <Edit />
                </IconButton>
              )}
            </Stack>
            {/* win/played */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
                variant="h5"
                color="primary.main"
              >
                Played
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                }}
                variant="h6"
              >
                {user.played}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
                variant="h5"
                color="primary.main"
              >
                Wins
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                }}
                variant="h6"
              >
                {user.wins}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
                variant="h5"
                color="primary.main"
              >
                Rate
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                }}
                variant="h6"
              >
                {
                  // calculate the rate
                  user.played
                    ? Math.round((user.wins / user.played) * 100) / 100
                    : 0
                }
                %
              </Typography>
            </Stack>
            {/* rank */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
                variant="h5"
                color="primary.main"
              >
                Rank
              </Typography>
              <Rank rank={user.rank} />
              <Typography
                sx={{
                  fontWeight: 500,
                  // @ts-ignore
                  color: rankColor[user.rank],
                }}
                variant="h6"
              >
                {user.rank}
              </Typography>
            </Stack>
            {/* credits */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Stack>
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}
                  variant="h5"
                  color="primary.main"
                >
                  Credits
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                  variant="h6"
                >
                  {user.credits % 100}/100 to next rank
                  <Rank rank={nextRank(user.rank)} />, {user.credits} in total
                </Typography>
                <RankProgress
                  credit={user.credits}
                  sx={{
                    minWidth: 100,
                    maxWidth: 300,
                    width: "100%",
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
