import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './views/shared/registration'
import Login from './views/shared/login'
import Footer from './views/layout/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './views/landing/Landing'
import AdminDashboard from './views/admin/AdminDashboard'
import UserDashboard from './views/user/UserDashboard'
import Home from './views/admin/Home'
import Products from './views/admin/Product/Products'

function App() {
  
  return (
    <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes path='/admin' element={<AdminDashboard />} >
          <Route path='/register' element={ <Registration />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/' element={<LandingPage />} />
          {/* <Route path='/admin-dashboard' element={<AdminDashboard />} /> */}
          <Route path='/user-dashboard' element={<UserDashboard />} />
          <Route path="/users" element={<Home />} />
          <Route path='/products' element={<Products />} />
        </Routes>
    </BrowserRouter>
  )

}

export default App
