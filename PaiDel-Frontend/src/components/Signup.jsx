import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  return (
    <div className='h-[85vh] flex justify-center items-center'>
        <div className='flex w-[400px] flex-col border p-4 rounded-md'>
              <p className='text-2xl font-semibold'>Hey,<br></br>Let's move Paidel!</p>
              <div className='h-[2px] bg-black mt-1 mb-1'></div>
                <form className='flex flex-col gap-4 my-8 justify-start'>

                    <input className='border rounded-md p-1' type='text' placeholder='Name'></input>
                    <input className='border rounded-md p-1' type='email' placeholder='Email'></input>
                    <input className='border rounded-md p-1' type="password" placeholder='Password'></input>
                    <input className='border rounded-md p-1' type="text" placeholder='Phone no'></input>

                    <div className='flex justify-between bg-gray-200 rounded-full p-1'>
                    <button type='button'
                    onClick={ ()=> {setRole('user')}} 
                    className={`p-2 rounded-full 
                    ${ role === 'user' ? " bg-black text-white " : "hover:bg-black hover:text-white" }`}
                    >User</button>
                    {/* animation dalni hai */}
                    <button type='button'
                    onClick={ ()=> {setRole('walker')}} 
                    className={`p-2 rounded-full
                    ${ role === 'walker' ? " bg-black text-white " : "hover:bg-black hover:text-white" }`}>Walker</button>
                    </div>

                </form>    
                
                <button className='bg-black text-white rounded-md p-1'>Sign Up</button>

              <div className='h-[1px] bg-black mt-2 mb-2'></div>

              <p className='text-center'>Already have an account? <span onClick={()=>navigate('/signin')} className='text-blue-500'>Sigin</span></p>
        </div>
    </div>

  )
}

export default Signup