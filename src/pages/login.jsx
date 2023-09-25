import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { server } from "../server";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationError = {};
    const emailpattern = /\S+@\S+\.\S+/;
    if (!values.email.trim()) {
      validationError.email = "A valid email must be provided!";
    } else if (!emailpattern.test(values.email)) {
      validationError.email = "The email pattern is invalid";
    }
    if (!values.password.trim()) {
      validationError.password = "A password must be provided!";
    }
    setErrors(validationError);
    if (Object.keys(validationError).length === 0) {
      axios
        .post(`${server}/auth/login`, values)
        .then((res) => {
          if (res.data.success === true) {
            navigate("/homepage");
          }
        })
        .catch((err) => {
          setLoginError(err.response.data.message);
          console.log(err.response.data.message);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2>Login</h2>
        <div className="error-text">{loginError && loginError}</div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
              autoComplete="off"
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            {" "}
            Log in
          </button>
          <p>
            Don't have an account? <Link to="/signup">Click Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
