// @ts-nocheck
import {
  AccountBalance,
  Notifications,
  People,
  Settings,
  ShoppingCart,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
const drawerWidth = 280;

const DashboardLayout = ({ role, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(`/login/${role}`);
  };

  const menuItems = {
    admin: [
      { text: "Manage Users", path: "/dashboard/admin", icon: <People /> },
    ],
    merchant: [
      {
        text: "Approve Purchases",
        path: "/dashboard/merchant/purchases",
        icon: <ShoppingCart />,
      },
      {
        text: "Lookup Customer",
        path: "/dashboard/merchant/customers",
        icon: <People />,
      },
      {
        text: "Set Contribution Rate",
        path: "/dashboard/merchant/contribution",
        icon: <Settings />,
      },
      {
        text: "Notifications",
        path: "/dashboard/merchant/notifications",
        icon: <Notifications />,
      },
    ],
    member: [
      {
        text: "Points Summary",
        path: "/dashboard/member",
        icon: <AccountBalance />,
      },
    ],
  };

  const drawer = (
    <Box sx={{ width: drawerWidth, pt: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
      </Typography>
      <List>
        {menuItems[role].map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </Typography>

          <Typography variant="body1" sx={{ mr: 2 }}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Typography>Logout</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
