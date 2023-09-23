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
        <Route path="/" element={<Homepage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="verify" element={<VerifyOTPPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
