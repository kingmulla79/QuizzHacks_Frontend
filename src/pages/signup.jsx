import React, { useState } from "react";
import "./signin.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { server } from "../server";
import Validation from "../Validation";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [valid, setValid] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setValid(Validation(values));
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
    axios
      .post(`${server}/auth/register`, values)
      .then((res) => {
        if (res.data.success === true) {
          navigate("/verify");
        } else {
          setError(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger">{error && error}</div>
        <h2>Sign Up</h2>
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              className="form-control rounded-0"
              autoComplete="on"
              required
            />
            {!valid && <p></p>}
            <div class="invalid-feedback">Please enter a valid username.</div>
          </div>
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
              required
            />
            <div class="invalid-feedback">Please enter a valid email</div>
          </div>
          <div className="mb-3">
            <label htmlFor="phone">
              <strong>Phone Number</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              name="phone"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              className="form-control rounded-0"
              autoComplete="off"
              required
            />
            <div class="invalid-feedback">
              Please enter a valid phone number.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="*********"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
              required
            />
            <div class="invalid-feedback">Please enter a password.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmpassword">
              <strong>Confirm password</strong>
            </label>
            <input
              type="password"
              placeholder="*********"
              name="password"
              onChange={(e) =>
                setValues({ ...values, confirmpassword: e.target.value })
              }
              className="form-control rounded-0"
              required
            />
            <div class="invalid-feedback">Please confirm your password.</div>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            {" "}
            Sign Up
          </button>
          <p>You are agreeing to our terms and policies by clicking register</p>
          <p>
            Already have an account? <Link to="/login">Click Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
