import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate();
  return (
     <div className='h-[85vh] flex justify-center items-center'>
            <div className='flex flex-col border p-4 rounded-md'>
                <p className='border-b-2 text-center text-2xl font-semibold'>Welcome Again!</p>
                <form className='flex flex-col gap-2 mt-4 mb-4 justify-start'>
                    <input className='border rounded-md p-1' type='email' placeholder='Enter Email'></input>
                    <input className='border rounded-md p-1' type="text" placeholder='Enter Password'></input>
                </form>
    
                <button className='bg-black text-white p-1 rounded-md'>Sign In</button>
    
                <div className='h-[1px] bg-black mt-2 mb-2'></div>
                
                <p>Don't have an account? <span onClick={()=>navigate('/signup')}
                   className='text-blue-500'>Sign up</span></p>
            </div>
        </div>
  )
}

export default Signin
