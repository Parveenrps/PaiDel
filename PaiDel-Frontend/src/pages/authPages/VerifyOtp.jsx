import { useState } from "react";
import { verifyOTP } from "../../services/authService.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    try {
      const res = await verifyOTP({
        userId,
        otp : otp.toString().trim()
      })
      
      let role = res.data.data.role;
      setUser(res.data.data);
      navigate(`/${role}`);
    } catch (err) {
      console.log("Error during OTP verification:", err.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSumbit}
      className="flex flex-col gap-4 my-8 justify-start"
    >
      <h1 className="text-xl font-bold">Verify OTP</h1>
  
      <input
        className="border rounded-md p-1"
        type="text"
        placeholder="Enter OTP"
        required
        name="otp"
        value={otp}
        onChange={handleChange}
      />

      {error && <span className="text-red-500">{error}</span>}

      <button
        type="submit"
        className="bg-black text-white p-2 rounded-md"
      >
        Verify
      </button>
    </form>
  );
};

export default VerifyOtp;