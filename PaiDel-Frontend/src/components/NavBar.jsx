import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex justify-between items-center text-white  bg-black p-4'>
        <h1 className=' text-3xl font-bold  '>PaiDel</h1>

        <div className='flex items-center text-xl gap-8 font-semibold'>
          <div className='flex gap-4'>
            <p>Home</p>
            <p>About us</p>
          </div>

          <div className='flex gap-4 bg-gray-400 p-1 rounded-full '>
            <Link to="/signin">
              <button className='hover:bg-black rounded-full py-1 px-2' >Sign In</button> 
            </Link>

            <Link to="/signup" >
              <button className='hover:bg-black rounded-full pygi-1 px-2' >Sign Up</button> 
            </Link>
          </div>
          
        </div>
    </div>
  )
}

export default NavBar
