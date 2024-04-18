import { SmartToy } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { t } from "i18next";

export default Page;

// @ts-ignore

function Page() {
  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          m: 1,
        }}
      >
        <Link underline="hover" color="inherit" href="/">
          PBG
        </Link>
        <Typography color="text.primary">games</Typography>
      </Breadcrumbs>
      <Grid container height="max-content" spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderColor: "primary.main",
              borderWidth: 2,
              borderStyle: "solid",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia sx={{ height: 400 }} image="/assets/fcm.jpg" />
            <CardContent sx={{ flex: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {t("food-chain-magnate")}{" "}
                <Chip
                  icon={<SmartToy />}
                  label={t("no-ai")}
                  color="warning"
                  sx={{
                    ml: 1,
                    mb: 1,
                  }}
                />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("food-chain-magnate-desc")}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button variant="contained" size="small" href="/games/FCM">
                {t("play-alone")}
              </Button>
              <Button
                variant="contained"
                size="small"
                href="https://boardgamegeek.com/boardgame/175914/food-chain-magnate"
              >
                {t("learn-more")}
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderColor: "primary.main",
              borderWidth: 2,
              borderStyle: "solid",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia sx={{ height: 400 }} image="/assets/ttt.jpg" />
            <CardContent sx={{ flex: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {t("tic-tac-toe")}{" "}
                <Chip
                  icon={<SmartToy />}
                  label={t("with-ai")}
                  color="secondary"
                  sx={{
                    ml: 1,
                    mb: 1,
                  }}
                />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("tic-tac-toe-desc")}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button variant="contained" size="small" href="/games/TTT">
                {t("play-alone")}
              </Button>
              <Button
                variant="contained"
                size="small"
                href="https://en.wikipedia.org/wiki/Tic-tac-toe"
              >
                {t("learn-more")}
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderColor: "primary.main",
              borderWidth: 2,
              borderStyle: "solid",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia sx={{ height: 400 }} image="/assets/gomoku.jpg" />
            <CardContent sx={{ flex: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {t("gomoku")}{" "}
                <Chip
                  icon={<SmartToy />}
                  label={t("with-ai")}
                  color="secondary"
                  sx={{
                    ml: 1,
                    mb: 1,
                  }}
                />
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {t("gomoku-desc")}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button variant="contained" size="small" href="/games/gomoku">
                {t("play-alone")}
              </Button>
              <Button
                variant="contained"
                size="small"
                href="https://en.wikipedia.org/wiki/Gomoku"
              >
                {t("learn-more")}
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderColor: "primary.main",
              borderWidth: 2,
              borderStyle: "solid",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              sx={{
                height: 400,
                bgcolor: "secondary.main",
              }}
              image="/assets/comming-soon.svg"
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {t("coming-soon")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("coming-soon-desc")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
