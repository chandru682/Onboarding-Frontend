import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function EmployeeLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/employee-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("employeeLoggedIn", "true");
        localStorage.setItem("employeeId", data.employee.id);

        alert("Login Successful!");
        navigate("/employee-dashboard");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Server not reachable");
    }
  };

  return (
    <div className="login-container">
      <h2>Employee Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
{email === "hrlogin" && (
  <p 
    style={{
      marginTop: "20px",
      fontSize: "14px",
      cursor: "pointer",
      color: "#0b1d61",
      textAlign: "center"
    }}
    onClick={() => navigate("/hr-login")}
  >
    HR Login ?
  </p>
)}
{email === "managerlogin" && (
  <p 
    style={{
      marginTop: "20px",
      fontSize: "14px",
      cursor: "pointer",
      color: "#0b1d61",
      textAlign: "center"
    }}
    onClick={() => navigate("/manager-login")}
  >
    Manager Login ?
  </p>
)}
{email === "superuserlogin" && (
  <p 
    style={{
      marginTop: "20px",
      fontSize: "14px",
      cursor: "pointer",
      color: "#0b1d61",
      textAlign: "center"
    }}
    onClick={() => navigate("/superuser-login")}
  >
    Superuser Login ?
  </p>
)}
      <p style={{ marginTop: "10px" }}>
        Don't have account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/Signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default EmployeeLogin;