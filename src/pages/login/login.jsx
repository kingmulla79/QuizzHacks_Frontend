import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../context/AuthProvider";
import "./login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { server } from "../../server";
import Footer from "../../components/footer/footer";

function Login() {
  const { setToken, setLoading } = useAuthContext();

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [loginError, setLoginError] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!email || !pwd) {
      setErrMsg("Please fill out all details");
      return;
    }
    // if error remove try catch
    try {
      const values = { email: email, password: pwd };
      await axios
        .post(`${server}/auth/login`, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success === true) {
            setToken(res.data.authorization);
            navigate("/");
            setEmail("");
            setPwd("");
          }
        })
        .catch((err) => {
          if (!err?.response) {
            setErrMsg("No Server Response");
          } else {
            setLoginError(err.response.data.message);
            console.log(err.response.data.message);
          }
          errRef.current.focus();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
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
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-0"
              autoComplete="off"
              ref={emailRef}
              value={email}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="***********"
              name="password"
              onChange={(e) => setPwd(e.target.value)}
              className="form-control rounded-0"
              value={pwd}
              required
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
      <Footer />
    </div>
  );
}

export default Login;
