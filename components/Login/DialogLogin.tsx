import { GitHub, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
  SvgIcon,
  TextField,
  useTheme,
} from "@mui/material";
import { useRef, useState } from "react";
import { Form } from "./Form";
import LoginSwitcher from "./LoginSwitcher";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  onClose: () => void;
  csrfToken: string;
};

export const DialogLogin = (props: Props) => {
  const { t } = useTranslation();
  const { csrfToken, open, onClose } = props;
  const [showPassword, setShowPassword] = useState(true);
  const [emailOrUsername, setEmailOrUsername] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [emailInputError, setEmailInputError] = useState(true);
  const [helpTest, setHelpTest] = useState("");
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = () => {
    setEmailOrUsername((prev) => !prev);
  };

  const containerRef = useRef<HTMLElement>(null);

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "background.default",
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            mb: 1,
            fontWeight: "bold",
            bgcolor: "primary.main",
          }}
        >
          {t("auth-title")}
        </DialogTitle>
        <DialogContent
          sx={{
            mx: 3,
            mb: 3,
            maxWidth: "300px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <LoginSwitcher onChange={handleChange} checked={emailOrUsername} />
          <Form action="/api/auth/callback/credentials" method="POST">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <input type="hidden" name="callbackUrl" value="/" />
            <Slide
              direction="right"
              in={emailOrUsername}
              container={containerRef.current}
            >
              <TextField
                margin="dense"
                sx={{
                  mb: -8,
                }}
                id="Email"
                label={t("email-address")}
                type="email"
                fullWidth
                name="email"
              />
            </Slide>
            <Slide
              direction="left"
              in={!emailOrUsername}
              container={containerRef.current}
            >
              <TextField
                margin="dense"
                sx={{}}
                id="Username"
                label={t("username")}
                type="text"
                name="username"
                fullWidth
              />
            </Slide>
            <FormControl
              sx={{
                my: 1,
              }}
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="outlined-adornment-password">
                {t("password")}
              </InputLabel>
              <OutlinedInput
                fullWidth
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t("password")}
              />
            </FormControl>
            <Button
              sx={{
                width: "100%",
                textTransform: "none",
              }}
              variant="contained"
              type="submit"
            >
              {t("login")}
            </Button>
          </Form>
          <Divider variant="fullWidth" sx={{ m: 1, width: "85%" }}>
            {t("or")}
          </Divider>
          <Form action="/api/auth/signin/email" method="POST">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <input type="hidden" name="callbackUrl" value="/" />
            <TextField
              margin="dense"
              id="email"
              label={helpTest === "" ? t("email-address") : helpTest}
              type="email"
              fullWidth
              name="email"
              error={emailInputError}
              value={emailInput}
              onFocus={(e) => {
                const value = e.target.value;
                // check email format
                if (value.length > 0) {
                  if (
                    value.match(
                      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
                    )
                  ) {
                    setEmailInputError(false);
                    setHelpTest("");
                  } else {
                    setEmailInputError(true);
                    setHelpTest(t("invalid-email"));
                  }
                } else {
                  setEmailInputError(true);
                  setHelpTest(t("please-input-email"));
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                setEmailInput(value);
                // check email format
                if (value.length > 0) {
                  if (
                    value.match(
                      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
                    )
                  ) {
                    setEmailInputError(false);
                    setHelpTest("");
                  } else {
                    setEmailInputError(true);
                    setHelpTest(t("invalid-email"));
                  }
                } else {
                  setEmailInputError(true);
                  setHelpTest(t("please-input-email"));
                }
              }}
            />
            <Button
              disabled={emailInputError}
              sx={{
                width: "100%",
                textTransform: "none",
                display: "flex",
              }}
              variant="contained"
              type="submit"
            >
              <Box sx={{ flex: 5 }}>{t("login-with-email")}</Box>
            </Button>
          </Form>
          <Divider variant="fullWidth" sx={{ m: 1, width: "85%" }}>
            {t("or")}
          </Divider>
          <Form action="/api/auth/signin/github" method="POST">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <input type="hidden" name="callbackUrl" value="/" />
            <Button
              sx={{
                width: "100%",
                textTransform: "none",
                display: "flex",
              }}
              variant="contained"
              onClick={onClose}
              type="submit"
            >
              <GitHub
                sx={{
                  flex: 1,
                  mr: 1,
                }}
              />
              <Box sx={{ flex: 5 }}>{t("login-with-github")}</Box>
            </Button>
          </Form>
          <Form action="/api/auth/signin/google" method="POST">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <input type="hidden" name="callbackUrl" value="/" />
            <Button
              sx={{
                width: "100%",
                textTransform: "none",
                display: "flex",
              }}
              variant="contained"
              type="submit"
            >
              <Google
                sx={{
                  flex: 1,
                  mr: 1,
                }}
              />
              <Box sx={{ flex: 5 }}>{t("login-with-google")}</Box>
            </Button>
          </Form>
          <Form>
            <Button
              sx={{
                width: "100%",
                display: "flex",
                textTransform: "none",
              }}
              variant="contained"
              onClick={onClose}
              disabled
            >
              <SvgIcon
                sx={{
                  flex: 1,
                  mr: 1,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="18"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill={theme.palette.primary.contrastText.toString()}
                    d="M385.2 167.6c6.4 0 12.6 .3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2 .1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3 .1 10-9.9 19.6-24.4 19.6z"
                  />
                </svg>
              </SvgIcon>
              <Box sx={{ flex: 5 }}>{t("login-with-wechat")}</Box>
            </Button>
          </Form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
