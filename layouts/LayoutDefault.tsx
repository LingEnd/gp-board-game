import {
  AccountCircle,
  AssignmentInd,
  ChevronLeft,
  ChevronRight,
  Deck,
  GitHub,
  Home,
  Login,
  Logout,
  ManageAccounts,
  Menu as MenuIcon,
  MilitaryTech,
  NoAccounts,
  Notifications,
  SportsEsports,
  Translate,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Drawer as MuiDrawer,
  Skeleton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { Link } from "../components/Link";
import { DialogLogin } from "../components/Login/DialogLogin";
import Logo from "../components/Logo";
import "../i18n/i18n";
import AppBarButton from "./AppBar/AppBarButton";
import ThemeSwitcher from "./AppBar/ThemeSwitcher";
import ColorModeContextProvider from "./themes/useCorlorModeContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { reload } from "vike/client/router";
import { LayoutContext } from "./LayoutContext";
import UserPannel from "./UserPannel";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Shell = styled(Box)(({ theme }) => ({
  transition: theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.standard,
  }),
}));

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [LogoutOpen, setLogoutOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { user } = usePageContext();
  const [csrfToken, setCsrfToken] = React.useState("");
  const theme = useTheme();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setLoading(false);
    const data = fetch("/api/auth/csrf", {
      body: null,
      method: "GET",
    }).then((res) => {
      return res.json();
    });
    data.then((res) => {
      setCsrfToken(res.csrfToken);
    });
  }, []);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLogoutOpen = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [anchorElLanguage, setAnchorElLanguage] =
    React.useState<null | HTMLElement>(null);

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null);
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    reload();
    handleCloseLanguageMenu();
  };

  return (
    <React.StrictMode>
      <ColorModeContextProvider>
        <CssBaseline>
          <LayoutContext.Provider value={{ handleLoginOpen: handleLoginOpen }}>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  bgcolor: "background.default",
                  position: "fixed",
                  height: {
                    xs: "56px",
                    md: "64px",
                  },
                  width: "100%",
                }}
              />
              <AppBar position="fixed" open={open}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: 5,
                      ...(open && { display: "none" }),
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Logo sx={{ display: open ? "none" : "flex", mr: 1 }} />
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: open ? "none" : "flex" },
                      fontFamily: "roboto",
                      fontWeight: "bold",
                      letterSpacing: ".05rem",
                      color: "primary.contrastText",
                      textDecoration: "none",
                    }}
                  >
                    {t("main-title")}
                  </Typography>
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: open ? "none" : "flex", md: "none" },
                      flexGrow: 1,
                      fontFamily: "roboto",
                      fontWeight: "bold",
                      letterSpacing: ".05rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {t("short-title")}
                  </Typography>
                  <Box
                    sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                  />
                  <Box sx={{ flexGrow: 0 }}>
                    <Link href="https://github.com/LingEnd/board-game">
                      <AppBarButton title={t("github-button")}>
                        <GitHub fontSize="small" />
                      </AppBarButton>
                    </Link>
                    <AppBarButton title={t("notification-button")}>
                      {
                        // TODO make notifications panel
                      }
                      <Notifications fontSize="small" />
                    </AppBarButton>
                    <ThemeSwitcher />
                    <AppBarButton title={t("language-button")}>
                      <IconButton
                        onClick={handleOpenLanguageMenu}
                        sx={{ p: 0 }}
                      >
                        <Translate fontSize="small" />
                      </IconButton>
                    </AppBarButton>
                    <Menu
                      sx={{ mt: "25px" }}
                      anchorEl={anchorElLanguage}
                      open={Boolean(anchorElLanguage)}
                      onClose={handleCloseLanguageMenu}
                    >
                      <MenuItem onClick={() => handleLanguageChange("en")}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          <Box
                            component="img"
                            src="/assets/english.svg"
                            sx={{
                              width: 40,
                              mr: 1,
                              verticalAlign: "middle",
                            }}
                          />
                          English
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={() => handleLanguageChange("zh")}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          <Box
                            component="img"
                            src="/assets/china.svg"
                            sx={{
                              width: 40,
                              mr: 1,
                              verticalAlign: "middle",
                            }}
                          />
                          中文
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={() => handleLanguageChange("jp")}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          <Box
                            component="img"
                            src="/assets/japan.svg"
                            sx={{
                              width: 40,
                              mr: 1,
                              verticalAlign: "middle",
                            }}
                          />
                          日本語
                        </Typography>
                      </MenuItem>
                    </Menu>
                    <Tooltip title={user ? user.name : t("no-account")}>
                      <IconButton
                        onClick={user ? handleOpenUserMenu : handleLoginOpen}
                        sx={{ p: 0 }}
                      >
                        {loading ? (
                          <Skeleton variant="circular">
                            <Avatar
                              sx={{
                                width: 45,
                                height: 45,
                              }}
                            />
                          </Skeleton>
                        ) : user ? (
                          user.image ? (
                            <Avatar
                              sx={{
                                width: 45,
                                height: 45,
                              }}
                              src={user.image}
                            />
                          ) : (
                            <AccountCircle
                              sx={{
                                width: 45,
                                height: 45,
                              }}
                            />
                          )
                        ) : (
                          <NoAccounts
                            sx={{
                              width: 45,
                              height: 45,
                            }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                    {user === undefined ? null : (
                      <Menu
                        sx={{ mt: "50px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <UserPannel user={user} />
                      </Menu>
                    )}
                  </Box>
                </Toolbar>

                <LinearProgress
                  sx={{
                    display: loading ? "block" : "none",
                  }}
                />
              </AppBar>
              <Drawer variant="permanent" open={open}>
                <DrawerHeader
                  sx={{
                    justifyContent: "space-between",
                  }}
                >
                  <Toolbar>
                    <Logo sx={{ display: open ? "flex" : "none", mr: 1 }} />
                    <Typography
                      variant="h5"
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                        mr: 2,
                        display: open ? "flex" : "none",
                        flexGrow: 1,
                        fontFamily: "roboto",
                        fontWeight: "bold",
                        letterSpacing: ".05rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      PBG
                    </Typography>
                  </Toolbar>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                      <ChevronRight />
                    ) : (
                      <ChevronLeft />
                    )}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  <ListItem
                    key={"Home"}
                    disablePadding
                    sx={{
                      display: "block",
                    }}
                  >
                    <ListItemButton
                      href={"/home"}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Home />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          opacity: open ? 1 : 0,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          {t("home")}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    key={"Games"}
                    disablePadding
                    sx={{
                      display: "block",
                    }}
                  >
                    <ListItemButton
                      href={"/games"}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <SportsEsports />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          opacity: open ? 1 : 0,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          {t("games")}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    key={"Lobby"}
                    disablePadding
                    sx={{
                      display: "block",
                    }}
                  >
                    <ListItemButton
                      href={"/lobby"}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Deck />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          opacity: open ? 1 : 0,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          {t("lobby")}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    key={"Rank"}
                    disablePadding
                    sx={{
                      display: "block",
                    }}
                  >
                    <ListItemButton
                      href={"/rank"}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <MilitaryTech />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          opacity: open ? 1 : 0,
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          {t("rank")}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
                <Divider />
                {loading ? (
                  <List
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      sx={{
                        display: "block",
                        height: 48,
                        width: 30,
                      }}
                    />
                  </List>
                ) : user ? (
                  <List>
                    <ListItem
                      key="Account"
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                        href="/account"
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <AssignmentInd />
                        </ListItemIcon>
                        <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {t("account")}
                          </Typography>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                    {user.role === "admin" ? (
                      <ListItem
                        key="Admin"
                        disablePadding
                        sx={{ display: "block" }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                          href="/admin"
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            <ManageAccounts />
                          </ListItemIcon>
                          <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {t("admin")}
                            </Typography>
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ) : null}
                    <ListItem
                      key="Sign out"
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <Button
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          textTransform: "none",
                        }}
                        onClick={handleLogoutOpen}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <Logout />
                        </ListItemIcon>

                        <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {t("logout")}
                          </Typography>
                        </ListItemText>
                      </Button>
                      <Dialog open={LogoutOpen} onClose={handleLogoutClose}>
                        <Box
                          sx={{
                            bgcolor: "background.default",
                          }}
                        >
                          <DialogTitle
                            sx={{
                              fontWeight: "bold",
                              bgcolor: "primary.main",
                            }}
                          >
                            {t("logout")}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText
                              sx={{
                                fontWeight: "bold",
                              }}
                            >
                              <br />
                              {t("logout-confirm")}
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              sx={{ fontWeight: "bold" }}
                              onClick={handleLogoutClose}
                            >
                              {t("cancel")}
                            </Button>
                            <form action="/api/auth/signout" method="POST">
                              <input
                                type="hidden"
                                name="csrfToken"
                                value={csrfToken}
                              />

                              <Button sx={{ fontWeight: "bold" }} type="submit">
                                {t("logout")}
                              </Button>
                            </form>
                          </DialogActions>
                        </Box>
                      </Dialog>
                    </ListItem>
                  </List>
                ) : (
                  <ListItem
                    key="Login"
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      onClick={handleLoginOpen}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Login />
                      </ListItemIcon>
                      <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {t("login")}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                )}
              </Drawer>
              <Shell component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
              </Shell>
            </Box>
            <DialogLogin
              open={loginOpen}
              onClose={handleLoginClose}
              csrfToken={csrfToken}
            />
          </LayoutContext.Provider>
        </CssBaseline>
      </ColorModeContextProvider>
    </React.StrictMode>
  );
}
