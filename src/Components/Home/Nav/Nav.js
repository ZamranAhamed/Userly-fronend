import React from 'react';
import "./nav.css";
import {Link} from "react-router-dom";

function Nav() {
  return (
    <div className="navbar">
  <ul className="home-ul nav-links">
    <li className="home-li">
      <Link to="/mainhome" className="active home-a"><h1>Home</h1></Link>
    </li>
    <li className="home-li">
      <Link to="/adduser" className="active home-a"><h1>Add User</h1></Link>
    </li>
    <li className="home-li">
      <Link to="/userdetails" className="active home-a"><h1>User Details</h1></Link>
    </li>
    <li className="home-li">
      <Link to="/contactus" className="active home-a"><h1>Contact Us</h1></Link>
    </li>
    <li className="home-li">
      <Link to="/sendpdf" className="active home-a"><h1>Send Pdf</h1></Link>
    </li>
    <li className="home-li">
      <Link to="/uploadimg" className="active home-a"><h1>Photos</h1></Link>
    </li>
  </ul>

  <div className="auth-buttons">
    <Link to="/register">
      <button className="register-btn">Register</button>
    </Link>
    <Link to="/login">
      <button className="login-btn">Login</button>
    </Link>
  </div>
</div>

  );
}

export default Nav;
