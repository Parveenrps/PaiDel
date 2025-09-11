import './App.css'
import NavBar from './components/NavBar'
import { Route, RouterProvider, Routes } from 'react-router-dom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { createContext, useState } from 'react'
import WalkerDashboard from './components/walkerDashboard'
import UserDashboard from './components/UserDashboard'

export const loggedInContext = createContext();

function App() {
  const [isLoggedin, setIsloggedin]  = useState(false);
  return (
    <loggedInContext.Provider value={{isLoggedin, setIsloggedin}}>
      <NavBar></NavBar>

      <Routes>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/walker-dashboard' element={<WalkerDashboard></WalkerDashboard>} ></Route>
        <Route path='/user-dashboard' element={<UserDashboard></UserDashboard>}></Route>
      </Routes>
    
    </loggedInContext.Provider>
  )
}

export default App
