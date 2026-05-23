// src/pages/Dashboard.js

import React from "react";
import "../index.css";

function Dashboard() {
  return (
    <div className="dashboard-container">

      {/* Navbar */}
      <div className="dashboard-navbar">
        <h1 className="dashboard-logo">
          AI Bank Analyzer
        </h1>

        <button className="logout-button">
          Logout
        </button>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome Back 👋</h2>
        <p>Your financial summary is ready.</p>
      </div>

      {/* Summary Cards */}
      <div className="card-grid">

        <div className="summary-card">
          <h3>Total Income</h3>
          <p>₹50,000</p>
        </div>

        <div className="summary-card">
          <h3>Total Expense</h3>
          <p>₹35,000</p>
        </div>

        <div className="summary-card">
          <h3>Savings</h3>
          <p>₹15,000</p>
        </div>

        <div className="summary-card">
          <h3>Financial Score</h3>
          <p>85%</p>
        </div>

      </div>

      {/* Transactions Section */}
      <div className="transaction-section">

        <h2>Recent Transactions</h2>

        <table className="transaction-table">

          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>12 May</td>
              <td>Amazon</td>
              <td>Shopping</td>
              <td>₹2,500</td>
            </tr>

            <tr>
              <td>14 May</td>
              <td>Swiggy</td>
              <td>Food</td>
              <td>₹450</td>
            </tr>

            <tr>
              <td>16 May</td>
              <td>Uber</td>
              <td>Travel</td>
              <td>₹300</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* AI Insights */}
      <div className="insight-section">

        <h2>AI Insights 🤖</h2>

        <div className="insight-card">
          You spent 20% more on food this month.
        </div>

        <div className="insight-card">
          Your highest expense category is Shopping.
        </div>

        <div className="insight-card">
          You can save ₹5,000 by reducing weekend spending.
        </div>

      </div>

    </div>
  );
}

export default Dashboard;