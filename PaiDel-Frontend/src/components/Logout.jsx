import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);

  const handlerLogout = async () =>{
    try {
      const res = await logoutUser();
      localStorage.clear();
      console.log(res.data.message);
      setUser(null);  
      navigate("/signin");
    } catch (error) {
      console.log("Error during logout:", error.response.data.message || error.message);
    }
    
  }

  return (
    <>
      <button onClick={handlerLogout} className=''>Log out</button>
    </>
  )
}

export default Logout
