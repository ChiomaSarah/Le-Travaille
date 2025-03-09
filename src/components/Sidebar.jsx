import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Toolbar,
  AppBar,
  Typography,
  CssBaseline,
  Divider,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { BusinessCenter } from "@mui/icons-material";
import { useSelector } from "react-redux";

const drawerWidth = 240;
const miniDrawerWidth = 60;

const SidebarLayout = ({ children }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const toggleDrawer = () => setOpen(!open);

  const menuItems = token
    ? [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/user/dashboard" },
        { text: "Jobs", icon: <WorkIcon />, path: "/jobs" },
        { text: "Logout", icon: <ExitToAppIcon />, path: "/auth/logout" },
      ]
    : [{ text: "Job Seeker", icon: <BusinessCenter />, path: "/job-seeker" }];

  const drawerContent = (
    <Box sx={{ width: open ? drawerWidth : miniDrawerWidth }}>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <Tooltip
            key={item.text}
            title={!open ? item.text : ""}
            placement="right"
          >
            <ListItem
              button
              component={Link}
              to={item.path}
              onClick={toggleDrawer}
              sx={{
                justifyContent: open ? "flex-start" : "center",
                paddingLeft: open ? 2 : 0,
                paddingRight: open ? 2 : 0,
                "&:hover": {
                  backgroundColor: "rgba(255, 215, 0, 0.1)", // Light golden hover
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "48px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText primary={item.text} sx={{ color: "#FFD700" }} />
              )}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: isMobile
            ? "100%"
            : `calc(100% - ${open ? drawerWidth : ""}px)`,
          zIndex: 1300,
          transition: "margin 0.3s ease, width 0.3s ease",
          backgroundColor: "#414E70",
          color: "#FFD700",
          ml: open && !isMobile ? `${drawerWidth}px` : 0, // Shift AppBar when the sidebar is open on large screens.
        }}
      >
        <Toolbar>
          {(isMobile || !open) && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Link to="/" className="text-decoration-none">
            <Typography variant="h6" color="#fff">
              Le-Travaille
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={isMobile ? toggleDrawer : undefined}
        sx={{
          width: open ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : miniDrawerWidth,
            transition: "width 0.3s ease-in-out",
            backgroundColor: "#2C3E50", // Darker theme
            color: "#fff",
            borderRight: "1px solid rgba(255, 255, 255, 0.2)",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: open ? "flex-start" : "center",
            paddingLeft: open ? 2 : 0,
            paddingRight: open ? 2 : 0,
          }}
        >
          {open && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ ml: "auto" }}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
        </Toolbar>
        <Divider />

        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin 0.3s ease-in-out, width 0.3s ease-in-out",
          ml: isMobile ? 0 : `${open ? drawerWidth : miniDrawerWidth}px`, // Shift contents when the sidebar is open on large screens.
          width: `calc(100% - ${
            isMobile ? 0 : open ? drawerWidth : miniDrawerWidth
          }px)`,
        }}
      >
        <Toolbar /> {/* Add space between the Appbar and the contents. */}
        {children}
      </Box>
    </Box>
  );
};

export default SidebarLayout;
