import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Home/Nav/Nav";
import "./login.css";

function Login() {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    gmail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((previousUser) => ({ ...previousUser, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();
      if (response.status === "ok") {
        alert("Login Success!");
        history("/userdetails");
      } else {
        alert("Please Enter Valid Gmail & Account!!");
      }
    } catch (err) {
      alert("error" + err.message);
    }
  };

  const sendRequest = async () => {
    return await axios
      .post("http://localhost:5000/login", {
        gmail: user.gmail,
        password: user.password,
      })
      .then((res) => res.data);
  };

  return (
    <div className="login-container">
      <Nav />
      <h1 className="login-title">User Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Gmail</label>
        <input
          type="email"
          value={user.gmail}
          onChange={handleInputChange}
          name="gmail"
          required
          className="input-field"
        />
        <label>Password</label>
        <input
          type="password"
          value={user.password}
          onChange={handleInputChange}
          name="password"
          required
          className="input-field"
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
