import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loggedInContext } from "../../App";
import { loginUser } from "../../services/authService";

const Signin = () => {
  const { isLoggedin, setIsloggedin } = useContext(loggedInContext);
  const [form, setForm] = useState({ phoneNo: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value,});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    try {
      const res = await loginUser(form);
      localStorage.setItem("userId", res.data.data.userId);
      localStorage.setItem("otp", res.data.data.otp);
      console.log(res.data.data.otp)
      navigate("/verify-otp");
    } catch (error) {
      console.log("Error during login:", error.response.data.message || error.message);
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
            type="phone"
            name="phoneNo"
            placeholder="Enter Phone Number"
            value={form.phoneNo}
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
