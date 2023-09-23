import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

function VerifyOTP() {
  const [values, setValues] = useState({
    otp: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${server}/auth/login`, values)
      .then((res) => {
        if (res.data.success === true) {
          navigate("/");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger">{error && error}</div>
        <h2>Almost There</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h4>Enter the OTP code sent to your email for verification</h4>
            <input
              type="number"
              placeholder="Enter OTP code"
              name="phone"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              className="form-control rounded-0"
              autoComplete="off"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
