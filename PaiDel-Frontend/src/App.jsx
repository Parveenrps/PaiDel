import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { createContext, useState } from 'react'
import UserDashboard from './components/UserDashboard'
import WalkerDashboard from './components/WalkerDashboard'

// UserPages
import Dashboard from './components/userPages/Dashboard'
import Orders from './components/userPages/Orders'
import Settings from './components/userPages/Settings'
import Logout from './components/userPages/Logout'

export const loggedInContext = createContext();

function App() {
  const [isLoggedin, setIsloggedin] = useState(false);

  return (
    <loggedInContext.Provider value={{ isLoggedin, setIsloggedin }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ User Dashboard with nested routes */}
          <Route path="/user-dashboard/*" element={<UserDashboard />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          {/* You can add WalkerDashboard similarly */}
          <Route path="/walker-dashboard/*" element={<WalkerDashboard />} />
        </Routes>
      </BrowserRouter>
    </loggedInContext.Provider>
  )
}

export default App
