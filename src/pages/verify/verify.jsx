import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import { useAuthContext } from "../../context/AuthProvider";

function VerifyOTP() {
  const { setToken, removeUserRegID } = useAuthContext();
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");

  const OTPRef = useRef();
  useEffect(() => {
    OTPRef.current.focus();
  }, []);

  const OTP_REGEX = /^\d{4}$/;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${server}/auth/verifyOTP`,
        {
          userId: sessionStorage.getItem("userId"),
          otp: OTP,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          removeUserRegID(res?.data?.user?.userId);
          setToken(res?.data?.authorization);
          navigate("/");
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
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
              type="text"
              placeholder="Enter OTP code"
              name="OTP"
              ref={OTPRef}
              onChange={(e) => setOTP(e.target.value)}
              className="form-control rounded-0"
              autoComplete="off"
            />
            <br />
            <button
              type="submit"
              className="btn btn-success w-100 rounded-0"
              disabled={OTP_REGEX.test(OTP) ? false : true}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
