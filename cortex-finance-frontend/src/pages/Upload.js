import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import api from '../api/mockService';
import './Upload.css';

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError('Please upload a valid PDF or CSV bank statement.');
      return;
    }
    setError('');
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsUploading(true);
    try {
      // API Integration: POST /upload
      const formData = new FormData();
      formData.append('file', file);
      await api.post('/upload', formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="glow-orb orb-1"></div>
      
      <motion.div 
        className="upload-card glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="upload-header">
          <h2>Upload Bank Statement</h2>
          <p>Let Cortex AI analyze your transactions, categorize expenses, and generate financial insights.</p>
        </div>

        <div 
          {...getRootProps()} 
          className={`dropzone ${isDragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
        >
          <input {...getInputProps()} />
          
          {file ? (
            <div className="file-preview">
              <FileText size={48} className="file-icon" />
              <div className="file-info">
                <h4>{file.name}</h4>
                <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <CheckCircle className="check-icon" size={24} />
            </div>
          ) : (
            <div className="dropzone-content">
              <div className="upload-icon-wrapper">
                <UploadCloud size={40} />
              </div>
              <h3>Drag & drop your statement here</h3>
              <p>Supports PDF or CSV formats</p>
              <button className="btn btn-secondary mt-4">Browse Files</button>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="upload-actions">
          <motion.button 
            className="btn btn-primary w-100"
            disabled={!file || isUploading}
            onClick={handleAnalyze}
            whileHover={file && !isUploading ? { scale: 1.02 } : {}}
            whileTap={file && !isUploading ? { scale: 0.98 } : {}}
          >
            {isUploading ? (
              <>
                <Loader2 className="spinner" size={20} />
                Analyzing with AI...
              </>
            ) : (
              'Analyze Statement'
            )}
          </motion.button>
        </div>
        
        <div className="security-note">
          <CheckCircle size={14} />
          <span>Your data is encrypted and securely processed.</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Upload;
