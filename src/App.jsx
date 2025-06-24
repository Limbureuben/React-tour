import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './views/landing/Homepage'
import Registration from './views/shared/registration'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/homepage' element={<Homepage />} />
        <Route path='/' element={ <Registration />} />
      </Routes>
    </Router>
  )

}

export default App
