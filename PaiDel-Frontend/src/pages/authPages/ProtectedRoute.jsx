import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, requiredVerification = false }) => {
  const { user, loading } = useContext(AuthContext);

  if(loading){
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (!requiredVerification && !user.isOTPVerified) {
    return <Navigate to="/verify-otp" />
  }

  if(requiredVerification && user.isOTPVerified){
    return <Navigate to={`/${user.role}`} />
  }

  return children;
};

export default ProtectedRoute;