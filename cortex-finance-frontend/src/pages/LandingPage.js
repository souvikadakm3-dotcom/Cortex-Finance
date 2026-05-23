import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Zap, ArrowRight, Activity } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="flex justify-between items-center px-12 py-4 mx-12 mt-6 mb-6 rounded-full z-10 glass-panel relative">
        <div className="flex items-center gap-3 text-2xl font-bold tracking-tight">
          <Activity className="text-cyan-400" size={28} />
          <span>Cortex</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-gray-400 font-medium hover:text-white transition-colors duration-300">Log In</Link>
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <div className="badge pulse-animation">
            <Zap size={14} className="cyan" />
            <span>AI-Powered Financial Intelligence</span>
          </div>
          <h1 className="hero-title">
            Analyze your finances with <span className="text-gradient">Cortex AI</span>
          </h1>
          <p className="hero-subtitle">
            Upload your bank statements. Let our advanced AI categorize expenses, detect anomalies, and optimize your financial health instantly.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary btn-large">
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn btn-secondary btn-large">
              View Demo
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1 glass-panel ai-glow">
            <TrendingUp size={24} className="purple" />
            <div>
              <h4>Expense Analysis</h4>
              <p>Food & Dining: 35%</p>
            </div>
          </div>
          <div className="floating-card card-2 glass-panel">
            <Shield size={24} className="green" />
            <div>
              <h4>Fraud Detection</h4>
              <p>No unusual activity</p>
            </div>
          </div>
          <div className="floating-card card-3 glass-panel">
            <Zap size={24} className="cyan" />
            <div>
              <h4>AI Recommendations</h4>
              <p>Save ₹2,500/mo</p>
            </div>
          </div>
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
