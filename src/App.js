import React, { useState } from "react";
import "./App.css";
import SignupPage from "./pages/signup/signup.jsx";
import LoginPage from "./pages/login/login.jsx";
import Homepage from "./pages/home/Home.jsx";
import VerifyOTPPage from "./pages/verify/verify.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loading, setLoading] = useState(true);
  const preLoader = document.getElementById("preLoader");

  if (preLoader) {
    setTimeout(() => {
      preLoader.style.display = "none";
      setLoading(false);
    }, 3000);
  }
  return (
    !loading && (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="verify" element={<VerifyOTPPage />} />
          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    )
  );
}

export default App;
