import React from 'react'
import { useNavigate } from 'react-router-dom'

const WalkerDashboard = () => {
    const navigate = useNavigate();
    
    function handleLogout(){
        localStorage.removeItem("userLoggedIn");
        navigate('/signin');
        localStorage.clear();
    }

  return (
    <div>
      hello ji, I'm here for PAidel
      <button onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default WalkerDashboard
