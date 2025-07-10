// src/pages/AdminDashboard.jsx
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './AdminHeader';
import Sidebar from './AdminSidebar';
import Home from './Home';
import { Toolbar } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* <Home /> */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;