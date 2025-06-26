import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './views/shared/registration'
import Login from './views/shared/login'
import Footer from './views/layout/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/register' element={ <Registration />} />
        <Route path='/' element={ <Login />} />
        <Route path='/footer' element={<Footer />} />
      </Routes>
    </Router>
  )

}

export default App
