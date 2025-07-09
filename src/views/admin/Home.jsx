// src/components/Dashboard/Home.jsx
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
}));

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Products */}
        <Grid item xs={12} md={6} lg={3}>
          <Item>
            <Typography variant="h6">PRODUCTS</Typography>
            <Typography variant="h4">249</Typography>
          </Item>
        </Grid>
        
        {/* Categories */}
        <Grid item xs={12} md={6} lg={3}>
          <Item>
            <Typography variant="h6">CATEGORIES</Typography>
            <Typography variant="h4">24</Typography>
          </Item>
        </Grid>
        
        {/* Customers */}
        <Grid item xs={12} md={6} lg={3}>
          <Item>
            <Typography variant="h6">CUSTOMERS</Typography>
            <Typography variant="h4">1500</Typography>
          </Item>
        </Grid>
        
        {/* Alerts */}
        <Grid item xs={12} md={6} lg={3}>
          <Item>
            <Typography variant="h6">ALERTS</Typography>
            <Typography variant="h4">56</Typography>
          </Item>
        </Grid>
        
        {/* Charts would go here */}
        <Grid item xs={12}>
          <Item>
            <Typography variant="h6">Sales Overview</Typography>
            {/* Placeholder for chart */}
            <Box sx={{ height: 300, backgroundColor: '#f5f5f5' }} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;