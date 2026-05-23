// src/pages/Landing.js

import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

function Landing() {
  return (

    <div className="landing-container">

      {/* Navbar */}

      <nav className="landing-navbar">

        <h1 className="landing-logo">
          AI Bank Analyzer
        </h1>

        <div>

          <Link to="/">
            <button className="nav-button">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="nav-button signup-btn">
              Sign Up
            </button>
          </Link>

        </div>

      </nav>

      {/* Hero Section */}

      <div className="hero-section">

        <h1 className="hero-title">
          AI-Based Bank Statement Analyzer
        </h1>

        <p className="hero-text">
          Upload your bank statements and get
          smart AI-powered financial insights,
          expense tracking, charts, and recommendations.
        </p>

        <Link to="/upload">
          <button className="hero-button">
            Get Started
          </button>
        </Link>

      </div>

      {/* Features Section */}

      <div className="feature-section">

        <div className="feature-card">
          <h2>📊 Smart Analytics</h2>

          <p>
            Analyze income, expenses,
            and spending trends instantly.
          </p>
        </div>

        <div className="feature-card">
          <h2>🤖 AI Insights</h2>

          <p>
            Detect overspending and receive
            personalized recommendations.
          </p>
        </div>

        <div className="feature-card">
          <h2>💬 AI Chatbot</h2>

          <p>
            Ask finance-related questions
            using the AI assistant.
          </p>
        </div>

      </div>

      {/* Workflow Section */}

      <div className="workflow-section">

        <h2 className="workflow-title">
          How It Works
        </h2>

        <div className="workflow-steps">

          <div className="step-card">
            <h3>1</h3>
            <p>Upload Statement</p>
          </div>

          <div className="step-card">
            <h3>2</h3>
            <p>AI Processing</p>
          </div>

          <div className="step-card">
            <h3>3</h3>
            <p>View Dashboard</p>
          </div>

          <div className="step-card">
            <h3>4</h3>
            <p>Get AI Insights</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Landing;