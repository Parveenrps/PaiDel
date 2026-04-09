import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/authService.js';

const Signup = () => {
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({name:"", email:"", password:"", phoneNo:"", role:""})
  const navigate = useNavigate();

  const handleChange= (e) =>{
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    })

  }

  const handleRole = (selectedRole)=>{
    setRole(selectedRole);
    setForm({
      ...form,
      role : selectedRole
    })
  }

  const handleSumbit = async (e)=>{
    e.preventDefault();
    console.log(form);
    try {
      const res = await registerUser(form);
      console.log(res.data);

      localStorage.setItem("userId", res.data.data.userId);
      localStorage.setItem("otp", res.data.data.otp);

      navigate("/verify-otp");
    } catch (error) {
      console.error("Error during signup:", error.response.data.message || error.message);
    }
  }

  return (
    <div className='h-[85vh] flex justify-center items-center'>
        <div className='flex w-[400px] flex-col border p-4 rounded-md'>
              <p className='text-2xl font-semibold'>Hey,<br></br>Let's move Paidel!</p>
              <div className='h-[2px] bg-black mt-1 mb-1'></div>
                <form onSubmit={handleSumbit} className='flex flex-col gap-4 my-8 justify-start'>

                    <input 
                    className='border rounded-md p-1'
                    type='text'
                    placeholder='Name'
                    required
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    ></input>

                    <input
                    className='border rounded-md p-1'
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    ></input>

                    <input 
  className='border rounded-md p-1'
  type='tel'
  placeholder='Phone Number'
  required
  name='phoneNo'
  value={form.phoneNo}
  onChange={handleChange}
  pattern='[0-9]{10}'
  maxLength={10}
/>

                    <input
                    className='border rounded-md p-1'
                    type="password"
                    required
                    placeholder='Password'
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                    ></input>

                    <div className='flex justify-between bg-gray-200 rounded-full p-1'>
                    <button
                    type='button'
                    required
                    onClick={  () => handleRole('user') } 
                    className={`p-2 rounded-full  ${ role === 'user' ? " bg-black text-white " : "hover:bg-black hover:text-white" }`}
                    >User
                    </button>

                    {/* animation dalni hai */}
                    <button
                    required
                    type='button'
                    onClick={ () => handleRole('walker') } 
                    className={`p-2 rounded-full ${ role === 'walker' ? " bg-black text-white " : "hover:bg-black hover:text-white" }`}
                    >Walker
                    </button>

                    </div>

                    <button type='sumbit' className='bg-black text-white rounded-md p-1'>Sign Up</button>

                </form>    
                


              <div className='h-[1px] bg-black mt-2 mb-2'></div>

              <p className='text-center'>Already have an account? <span onClick={()=>navigate('/signin')} className='text-blue-500'>Sigin</span></p>
        </div>
    </div>

  )
}

export default Signup