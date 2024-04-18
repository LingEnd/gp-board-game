import { Box, Button, Typography } from "@mui/material";
import { usePageContext } from "vike-react/usePageContext";
import { LayoutContext } from "../../layouts/LayoutContext";
import { useContext } from "react";
import { reload } from "vike/client/router";
import { useTranslation } from "react-i18next";

export default function Page({ is404 }: { is404: boolean }) {
  const { abortReason, abortStatusCode } = usePageContext();
  const { handleLoginOpen } = useContext(LayoutContext);
  const { t } = useTranslation();
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
          {t("page-not-found")}
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          {t("page-not-found-desc")}
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
          {t("go-to-home")}
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
          {t("error-occured")}
        </Typography>

        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          {abortStatusCode === 401
            ? t("unauthorized-desc")
            : t("unknown-error") + ":\n" + (abortReason as string)}
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
              {t("refresh-page")}
            </Button>
            <Button onClick={handleLoginOpen} size="large" variant="contained">
              {t("login")}
            </Button>
          </Box>
        ) : (
          <Button href="/" size="large" variant="contained">
            {t("go-to-home")}
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
