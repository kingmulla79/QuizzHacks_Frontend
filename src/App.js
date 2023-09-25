import "./App.css";
import SignupPage from "./pages/signup.jsx";
import LoginPage from "./pages/login.jsx";
import Homepage from "./pages/Home";
import VerifyOTPPage from "./pages/verify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
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
  );
}

export default App;
