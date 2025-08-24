import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center text-white  bg-black p-4">
      <h1 className=" text-3xl font-bold  ">PaiDel</h1>

      <div className="flex text-xl gap-8 font-semibold">
        <div className="flex gap-4">
          <p>Bhai teri gand faadd dunga        </p>
          <p>About us</p>
        </div>

        <div className="flex gap-4 bg-gray-400 p-2 rounded-md">
          <Link to="/signin">
            <button>Sign In</button>
          </Link>

          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
