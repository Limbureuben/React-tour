// src/components/Header/Header.jsx
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Badge,
  Menu, MenuItem, Avatar, Dialog, DialogTitle, DialogContent, Card, CardContent
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setOpenProfile(true);
    handleMenuClose();
  };

  const handleLogout = () => {
    // TODO: implement logout logic
    console.log('Logout clicked');
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#06923E' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ADMIN STORE
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={56} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar sx={{ bgcolor: '#fff', color: '#06923E' }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Profile Dialog */}
      <Dialog open={openProfile} onClose={() => setOpenProfile(false)}>
        <DialogTitle>My Profile</DialogTitle>
        <DialogContent>
          <Card variant="outlined" sx={{ minWidth: 300 }}>
            <CardContent>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2">Email: johndoe@example.com</Typography>
              <Typography variant="body2">Role: Administrator</Typography>
              {/* Add dynamic data here if you fetch it from backend */}
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
