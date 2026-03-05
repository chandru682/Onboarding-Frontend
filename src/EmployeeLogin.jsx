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
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/employee-login`, {
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

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          style={{
            margin: "5px",
            padding: "10px 20px",
            backgroundColor: "#0b1d61",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/hr-login")}
        >
          HR Login
        </button>
        <button
          style={{
            margin: "5px",
            padding: "10px 20px",
            backgroundColor: "#0b1d61",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/manager-login")}
        >
          Manager Login
        </button>
        <button
          style={{
            margin: "5px",
            padding: "10px 20px",
            backgroundColor: "#0b1d61",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/superuser-login")}
        >
          Superuser Login
        </button>
      </div>

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