export default Page;

import { Breadcrumbs, Button, Link, Stack, Typography } from "@mui/material";
import { t } from "i18next";

function Page() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          PBG
        </Link>
        <Typography color="text.primary">{t("admin")}</Typography>
      </Breadcrumbs>
      <Stack spacing={2} width="max-content" m="auto" mt={20}>
        <Button variant="contained" color="primary" href="admin/users">
          <Typography variant="h6">{t("manage-users")}</Typography>
        </Button>
        <Button variant="contained" color="primary" href="admin/announcements">
          <Typography variant="h6">{t("manage-announcements")}</Typography>
        </Button>
      </Stack>
    </>
  );
}
