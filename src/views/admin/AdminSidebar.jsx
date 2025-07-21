import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
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
    {
    label: 'Logout',
    icon: <LogoutIcon />,
    onClick: () => {
      localStorage.removeItem('authToken');
      toast.success('Logged out successfully!');
      navigate('/login');                 // Redirect to login page
    },
  },
  ];

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
      </List>
    </Drawer>
  );
};

export default Sidebar;
