
import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Badge, Avatar, Menu, MenuItem,
  Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getProfile } from '../../services/UserService';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Fetch profile when dialog opens
  useEffect(() => {
    if (profileOpen) {
      setLoading(true);
      getProfile()
        .then(data => {
          setProfile(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch profile:', err);
          setLoading(false);
        });
    }
  }, [profileOpen]);

  const handleProfileClick = () => {
    handleMenuClose();
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
    setProfile(null);
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

          <Box sx={{ ml: 2 }}>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                p: 0,
                border: '2px solid transparent',
                '&:hover': { borderColor: 'white' }
              }}
            >
              <Avatar
                alt="Admin"
                src="/profile.jpg"
                sx={{ width: 36, height: 36 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Dialog */}
      <Dialog open={profileOpen} onClose={handleProfileClose}>
        <DialogTitle>Admin Profile</DialogTitle>
        <DialogContent dividers>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : profile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src="/profile.jpg" sx={{ width: 60, height: 60 }} />
              <Box>
                <Typography variant="subtitle1"><strong>Name:</strong> {profile.name || profile.username}</Typography>
                <Typography variant="subtitle2"><strong>Email:</strong> {profile.email}</Typography>
                <Typography variant="body2"><strong>Role:</strong> {profile.role}</Typography>
              </Box>
            </Box>
          ) : (
            <Typography color="error">Failed to load profile data.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
