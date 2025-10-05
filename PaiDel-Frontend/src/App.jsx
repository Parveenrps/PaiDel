import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { createContext, useState } from 'react'
import User from './components/User'
import Walker from './components/Walker'
import Aboutus from './components/Aboutus'
import Footer from './components/Footer'
import Hero from './components/Hero'

export const loggedInContext = createContext();

function App() {
  const [isLoggedin, setIsloggedin] = useState(false);

  return (
    <loggedInContext.Provider value={{ isLoggedin, setIsloggedin }}>
        <NavBar />

        <Routes>
          <Route path='/' element={<>
            <Hero/>
            <Aboutus id="about"/>
            <Footer/></>}
          />

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/user/*" element={<User />}/>
          <Route path="/walker/*" element={<Walker />} />
        </Routes>

        
    </loggedInContext.Provider>
  )
}

export default App
