import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { server } from "../server";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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
  const [error, setError] = useState({});
  const [signupError, setSignupError] = useState("");
  // const [valid, setValid] = useState(true);

  // const validatePhoneNumber = (phoneNumber) => {
  //   const phoneNumberPattern = /^\d{10}$/;
  //   return phoneNumberPattern.test(phoneNumber);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const phone_number = values.phone;
    // setValid(validatePhoneNumber(phone_number));
    const emailpattern = /\S+@\S+\.\S+/;
    // eslint-disable-next-line
    const phone_number_pattern = /^\d{10}$/;
    const validationError = {};
    if (!values.username.trim()) {
      validationError.username = "A username is required!";
    }

    if (!values.email.trim()) {
      validationError.email = "A valid email must be provided!";
    } else if (!emailpattern.test(values.email)) {
      validationError.email = "The email pattern is invalid";
    }

    if (!values.phone.trim()) {
      validationError.phone = "A phone number is required!";
    } else if (!phone_number_pattern.test(values.phone)) {
      validationError.phone = "Please enter a 10 digit phone number";
    }

    if (!values.password.trim()) {
      validationError.password = "A password must be provided!";
    } else if (values.password.length < 8) {
      validationError.password =
        "The password should be more than 8 characters";
    }
    if (!values.confirmpassword.trim()) {
      validationError.confirmpassword =
        "A password confirmation must be provided!";
    } else if (values.password !== values.confirmpassword) {
      validationError.confirmpassword = "The passwords must match!";
    }
    setError(validationError);
    if (Object.keys(validationError).length === 0) {
      axios
        .post(`${server}/auth/register`, values)
        .then((res) => {
          if (res.data.success === true) {
            navigate("/verify");
          }
        })
        .catch((err) => {
          setSignupError(err.response.data.message);
          console.log(err.response.data.message);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border signupForm">
        <h2>Sign Up</h2>
        <div className="error-text">{signupError && signupError}</div>
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
            {error.username && <span>{error.username}</span>}
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
            {error.email && <span>{error.email}</span>}
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
            {/* <PhoneInput
              country={"ke"}
              name="phone"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              className="form-control rounded-0"
              inputProps={{
                required: true,
              }}
            /> */}
            {/* {!valid && <span>Enter a 10 digit phone number</span>} */}
            {error.phone && <span>{error.phone}</span>}
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
            {error.password && <span>{error.password}</span>}
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
            {error.confirmpassword && <span>{error.confirmpassword}</span>}
            <div class="invalid-feedback">Please confirm your password.</div>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            {" "}
            Sign Up
          </button>
          <p>You are agreeing to our terms and policies by clicking register</p>
          <p>
            Already have an account? <Link to="/">Click Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
