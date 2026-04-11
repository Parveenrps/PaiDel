import React from 'react'
import { useContext } from 'react'
import { children } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const OtpRoute = ({ children }) => {
  const {user} = useContext(AuthContext);  

  if(!user){
    return <Navigate to="/signin" />
  }

  if(user.isOTPVerified){
    return <Navigate to={`/${user.role}`} />
  }

  return children
}

export default OtpRoute
