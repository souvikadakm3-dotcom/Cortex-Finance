// src/App.js

import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* Pages */

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Signup Page */}
        <Route
          path="/signup"
          element={<Sign />}
        />

        {/* Upload Page */}
        <Route
          path="/upload"
          element={<Upload />}
        />

        {/* Dashboard Page */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;