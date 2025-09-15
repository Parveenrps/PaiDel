import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loggedInContext } from '../App';

const Signup = () => {
  const {isLoggedin, setIsloggedin} = useContext(loggedInContext);
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({name:"", email:"", password:"", role:""})
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

  const handleSumbit = (e)=>{
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    navigate(`${role}`);
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
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    ></input>

                    <input
                    className='border rounded-md p-1'
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    ></input>

                    <input
                    className='border rounded-md p-1'
                    type="password"
                    placeholder='Password'
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                    ></input>

                    <div className='flex justify-between bg-gray-200 rounded-full p-1'>
                    <button
                    type='button'
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