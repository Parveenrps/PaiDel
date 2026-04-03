import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    const userId = localStorage.getItem('userId');

    if(!userId){
        alert("Please login to access this page");
        return <Navigate to = "/signin" />
    }

    return children;
}

export default ProtectedRoute;
