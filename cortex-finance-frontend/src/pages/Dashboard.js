import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, AlertTriangle, Repeat, Zap, Loader2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Chatbot from './Chatbot';
import api from '../api/mockService';
import './Dashboard.css';

const COLORS = ['#00f0ff', '#b026ff', '#00ff88', '#ff5f56'];

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, txRes, insRes] = await Promise.all([
          api.get('/dashboard'),
          api.get('/transactions'),
          api.get('/insights')
        ]);
        
        setDashboardData(dashRes.data);
        setTransactions(txRes.data.transactions);
        setInsights(insRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-main flex-center">
        <Loader2 className="spinner cyan" size={48} />
        <h2 className="mt-4">Analyzing Statement...</h2>
      </div>
    );
  }

  return (
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
          <div className="metric-value text-gradient">₹{dashboardData?.totalIncome.toLocaleString()}</div>
          <div className="metric-change positive">
             <span>Primary Source: Salary</span>
          </div>
        </div>
        
        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span className="label">Total Expenses</span>
            <div className="icon-wrapper sm purple"><TrendingUp size={18} /></div>
          </div>
          <div className="metric-value">₹{dashboardData?.totalExpenses.toLocaleString()}</div>
          <div className="metric-change negative">
            <ArrowUpRight size={16} /> <span>High spending week</span>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-header">
            <span className="label">Financial Health</span>
            <div className="icon-wrapper sm cyan"><Zap size={18} /></div>
          </div>
          <div className="metric-value text-gradient">{dashboardData?.healthStatus}</div>
          <div className="metric-change positive">
             <span>Savings rate: {dashboardData?.savingsRate}%</span>
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
              <p>{insights?.overspending.message}</p>
            </div>
          </div>
          <div className="insight-item info">
            <Repeat size={20} />
            <div>
              <h4>Recurring Payments</h4>
              <p>Identified {insights?.recurring.length} active subscriptions totaling ₹{insights?.totalRecurring}/mo.</p>
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
                  data={dashboardData?.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dashboardData?.categoryBreakdown.map((entry, index) => (
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
              {dashboardData?.categoryBreakdown.map((entry, index) => (
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
            {transactions.map(tx => (
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
};

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
