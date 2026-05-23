import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, User, ArrowRight } from 'lucide-react';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup
    navigate('/upload');
  };

  return (
    <div className="auth-container">
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      
      <motion.div 
        className="auth-card glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="auth-header">
          <Activity className="logo-icon" size={36} />
          <h2>Create Account</h2>
          <p>Join Cortex to unlock AI-powered financial intelligence</p>
        </div>
        
        <form onSubmit={handleSignup} className="auth-form">
          <div className="input-group">
            <User size={20} className="input-icon" />
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input 
              type="password" 
              placeholder="Create Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary auth-submit" 
            type="submit"
          >
            Create Account <ArrowRight size={20} />
          </motion.button>
        </form>
        
        <div className="auth-footer">
          Already have an account? <Link to="/login" className="text-gradient">Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
