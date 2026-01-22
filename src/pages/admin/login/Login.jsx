import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "1212@gmail.com" && password === "1212") {
      setError("");
      navigate("/data1212");
    } else {
      setError("Email yoki parol noto‘g‘ri");
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <h2>Sign in</h2>
        <p>Continue to dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          {error && <span className="error">{error}</span>}

          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
