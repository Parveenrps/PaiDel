import React from 'react'

const UserDashboard = () => {
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
  return (
    <div className='flex justify-center items-center h-screen'>
        Hey {userLoggedIn.name}, let's Book a PaiDel!
        <button>Want to logout!?</button>
    </div>
  )
}

export default UserDashboard
