import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Dashboard from "./pages/Dashboard";

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

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;