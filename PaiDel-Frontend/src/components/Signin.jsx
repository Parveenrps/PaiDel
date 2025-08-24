import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center'>
        <div className='flex flex-col border p-2 rounded-md'>
            <p className='border-b-2 text-2xl font-semibold'>Welcome to PaiDel</p>
            <form className='flex flex-col gap-2 mt-4 mb-4 justify-start'>
                <input className='border rounded-md p-1' type='phone' placeholder='Enter your phone number'></input>
                <input className='border rounded-md p-1' type="text" placeholder='Enter password'></input>
            </form>

            <button className='bg-black text-white rounded-md'>Sign In</button>

            <div className='h-[1px] bg-black mt-2 mb-2'></div>
            
            <Link to="/signup">You don't have an account <span className='text-blue-700'>Signup</span></Link>
        </div>
    </div>
  )
}

export default Signin
