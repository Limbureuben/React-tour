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
import UserHome from './views/user/UserHome'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminDashboard />}>
          <Route index element={<Home />} />
          <Route path='footer' element={<Footer />} />
          <Route path='user-dashboard' element={<UserDashboard />} />
          <Route path='products' element={<Products />} />
        </Route>

        {/* User Routes */}
        <Route path='/user' element={<UserDashboard />}>
          <Route path='userhome' element={<UserHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

















// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Registration from './views/shared/registration'
// import Login from './views/shared/login'
// import Footer from './views/layout/footer'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import LandingPage from './views/landing/Landing'
// import AdminDashboard from './views/admin/AdminDashboard'
// import UserDashboard from './views/user/UserDashboard'
// import Home from './views/admin/Home'
// import Products from './views/admin/Product/Products'
// import UserHome from './views/user/UserHome'

// function App() {
  
//   return (
//     <BrowserRouter>
//         <ToastContainer position="top-right" autoClose={3000} />
//         <Route path='/' element={<LandingPage />} />
//         <Route path='/register' element={ <Registration />} />
//         <Route path='/login' element={ <Login />} />

//         {/* Admin pages */}
//         <Routes path='/admin' element={<AdminDashboard />} >
//           <Route index element={<Home /> } />
//           <Route path='/footer' element={<Footer />} />
//           {/* <Route path='/admin-dashboard' element={<AdminDashboard />} /> */}
//           <Route path='/user-dashboard' element={<UserDashboard />} />
//           <Route path="/users" element={<Home />} />
//           <Route path='/products' element={<Products />} />
//         </Routes>

//         {/* user pages */}
//         <Routes path='/user' element={<UserDashboard />} >
//         <Route path='/userhome' element={<UserHome /> } />
//         </Routes >
//     </BrowserRouter>
//   )

// }

// export default App
