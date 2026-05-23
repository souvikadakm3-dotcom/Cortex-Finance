// src/pages/Sign.js

import React from "react";
import "../index.css";

function Sign() {
  return (
    <div className="auth-container">

      <div className="auth-card">

        {/* Title */}
        <h1 className="auth-title">
          Sign Up
        </h1>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter Name"
          className="auth-input"
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter Email"
          className="auth-input"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter Password"
          className="auth-input"
        />

        {/* Signup Button */}
        <button className="auth-button">
          Create Account
        </button>

        {/* Login Link */}
        <p className="auth-text">
          Already have an account?

          <a href="/" className="auth-link">
            Login
          </a>
        </p>

      </div>

    </div>
  );
}

export default Sign;