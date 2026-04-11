import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children}) => {
  const { user, loading } = useContext(AuthContext);

  if(!user){
    return <Navigate to="/signin" />
  }

  if(user && !user.isOTPVerified){
    return <Navigate to="/verify-otp" />
  }

  return children;
};

export default ProtectedRoute;