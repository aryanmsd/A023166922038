import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/${isLogin ? "login" : "signup"}`, form);
      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        alert("Signup successful. Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        )}
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", marginTop: "10px" }}>
        {isLogin ? "New user? Signup" : "Already registered? Login"}
      </p>
    </div>
  );
}
