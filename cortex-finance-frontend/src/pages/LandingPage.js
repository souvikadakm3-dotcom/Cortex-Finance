import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Zap, ArrowRight, Activity } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="navbar glass-panel">
        <div className="logo">
          <Activity className="logo-icon" size={28} />
          <span>Cortex Finance</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <Link to="/dashboard" className="btn btn-primary">Launch App</Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <div className="badge glass-panel">✨ The Future of DeFi is Here</div>
          <h1 className="hero-title">
            Intelligent Trading,<br />
            <span className="text-gradient">Powered by Cortex</span>
          </h1>
          <p className="hero-subtitle">
            Experience next-generation portfolio management with real-time analytics, AI-driven insights, and institutional-grade security.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Start Trading <ArrowRight size={20} />
            </Link>
            <button className="btn btn-secondary btn-lg">View Documentation</button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <div className="glass-panel mock-card">
            <div className="mock-header">
              <div className="mock-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mock-title">Portfolio Performance</div>
            </div>
            <div className="mock-body">
              <div className="mock-stat">
                <span className="label">Total Balance</span>
                <span className="value text-gradient">$124,532.00</span>
                <span className="change positive">+14.2% Today</span>
              </div>
              <div className="mock-chart">
                <svg viewBox="0 0 100 40" className="sparkline">
                  <path d="M0,40 L10,35 L20,38 L30,25 L40,30 L50,15 L60,20 L70,5 L80,10 L90,2 L100,0" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="features">
        <h2 className="section-title">Why Choose <span className="text-gradient">Cortex</span></h2>
        <div className="feature-grid">
          <div className="feature-card glass-panel">
            <div className="icon-wrapper cyan">
              <Zap size={24} />
            </div>
            <h3>Lightning Fast</h3>
            <p>Execute trades in milliseconds with our highly optimized routing engine.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="icon-wrapper purple">
              <TrendingUp size={24} />
            </div>
            <h3>AI Analytics</h3>
            <p>Get predictive insights and algorithmic trading suggestions powered by AI.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="icon-wrapper green">
              <Shield size={24} />
            </div>
            <h3>Bank-Grade Security</h3>
            <p>Your assets are protected by industry-leading encryption and cold storage.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
