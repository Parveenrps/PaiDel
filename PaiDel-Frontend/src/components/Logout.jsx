import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService';

const Logout = () => {
  const navigate = useNavigate();

  const handlerLogout = async () =>{
    try {
      const res = await logoutUser();
      localStorage.clear();
      console.log(res.data.message);
      navigate("/signin");
    } catch (error) {
      console.log("Error during logout:", error.response.data.message || error.message);
    }
    
  }

  return (
    <>
      <button onClick={handlerLogout} className='bg-amber-100'>Log out</button>
    </>
  )
}

export default Logout
