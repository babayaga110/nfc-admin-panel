import * as React from "react";
import {
  Box,
  Divider,
  GlobalStyles,
  IconButton,
  Input,
  ListItem,
  ListItemButton,
  ListItemContent,
  List,
  Sheet,
  Typography,
  Avatar,
  listItemButtonClasses,
  useColorScheme,
} from "@mui/joy";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from "../../utils/utils";

import { useAlert } from "../../useContext/AlertContext";
import { useNavigate } from "react-router-dom";
import {
  Event,
  DashboardRounded,
  GroupRounded,
  BookOnline,
  VideoCameraBack,
  DarkModeRounded,
  LightModeRounded,
} from "@mui/icons-material";
import routes from "../../routes/routes";
import { getCookie, removeCookie } from "../../utils/cookies";

function ColorSchemeToggle(props) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
    </IconButton>
  );
}

const renderNestedList = (routes, navigate) => {
  const renderedPaths = [];

  return routes
    .map(({ path, label, icon }) => {
      const pathSegments = path.split("/");
      const isNested = pathSegments.length > 2;
      const parentPath = `/${pathSegments[1]}`;

      // Check if the parent path has already been rendered
      if (renderedPaths.includes(parentPath)) {
        return null;
      }

      renderedPaths.push(parentPath);

      if (isNested) {
        const childRoutes = routes.filter(
          (route) =>
            route.path.startsWith(parentPath) && route.path !== parentPath
        );

        return (
          <ListItem nested key={parentPath}>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  {icon}
                  <ListItemContent>
                    <Typography level="title-sm">
                      {parentPath.slice(1).charAt(0).toUpperCase() +
                        parentPath.slice(1).slice(1)}
                    </Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                {childRoutes.map(({ path, label }) => (
                  <ListItem sx={{ mt: 0.5 }} key={path}>
                    <ListItemButton onClick={() => navigate(path)}>
                      <Typography level="title-sm">{label}</Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Toggler>
          </ListItem>
        );
      } else {
        return (
          <ListItem key={path}>
            <ListItemButton onClick={() => navigate(path)}>
              {icon}
              <ListItemContent>
                <Typography level="title-sm">{label}</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        );
      }
    })
    .filter((item) => item !== null);
};

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.clear();
      removeCookie("_token");
      removeCookie("_email");
      removeCookie("_uid");
      removeCookie("_rr");
      navigate("/auth");
      showAlert(
        "Success",
        "You have been signed out successfully.",
        "success",
        "info"
      );
    } catch (error) {
      showAlert(
        "Error",
        `Failed to sign out. ${error.message}`,
        "error",
        "info"
      );
    }
  };

  const filteredRoutes = routes.filter((route) =>
    route.allowedRoles.some((role) => getCookie("_rr") === role)
  );

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 9,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Admin Portal</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Search"
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          {renderNestedList(filteredRoutes, navigate)}
        </List>

        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="outlined"
          size="sm"
          src={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          }
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm" noWrap>
            {getCookie("_email").split("@")[0].toUpperCase()} DEMO
          </Typography>
          <Typography level="body-xs" noWrap>
           {getCookie("_email")}
          </Typography>
        </Box>
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={handleLogout}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
