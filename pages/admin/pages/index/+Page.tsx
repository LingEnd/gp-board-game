export default Page;

import { Breadcrumbs, Button, Typography, Link, Stack } from "@mui/material";
import React from "react";

function Page() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          PBG
        </Link>
        <Typography color="text.primary">admin</Typography>
      </Breadcrumbs>
      <Stack spacing={2} width="max-content" m="auto" mt={20}>
        <Button variant="contained" color="primary" href="admin/users">
          <Typography variant="h6">Manage User</Typography>
        </Button>
        <Button variant="contained" color="primary" href="admin/announcements">
          <Typography variant="h6">Manage Announcements</Typography>
        </Button>
      </Stack>
    </>
  );
}
