import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
  const [form, setForm] = useState({email: "", password:""});
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setForm({
      ...form, 
      [e.target.name] : e.target.value
    });
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log("hello", form);
    alert("signin ho gya")
    navigate("/dashboard");
  }

  return (
     <div className='h-[85vh] flex justify-center items-center'>
            <div className='flex flex-col border p-4 rounded-md'>
                <p className='border-b-2 text-center text-2xl font-semibold'>Welcome Again!</p>
                <form onSubmit={handleSumbit} className='flex flex-col gap-2 mt-4 mb-4 justify-start'>

                    <input
                    className='border rounded-md p-1'
                    type='email'
                    name='email' 
                    placeholder='Enter Email'
                    value={form.email}
                    onChange={handleChange}
                    ></input>
                    <input

                    className='border rounded-md p-1'
                    type="text"
                    name='password'
                    value={form.password}
                    placeholder='Enter Password'
                    onChange={handleChange}
                    ></input>

                    <button type='sumbit' className='bg-black text-white p-1 rounded-md'>Sign In</button>

                </form>
    
                <div className='h-[1px] bg-black mt-2 mb-2'></div>
                
                <p>Don't have an account? <span onClick={()=>navigate('/signup')}
                   className='text-blue-500'>Sign up</span></p>
            </div>
        </div>
  )
}

export default Signin
