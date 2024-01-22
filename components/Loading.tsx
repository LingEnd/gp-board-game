import { Box } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 9999,
        }}
        component="img"
        src="/assets/fast-loading.svg"
      />
    </Box>
  );
}

export default Loading;
