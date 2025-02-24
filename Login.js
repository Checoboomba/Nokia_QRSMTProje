import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Ensure CSS is correctly linked

const Login = () => {
  return (
    <div className="login-container">
      {/* Home Button */}
      <div className="navbar">
        <Link to="/" className="home-button">Home</Link>
      </div>

      <h2 className="login-title">Select Login Type</h2>

      <div className="login-options">
        <Link to="/operator-form">
          <button className="login-button">Operator Login</button>
        </Link>
        <Link to="/manager-dashboard">
          <button className="login-button">Line Manager Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
