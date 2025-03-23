import React from 'react'
import Nav from './Nav/Nav'
import { Link } from 'react-router-dom'
import "./home.css"

function Home() {
  return (
    <div className="home-container">
  <Nav />
  <div className="intro-section">
    <h1>Welcome to Userly!</h1>
    <p>
      Userly is a powerful and intuitive user management system designed to simplify 
      user registration, authentication, and data management. Whether you're managing 
      a small team or a large organization, Userly provides a seamless experience to 
      handle users efficiently.
    </p>
    <p>
      Get started today and streamline your user management like never before!
    </p>
    <Link to="/register">
      <button className="get-started-btn">Get Started</button>
    </Link>
  </div>
</div>

  )
}

export default Home
