import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './views/shared/registration'
import Login from './views/shared/login'
import Footer from './views/layout/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './views/landing/Landing'
import AdminDashboard from './views/admin/AdminDashboard'

function App() {
  
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/register' element={ <Registration />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      </Routes>
    </Router>
  )

}

export default App
