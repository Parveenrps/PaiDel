import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-900" >

      <div className=" text-white text-left flex flex-col justify-center px-6">
        <h1 className="text-5xl font-bold mb-4">
        Welcome to <span className="text-blue-400">PaiDel</span>
        </h1>
      <p className="text-lg max-w-2xl mb-6">
        Book appointments, manage your services, and explore the best care solutions 
        with just a few clicks.
      </p>

      <div>
        <button onClick={()=>navigate('/signin')} className="bg-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>

      </div>

      <div>
        
      </div>
      
    </div>
  );
};

export default Hero;
