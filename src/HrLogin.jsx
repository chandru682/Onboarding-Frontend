import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function HrLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Default credentials
    const defaultUsername = "hradmin";
    const defaultPassword = "chn@123";

    if (username === defaultUsername && password === defaultPassword) {
      localStorage.setItem("hrLoggedIn", "true");
      navigate("/hr");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">
      <h2>HR Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
    </div>
  );
}

export default HrLogin;