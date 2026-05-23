// src/pages/Upload.js

import React, { useState } from "react";
import "../App.css";

function Upload() {

  const [file, setFile] = useState(null);

  // Handle File Upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload Button
  const handleUpload = () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    alert("File Uploaded Successfully");
  };

  return (

    <div className="upload-container">

      {/* Upload Card */}

      <div className="upload-card">

        <h1 className="upload-title">
          Upload Bank Statement
        </h1>

        <p className="upload-text">
          Upload your PDF bank statement
          for AI-powered financial analysis.
        </p>

        {/* File Input */}

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="file-input"
        />

        {/* File Name */}

        {
          file && (
            <p className="file-name">
              Selected File: {file.name}
            </p>
          )
        }

        {/* Upload Button */}

        <button
          className="upload-button"
          onClick={handleUpload}
        >
          Upload Statement
        </button>

      </div>

    </div>
  );
}

export default Upload;