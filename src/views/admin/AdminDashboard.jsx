import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Drawer, List, ListItem, ListItemText, AppBar, Toolbar } from '@mui/material';

const drawerWidth = 240;

function AdminDashboard() {
  /**
   * AdminDashboard component serves as the main admin panel
   * where the admin can access and perform different functionalities.
   */

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
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'User Management', 'Content Management', 'Settings'].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
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