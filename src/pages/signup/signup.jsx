import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { server } from "../../server";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/footer";
import "./signup.css";

function Signin() {
  const USER_REGEX = /^[A-z][A-z0-9-_]{4,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  // eslint-disable-next-line
  const PHONE_REGEX = /^\d{10}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [signupError, setSignupError] = useState("");
  // const [valid, setValid] = useState(true);

  // const validatePhoneNumber = (phoneNumber) => {
  //   const phoneNumberPattern = /^\d{10}$/;
  //   return phoneNumberPattern.test(phoneNumber);
  // };
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    console.log();
    setValidName(USER_REGEX.test(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === confirmPwd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pwd, confirmPwd]);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, email, phone, confirmPwd]);

  const handleSubmit = async (event) => {
    const userNameValidation = USER_REGEX.test(user);
    const emailValidation = EMAIL_REGEX.test(email);
    const phoneValidation = PHONE_REGEX.test(phone);
    const pwdValidation = PWD_REGEX.test(pwd);

    if (
      !userNameValidation ||
      !emailValidation ||
      !phoneValidation ||
      !pwdValidation
    ) {
      return setErrMsg("Invalid Input");
    }

    const values = {
      username: user,
      email: email,
      phone: phone,
      password: pwd,
      confirmpassword: confirmPwd,
    };
    event.preventDefault();
    await axios
      .post(`${server}/auth/register`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success === true) {
          navigate("/verify");
        }
        setUser("");
        setEmail("");
        setPhone("");
        setPwd("");
        setConfirmPwd("");
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else {
          setSignupError(err.response.data.message);
          console.log(err.response.data.message);
          errRef.current.focus();
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 signupPage">
      <div className="p-3 rounded w-25 border signupForm">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h2>Sign Up</h2>
        <div className="error-text">{signupError && signupError}</div>
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Username:</strong>
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              ref={userRef}
              name="username"
              id="username"
              onChange={(e) => setUser(e.target.value)}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              className="form-control rounded-0"
              autoComplete="off"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              required
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              5 to 20 characters.
              <br />
              Username must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              className="form-control rounded-0"
              autoComplete="off"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              required
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              The email must contain @
              <br />
              Eg. sample@yahoo.com
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="phone">
              <strong>Phone Number</strong>
              <FontAwesomeIcon
                icon={faCheck}
                className={validPhone ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPhone || !phone ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={validPhone ? "false" : "true"}
              aria-describedby="phonenote"
              className="form-control rounded-0"
              autoComplete="off"
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
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
            {/* {error.phone && <span>{error.phone}</span>}
            <div class="invalid-feedback">
              Please enter a valid phone number.
            </div> */}
            <p
              id="phonenote"
              className={
                phoneFocus && phone && !validPhone
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must contain numbers only.
              <br />
              The numbers must be exactly 10 characters.
              <br />
              Do not include the cuntry code.
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              placeholder="*********"
              name="password"
              onChange={(e) => setPwd(e.target.value)}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              className="form-control rounded-0"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              required
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmpassword">
              <strong>Confirm password</strong>
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && confirmPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !confirmPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              placeholder="*********"
              name="password"
              onChange={(e) => setConfirmPwd(e.target.value)}
              className="form-control rounded-0"
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setConfirmPwdFocus(true)}
              onBlur={() => setConfirmPwdFocus(false)}
              required
            />
            <p
              id="confirmnote"
              className={
                confirmPwdFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the password field values.
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0"
            disabled={
              !validName ||
              !validEmail ||
              !validPhone ||
              !validPwd ||
              !validMatch
                ? true
                : false
            }
          >
            Sign Up
          </button>
          <p>You are agreeing to our terms and policies by clicking register</p>
          <p>
            Already have an account? <Link to="/">Click Here</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Signin;
