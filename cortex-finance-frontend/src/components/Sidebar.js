import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Settings, Activity, LogOut, UploadCloud } from 'lucide-react';
import '../pages/Dashboard.css';

const Sidebar = () => {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <Activity className="logo-icon" size={28} />
        <h2>Cortex</h2>
      </div>
      
      <div className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-item" end>
          <LayoutDashboard size={20} />
          <span>Overview</span>
        </NavLink>
        
        <NavLink to="/dashboard/chat" className="nav-item">
          <MessageSquare size={20} />
          <span>AI Assistant</span>
        </NavLink>
        
        <NavLink to="/upload" className="nav-item">
          <UploadCloud size={20} />
          <span>Upload New</span>
        </NavLink>
        
        <NavLink to="/dashboard/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
      
      <div className="sidebar-footer">
        <NavLink to="/" className="nav-item logout">
          <LogOut size={20} />
          <span>Exit App</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
