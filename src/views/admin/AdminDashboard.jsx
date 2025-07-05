import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

function AdminDashboard() {
  /**
   * AdminDashboard component serves as the main admin panel
   * where the admin can access and perform different functionalities.
   */

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', onClick: () => alert('Navigate to Dashboard') },
    { text: 'User Management', onClick: () => alert('Navigate to User Management') },
    { text: 'Content Management', onClick: () => alert('Navigate to Content Management') },
    { text: 'Settings', onClick: () => alert('Navigate to Settings') },
  ];

  const handleUserManagement = () => {
    alert('Navigate to User Management');
  };

  const handleContentManagement = () => {
    alert('Navigate to Content Management');
  };

  const handleSettings = () => {
    alert('Navigate to Settings');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 56,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 56,
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-end' : 'center',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer} color="inherit" size="large">
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map(({ text, onClick }) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={onClick}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: 2,
                  mb: 1,
                  color: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    color: '#0d47a1',
                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
                  },
                }}
              >
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0, fontWeight: 'medium' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            {!open && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
                sx={{ mr: 2 }}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />

        {/* Dashboard Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage all registered users.
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleUserManagement}>
                  Go to User Management
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Content
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage website content and posts.
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleContentManagement}>
                  Go to Content Management
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Settings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure system settings.
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleSettings}>
                  Go to Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AdminDashboard;