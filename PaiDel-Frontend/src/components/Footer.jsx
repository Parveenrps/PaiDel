import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8 px-10 flex justify-between ">
      <div>
        <h1 className="text-2xl font-bold">PaiDel</h1>
        <p className="text-sm text-gray-400">Paidal Delivery</p>
      </div>

      <div className="flex flex-col  text-right space-y-2">
        <div className="flex justify-between space-y-2">
          <div className="flex items-start flex-col">
            <Link to="/signin" className="hover:text-blue-400">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-blue-400">
              Sign Up
            </Link>
          </div>

          <div className="flex items-start flex-col">
            <Link to="#about" className="hover:text-blue-400">
              About Us
            </Link>
            <Link to="#contact" className="hover:text-blue-400">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 w-full my-2"></div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} PaiDel. All rights reserved. |
          <a href="#terms" className="ml-1 hover:text-blue-400">
            Terms of Use
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
