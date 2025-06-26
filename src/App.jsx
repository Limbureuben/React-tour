import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './views/landing/Homepage'
import Registration from './views/shared/registration'
import Login from './views/shared/login'
import Footer from './views/layout/footer'
import BusinessPlatformLanding from './views/landing/Homepage'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/homepage' element={ <BusinessPlatformLanding />} />
        <Route path='/register' element={ <Registration />} />
        <Route path='/' element={ <Login />} />
        <Route path='/footer' element={<Footer />} />
      </Routes>
    </Router>
  )

}

export default App
