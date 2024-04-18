import { Close, Done, Edit, Refresh } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Skeleton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { User } from "@prisma/client";
import { t } from "i18next";
import { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { reload } from "vike/client/router";
import Rank, { nextRank } from "../../components/Rank";
import RankProgress, { rankColor } from "../../components/RankProgress";
import ChangeEmail from "./ChangeEmail";
import ChangeUserName from "./ChangeUserName";

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
                {t("change-avatar-title")}
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ bgcolor: "background.default" }}>
              <DialogContentText>
                <Typography mt={2}>{t("change-avatar-desc")}</Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ bgcolor: "background.default" }}>
              <Button onClick={handleDialogClose}>{t("cancel")}</Button>
              {
                // open the site in a new tab
              }
              <Button
                onClick={() => {
                  handleDialogClose();
                  window.open("https://en.gravatar.com/", "_blank");
                }}
              >
                {t("change-avatar-btn")}
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
                {t("email")}
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
                  <Chip label={t("verified")} icon={<Done />} color="success" />
                ) : (
                  <Chip
                    label={t("unverified")}
                    icon={<Close />}
                    color="error"
                  />
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
                {t("played")}
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
                {t("wins")}
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
                {t("win-rate")}
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
                {t("rankking")}
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
                  {t("credits")}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                  variant="h6"
                >
                  {user.credits % 100}/100 {t("to-next-rank")}
                  <Rank rank={nextRank(user.rank)} />, {user.credits}{" "}
                  {t("in-total")}
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
