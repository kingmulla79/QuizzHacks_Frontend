import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { server } from "../server";
import Validation from "../Validation";

function Signin() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    confirmpassword: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [errors, setErrors] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    axios
      .post(`${server}/auth/login`, values)
      .then((res) => {
        if (res.data.success === true) {
          navigate("/");
        } else {
          setErrors(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger">{errors && errors}</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
