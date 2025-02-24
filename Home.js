import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import nokiaLogo from "../assets/nokia-logo.png"; // Ensure this image exists

const Home = () => {
  return (
    <div className="home-container">
      {/* Title Section - Positioned at the Top Center */}
      <div className="title-container">
        <h1 className="title">Nokia SMT ERP</h1>
      </div>

      {/* Navbar Section */}
      <div className="navbar">
        <Link to="/" className="home-button">Home</Link>
        <img src={nokiaLogo} alt="Nokia Logo" className="navbar-logo" />
      </div>

      {/* Login Button */}
      <Link to="/login">
        <button className="login-button">Login</button>
      </Link>
    </div>
  );
};

export default Home;