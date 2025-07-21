import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { label: 'Products', icon: <ShoppingCartIcon />, path: '/admin/products' },
    { label: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
    { label: 'Customers', icon: <PeopleIcon />, path: '/admin/customers' },
    { label: 'Inventory', icon: <InventoryIcon />, path: '/admin/inventory' },
    { label: 'Reports', icon: <AssessmentIcon />, path: '/admin/reports' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully!', {
      autoClose: 1000,
    });

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? '#1976d2' : 'inherit',
              backgroundColor: isActive ? '#e3f2fd' : 'transparent',
              display: 'block',
            })}
          >
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </NavLink>
        ))}

        {/* Logout Button */}
        <ListItem
          button
          onClick={handleLogout}
          sx={{ cursor: 'pointer', color: 'error.main' }}
        >
          <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
