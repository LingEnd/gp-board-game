import { Done, Edit } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  IconButton,
  OutlinedInput,
  Snackbar,
  Stack,
} from "@mui/material";
import { User } from "@prisma/client";
import { useState } from "react";
import { reload } from "vike/client/router";
import { onChangeEmail } from "./ChangeEmail.telefunc";
import { t } from "i18next";

type Props = {
  user: User;
};

function ChangeEmail({ user }: Props) {
  const [email, setEmail] = useState(user.email ? user.email : "Unset Email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [editEmail, setEditEmail] = useState(false);

  const handleEditEmail = () => setEditEmail(true);

  const handleEditEmailClose = () => setEditEmail(false);

  const renderEditButton = editEmail ? null : (
    <IconButton size="small" onClick={handleEditEmail}>
      <Edit fontSize="small" sx={{ color: "primary.contrastText" }} />
    </IconButton>
  );

  const renderLoading = loading ? (
    <CircularProgress color="info" size={30} />
  ) : null;

  const renderSubmitButton = editEmail ? (
    !loading ? (
      <IconButton
        size="small"
        onClick={async () => {
          setLoading(true);
          const error = await onChangeEmail(user.id, email);
          if (error) setError(error);
          else setSuccess(true);
          setLoading(false);
          handleEditEmailClose();
          reload();
        }}
      >
        <Done fontSize="small" sx={{ color: "primary.contrastText" }} />
      </IconButton>
    ) : null
  ) : null;

  return (
    <Stack direction="row" alignItems="center">
      <OutlinedInput
        defaultValue={user.email ? user.email : "Unset Email"}
        disabled={!editEmail}
        sx={{
          color: "primary.main",
          fontWeight: 500,
          textOverflow: "ellipsis",
          minWidth: 0,
          overflow: "hidden",
          maxWidth: {
            xs: 100,
            sm: 300,
            md: 600,
            lg: 700,
            xl: 800,
          },
        }}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {t("email-changed-successfully")}
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

export default ChangeEmail;
