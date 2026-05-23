// src/pages/Processing.js

import React from "react";
import "../App.css";

function Processing() {

  return (

    <div className="processing-container">

      <div className="processing-card">

        {/* Title */}

        <h1 className="processing-title">
          AI Processing Your Statement
        </h1>

        <p className="processing-text">
          Please wait while our AI analyzes
          your transactions and generates
          financial insights.
        </p>

        {/* Loader */}

        <div className="loader"></div>

        {/* Processing Steps */}

        <div className="processing-steps">

          <div className="step-item">
            ✅ Reading Bank Statement
          </div>

          <div className="step-item">
            ✅ Detecting Transactions
          </div>

          <div className="step-item">
            🔄 Categorizing Expenses
          </div>

          <div className="step-item">
            ⏳ Generating AI Insights
          </div>

        </div>

      </div>

    </div>
  );
}

export default Processing;