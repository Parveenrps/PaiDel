import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loggedInContext } from "../App";

const Signin = () => {
  const { isLoggedin, setIsloggedin } = useContext(loggedInContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Invailed user, Signup please!");
      return navigate("/signup");
    }

    if (form.email === user.email && form.password === user.password) {
      setIsloggedin(true);

      localStorage.setItem( "userLoggedIn", JSON.stringify(user));

      if (user.role === "user") {
        navigate("/user-dashboard");
      } else if (user.role === "walker") {
        navigate("/walker-dashboard");
      }
    }

    else{
      alert("User not Exist")
    }

  };

  return (
    <div className="h-[85vh] flex justify-center items-center">
      <div className="flex flex-col border p-4 rounded-md">
        <p className="border-b-2 text-center text-2xl font-semibold">
          Welcome Again!
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mt-4 mb-4 justify-start"
        >
          <input
            className="border rounded-md p-1"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
          ></input>
          <input
            className="border rounded-md p-1"
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter Password"
            onChange={handleChange}
          ></input>

          <button type="submit" className="bg-black text-white p-1 rounded-md">
            Sign In
          </button>
        </form>

        <div className="h-[1px] bg-black mt-2 mb-2"></div>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="text-blue-500">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
