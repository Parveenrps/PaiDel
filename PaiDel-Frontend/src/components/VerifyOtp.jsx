import { useState } from "react";
import { verifyOTP } from "../services/authService.js";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [form, setForm] = useState({ otp: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const otp = localStorage.getItem("otp");
    console.log("UserId: ", userId);
    console.log("OTP: ", otp);
    try {
      const res = await verifyOTP({
        userId,
        otp
      });

      console.log(res.data);
      navigate("/dashboard");
    } catch (err) {
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
        value={form.otp}
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