import React from 'react'
import { Navigate } from 'react-router-dom' 
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Children } from 'react'

const PublicRoutes = ({children}) => {
  const { user } = useContext(AuthContext);

  if (user) {
    if(!user.isOTPVerified){
      return <Navigate to="/verify-otp" />
    }
    return <Navigate to={`/${user.role}`} />;
  }

  return children;
}

export default PublicRoutes
