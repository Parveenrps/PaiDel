import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loggedInContext } from "../App";

const NavBar = () => {
  const {isLoggedin, setIsloggedin} = useContext(loggedInContext);
  const navigate = useNavigate();

  const userLoggedIn = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex justify-between items-center text-white  bg-black p-4">
      <h1 className=" text-3xl font-bold  ">PaiDel</h1>
        <div className='flex items-center text-xl gap-8 font-semibold'>
          <div className='flex gap-4'>
            <p onClick={()=>navigate('/')}>Home</p>
            <a href="/#about" >About us</a>
          </div>
          {
           isLoggedin ? <Link className="bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-black" to="/user/orders">{userLoggedIn.name.charAt(0).toUpperCase()}</Link> : 
            <div className='flex gap-4 bg-gray-400 p-1 rounded-full '>
              <Link to="/signin">
                <button className='hover:bg-black rounded-full py-1 px-2' >Sign In</button> 
              </Link>
              <Link to="/signup" >
                <button className='hover:bg-black rounded-full py-1 px-2' >Sign Up</button> 
              </Link>
            </div>
          }          
        </div>
      </div>
  );
};

export default NavBar;