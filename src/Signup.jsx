import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./employeesignup.css";

function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const sendOtp = async () => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (data.success) {
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

  const completeSignup = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/set-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Signup Completed!");
      navigate("/employee-form");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Employee Signup</h2>

        {/* Step Indicator */}
        <div className="stepper">
          <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        {/* Email */}
        <div className={`step-content ${step === 1 ? "show" : "hide"}`}>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>

        {/* OTP */}
        <div className={`step-content ${step === 2 ? "show" : "hide"}`}>
          <input
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>

        {/* Password */}
        <div className={`step-content ${step === 3 ? "show" : "hide"}`}>
          <input
            type="password"
            placeholder="Create Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={completeSignup}>Complete Signup</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;