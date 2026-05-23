import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, AlertTriangle, Repeat, Zap } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Chatbot from './Chatbot';
import './Dashboard.css';

const performanceData = [
  { name: 'Mon', balance: 11000 },
  { name: 'Tue', balance: 10500 },
  { name: 'Wed', balance: 10200 },
  { name: 'Thu', balance: 9800 },
  { name: 'Fri', balance: 9100 },
  { name: 'Sat', balance: 8500 },
  { name: 'Sun', balance: 7450 },
];

const categoryData = [
  { name: 'Food', value: 35 },
  { name: 'Rent', value: 40 },
  { name: 'Travel', value: 10 },
  { name: 'Shopping', value: 15 },
];

const COLORS = ['#00f0ff', '#b026ff', '#00ff88', '#ff5f56'];

const recentTransactions = [
  { id: 1, type: 'Expense', category: 'Food', asset: 'Swiggy', amount: '-', value: '₹450.00', status: 'Completed', date: 'Today, 10:23 AM' },
  { id: 2, type: 'Expense', category: 'Rent', asset: 'Landlord Transfer', amount: '-', value: '₹15,000.00', status: 'Completed', date: 'Yesterday, 14:45 PM' },
  { id: 3, type: 'Income', category: 'Salary', asset: 'Tech Corp Ltd', amount: '+', value: '₹85,000.00', status: 'Completed', date: 'Oct 24, 09:12 AM' },
  { id: 4, type: 'Expense', category: 'Subscriptions', asset: 'Netflix', amount: '-', value: '₹649.00', status: 'Completed', date: 'Oct 23, 11:30 AM' },
];

const DashboardOverview = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="dashboard-main"
  >
    <header className="dashboard-header">
      <div>
        <h1 className="greeting">Financial Overview</h1>
        <p className="subtitle">AI-generated summary of your recent bank statement.</p>
      </div>
      <div className="ai-status">
        <Zap size={16} className="cyan" />
        <span>AI Analysis Complete</span>
      </div>
    </header>
    
    <div className="metrics-grid">
      <div className="metric-card glass-panel ai-glow">
        <div className="metric-header">
          <span className="label">Total Income</span>
          <div className="icon-wrapper sm green"><Wallet size={18} /></div>
        </div>
        <div className="metric-value text-gradient">₹85,000.00</div>
        <div className="metric-change positive">
           <span>Primary Source: Salary</span>
        </div>
      </div>
      
      <div className="metric-card glass-panel">
        <div className="metric-header">
          <span className="label">Total Expenses</span>
          <div className="icon-wrapper sm purple"><TrendingUp size={18} /></div>
        </div>
        <div className="metric-value">₹24,532.00</div>
        <div className="metric-change negative">
          <ArrowUpRight size={16} /> <span>High spending week</span>
        </div>
      </div>

      <div className="metric-card glass-panel">
        <div className="metric-header">
          <span className="label">Financial Health</span>
          <div className="icon-wrapper sm cyan"><Zap size={18} /></div>
        </div>
        <div className="metric-value text-gradient">Good</div>
        <div className="metric-change positive">
           <span>Savings rate: 35%</span>
        </div>
      </div>
    </div>

    <div className="ai-insights-panel glass-panel">
      <h3 className="section-title flex-align">
        <Zap size={20} className="cyan" /> AI Insights & Recommendations
      </h3>
      <div className="insights-grid">
        <div className="insight-item warning">
          <AlertTriangle size={20} />
          <div>
            <h4>Overspending Detected</h4>
            <p>You spent 40% more on <strong>Food/Dining</strong> this weekend compared to last month.</p>
          </div>
        </div>
        <div className="insight-item info">
          <Repeat size={20} />
          <div>
            <h4>Recurring Payments</h4>
            <p>Identified 3 active subscriptions (Netflix, Spotify, Amazon Prime) totaling ₹1,248/mo.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="dashboard-content-grid mt-4">
      <div className="chart-section glass-panel">
        <h3 className="section-title">Expense Breakdown</h3>
        <div className="chart-container" style={{ display: 'flex', alignItems: 'center' }}>
          <ResponsiveContainer width="50%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(20, 20, 31, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend">
            {categoryData.map((entry, index) => (
              <div key={entry.name} className="legend-item">
                <span className="dot" style={{ background: COLORS[index] }}></span>
                <span>{entry.name} ({entry.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="transactions-section glass-panel">
        <h3 className="section-title">Categorized Transactions</h3>
        <div className="transactions-list">
          {recentTransactions.map(tx => (
            <div key={tx.id} className="transaction-item">
              <div className={`tx-icon ${tx.type === 'Expense' ? 'sell' : 'buy'}`}>
                {tx.type === 'Expense' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
              </div>
              <div className="tx-details">
                <div className="tx-title">{tx.asset}</div>
                <div className="tx-date">{tx.category} • {tx.date}</div>
              </div>
              <div className="tx-amount">
                <div className="tx-value">{tx.value}</div>
                <div className={`tx-status ${tx.type === 'Expense' ? 'pending' : 'completed'}`}>{tx.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
