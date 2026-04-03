import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../services/authService';

const Logout = () => {
  const navigate = useNavigate();

  const handlerLogout = () =>{
    try {
      const res = logoutUser();
      localStorage.clear();
      console.log(res.data.message);
      navigate("/signin");
    } catch (error) {
      console.log("Error during logout:", error.response.data.message || error.message);
    }
    
  }

  return (
    <div>
      <h1>Do you want to Log out?</h1>
      <button onClick={handlerLogout} className=''>Log out</button>
    </div>
  )
}

export default Logout
