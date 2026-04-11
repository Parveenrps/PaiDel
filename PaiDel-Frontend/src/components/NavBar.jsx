import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import Logout from "./Logout";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  return (
    <div className="flex justify-between items-center text-white  bg-black p-4">
      <h1 className=" text-3xl font-bold  " onClick={()=>navigate('/')}>PaiDel</h1>
        <div className='flex items-center text-xl gap-8 font-semibold'>
          <div className='flex gap-4'>
            <p onClick={()=>navigate('/')} className='cursor-pointer'>Home</p>
            <a href="/#about">About us</a>
          </div>

          {user ? (
            <div ref={menuRef} className='relative'>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className='flex items-center gap-3 rounded-full bg-white bg-opacity-10 px-3 py-2 hover:bg-opacity-20'
              >
                <span className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-black'>
                  {avatarLetter}
                </span>
              </button>

              {menuOpen && (
                <div className='absolute right-0 z-20 mt-2 w-48 rounded-xl border border-gray-700 bg-black/95 p-2 shadow-xl'>
                  <div className=' divide-y divide-gray-700'>
                    <Link
                      to={`/${user.role}`}
                      onClick={() => setMenuOpen(false)}
                      className='block px-3 py-2 text-sm text-gray-100 hover:bg-white/10'
                    >
                      Profile
                    </Link>
                    <Link
                      to={`/${user.role}/orders`}
                      onClick={() => setMenuOpen(false)}
                      className='block px-3 py-2 text-sm text-gray-100 hover:bg-white/10'
                    >
                      Orders
                    </Link>

                    <Link
                      to={`/${user.role}/settings`}
                      onClick={() => setMenuOpen(false)}
                      className='block px-3 py-2 text-sm text-gray-100 hover:bg-white/10'
                    >
                      Settings
                    </Link>
                    <div
                      className='w-full px-3 py-2 text-left text-sm text-red-300 hover:bg-white/10'
                    >
                      <Logout />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className='flex gap-4 bg-gray-400 p-1 rounded-full'>
              <Link to="/signin">
                <button className='hover:bg-black rounded-full py-1 px-2'>Sign In</button>
              </Link>
              <Link to="/signup">
                <button className='hover:bg-black rounded-full py-1 px-2'>Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
  );
};

export default NavBar;