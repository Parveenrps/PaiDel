import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Do you want to Log out?</h1>
      <button onClick={()=>navigate('/signin')} className=''>Log out</button>
    </div>
  )
}

export default Logout
