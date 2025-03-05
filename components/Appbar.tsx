"use client";

import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useRouter } from "next/navigation";
const getLoggedInUser = () => localStorage.getItem("token");
const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedInUser");
  
};

export default function Appbar() {
  
  const router = useRouter();
  const [token, setToken] = useState<any>("")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  useEffect(() => {
    const email = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("token")
    setToken(token)
    if (!email) {
      router.push("signin");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      router.push("signin");
      return;
    }
  }, []);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditProfile = () => {
    router.push("/editprofile");
  };
  const handleEditProducts = () => {
    router.push("/products");
  };
  const handleLogout = () => {
    logoutUser();
    setToken("")
  };
  const handleDashboard = () => {
    router.push("/dashboard")
    
  };
  const handleChangePassword = () => {
    router.push("/changePassword")
    
  };
  return (
    <Box flexGrow={1}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome
          </Typography>
          {token && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEditProfile}>change Profile</MenuItem>
                <MenuItem onClick={handleEditProducts}>Products</MenuItem>
                <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                <MenuItem onClick={handleChangePassword}>Change Password </MenuItem>
                <MenuItem onClick={handleLogout}>logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
