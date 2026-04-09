import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { createContext, useContext, useState } from 'react'

export const loggedInContext = createContext();
import Signin from './pages/authPages/Signin'
import VerifyOtp from './pages/authPages/VerifyOtp'
import Signup from './pages/authPages/Signup'
import ProtectedRoute from './pages/authPages/ProtectedRoute'


import User from './pages/userPages/User'
import Walker from './pages/walkerPages/Walker'
import Aboutus from './components/Aboutus'
import Footer from './components/Footer'
import Hero from './components/Hero'
import { AuthContext } from './context/AuthContext';



function App() {
  const {loading} = useContext(AuthContext);

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <>
        <NavBar />

        <Routes>
          <Route path='/' element={
            <>
            <Hero/>
            <Aboutus id="about"/>
            <Footer/>
            </>
          }/>

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={
            <ProtectedRoute requiredVerification={false}>
              <VerifyOtp />
            </ProtectedRoute>
          } />

          <Route path="/user/*" element={
            <ProtectedRoute requiredVerification={true}>
              <User />
            </ProtectedRoute>
          }/>
          <Route path="/walker/*" element={<Walker />} />
        </Routes>

        
    </>
  )
}

export default App
