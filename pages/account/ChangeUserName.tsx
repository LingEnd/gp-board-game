import { Done, Edit } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  IconButton,
  OutlinedInput,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { User } from "@prisma/client";
import { useState } from "react";
import { reload } from "vike/client/router";
import { onChangeUserName } from "./ChangeUserName.telefunc";
import { t } from "i18next";

type Props = {
  user: User;
};

function ChangeUserName({ user }: Props) {
  const [name, setName] = useState(user.name ? user.name : "Unset Name");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [editName, setEditName] = useState(false);

  const handleEditName = () => setEditName(true);

  const handleEditNameClose = () => setEditName(false);

  const renderEditButton = editName ? null : (
    <IconButton size="large" onClick={handleEditName}>
      <Edit fontSize="large" sx={{ color: "primary.contrastText" }} />
    </IconButton>
  );

  const renderLoading = loading ? (
    <IconButton size="large">
      <CircularProgress color="info" size={48} />
    </IconButton>
  ) : null;

  const renderSubmitButton = editName ? (
    !loading ? (
      <IconButton
        size="large"
        onClick={async () => {
          setLoading(true);
          const error = await onChangeUserName(user.id, name);
          if (error) setError(error);
          else setSuccess(true);
          await reload();
          setLoading(false);
          handleEditNameClose();
        }}
      >
        <Done fontSize="large" sx={{ color: "primary.contrastText" }} />
      </IconButton>
    ) : null
  ) : null;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "2rem",
        }}
        variant="h5"
        color="primary.main"
      >
        {user.role
          ? user.role === "admin"
            ? t("admin")
            : t("player")
          : t("guest")}
      </Typography>
      <OutlinedInput
        defaultValue={user.name ? user.name : "Unset Name"}
        disabled={!editName}
        sx={{
          fontWeight: 600,
          color: "primary.main",
          fontSize: "2rem",
          width: "fit-content",
        }}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {t("name-changed-successfully")}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error !== ""}
        autoHideDuration={6000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      {renderEditButton}
      {renderLoading}
      {renderSubmitButton}
    </Stack>
  );
}

export default ChangeUserName;
