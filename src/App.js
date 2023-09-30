import React, { useState } from "react";
import "./App.css";
import SignupPage from "./pages/signup/signup.jsx";
import LoginPage from "./pages/login/login.jsx";
import Homepage from "./pages/home/Home.jsx";
import VerifyOTPPage from "./pages/verify/verify.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Papers from "./pages/Papers";
import User from "./pages/User";

function App() {
  const [loading, setLoading] = useState(true);
  const preLoader = document.getElementById("preLoader");

  if (preLoader) {
    setTimeout(() => {
      preLoader.style.display = "none";
      setLoading(false);
    }, 3000);
  }

  const { role, authToken } = useAuthContext();

  const ProtectedRoute = ({ children }) => {
    if (!authToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  const PrivateRoute = ({ children }) => {
    // const user_role = sessionStorage.getItem("role") || "";
    if (!authToken) {
      return <Navigate to="/login" replace />;
    } else if (role === "user") {
      return <Navigate to="/user" replace />;
    }
    return children;
  };

  return (
    !loading && (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route path="user" element={<User />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="verify" element={<VerifyOTPPage />} />
            <Route
              path="papers"
              element={
                <PrivateRoute>
                  <Papers />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                <div>
                  <h2>404 Page not found</h2>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  );
}

export default App;
