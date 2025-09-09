import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { createContext, useState } from 'react'

function App() {

  return (
    <>
      <NavBar></NavBar>

      <Routes>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes>
    
    </>
  )
}

export default App
