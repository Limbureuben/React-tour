import React from 'react';
import Home from './Home'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import '../../css/AdminDashboard.css'

function AdminDashboard() {
  <div className='grid-container'>
    <AdminHeader />
    <AdminSidebar />
    <Home />
  </div>

}

export default AdminDashboard;