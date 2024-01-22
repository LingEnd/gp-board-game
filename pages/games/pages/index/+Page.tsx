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
                Food Chain Magnate{" "}
                <Chip
                  icon={<SmartToy />}
                  label=" AI comming soon !!"
                  color="warning"
                  sx={{
                    ml: 1,
                    mb: 1,
                  }}
                />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Food Chain Magnate is a heavy strategy game about building a
                fast food chain. The focus is on building your company using a
                card driven (human) resource management system. Players compete
                on a variable city map through purchasing, marketing and sales,
                and on a job market for key staff members. The game can be
                played by 2-5 serious gamers in 2-4 hours.
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button variant="contained" size="small" href="/games/FCM">
                play alone
              </Button>
              <Button
                variant="contained"
                size="small"
                href="https://boardgamegeek.com/boardgame/175914/food-chain-magnate"
              >
                Learn More
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
                Tic Tac Toe{" "}
                <Chip
                  icon={<SmartToy />}
                  label="with AI !!"
                  color="secondary"
                  sx={{
                    ml: 1,
                    mb: 1,
                  }}
                />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tic Tac Toe is a game for two players, X and O, who take turns
                marking the spaces in a 3×3 grid. The player who succeeds in
                placing three of their marks in a diagonal, horizontal, or
                vertical row is the winner.
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button variant="contained" size="small" href="/games/TTT">
                play alone
              </Button>
              <Button
                variant="contained"
                size="small"
                href="https://en.wikipedia.org/wiki/Tic-tac-toe"
              >
                Learn More
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
                Gomoku
                <Chip
                  icon={<SmartToy />}
                  label="with AI !!"
                  color="secondary"
                  sx={{
                    ml: 1,
                    mb: 1,
                  }}
                />
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Gomoku is an abstract strategy board game. Also called Gobang or
                Five in a Row, it is traditionally played with Go pieces (black
                and white stones) on a go board with 19x19 intersections;
                however, because once placed, pieces are not moved or removed
                from the board, gomoku may also be played as a paper and pencil
                game. This game is known in several countries under different
                names.
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button variant="contained" size="small" href="/games/gomoku">
                play alone
              </Button>
              <Button
                variant="contained"
                size="small"
                href="https://en.wikipedia.org/wiki/Gomoku"
              >
                Learn More
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
                Comming Soon
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We are working hard to bring you more games. Stay tuned!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
