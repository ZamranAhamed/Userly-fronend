import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Home/Nav/Nav";
import "./register.css";

function Register() {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((previousUser) => ({ ...previousUser, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    sendRequest()
      .then(() => {
        alert("Registered Success!");
        history("/userdetails");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/register", {
        name: String(user.name),
        gmail: String(user.gmail),
        password: String(user.password),
      })
      .then((res) => res.data);
  };

  return (
    <div className="registration-container">
  <Nav />
  <h1 className="registration-title">User Registration</h1>
  <form onSubmit={handleSubmit} className="registration-form">
    <label>Name</label>
    <input
      type="text"
      value={user.name}
      onChange={handleInputChange}
      name="name"
      required
      className="input-field"
    />
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
    <button type="submit" className="submit-btn">Register</button>
  </form>
</div>

  );
}

export default Register;
