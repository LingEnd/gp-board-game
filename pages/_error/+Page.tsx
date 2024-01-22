import { Box, Button, Typography } from "@mui/material";
import { usePageContext } from "vike-react/usePageContext";
import { LayoutContext } from "../../layouts/LayoutContext";
import { useContext } from "react";
import { reload } from "vike/client/router";

export default function Page({ is404 }: { is404: boolean }) {
  const { abortReason, abortStatusCode } = usePageContext();
  const { handleLoginOpen } = useContext(LayoutContext);

  if (is404) {
    return (
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" sx={{ m: 3 }}>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src="/assets/page-not-found.svg"
          sx={{
            mx: "auto",
            width: "40%",
          }}
        />

        <Button href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            color: "primary.main",
            fontWeight: "bold",
          }}
        >
          {abortStatusCode}
        </Typography>
        <Typography variant="h5" sx={{ m: 3 }}>
          Sorry!
        </Typography>

        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          {abortReason as string}
        </Typography>

        <Box
          component="img"
          src="/assets/bad-connection.svg"
          sx={{
            mx: "auto",
            width: "40%",
          }}
        />

        {abortStatusCode === 401 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "30%",
            }}
          >
            <Button
              onClick={() => {
                refresh();
              }}
              size="large"
              variant="contained"
            >
              Refresh
            </Button>
            <Button onClick={handleLoginOpen} size="large" variant="contained">
              Sign in
            </Button>
          </Box>
        ) : (
          <Button href="/" size="large" variant="contained">
            Go to Home
          </Button>
        )}
      </Box>
    );
  }
}

async function refresh() {
  await reload();
  // Reload is finished
}
