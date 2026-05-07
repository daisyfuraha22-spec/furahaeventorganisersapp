import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const BASE_URL = "https://daisyf.alwaysdata.net/api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber]     = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Please wait, registration in progress...");
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email",    email);
      formdata.append("password", password);
      formdata.append("phone",    number);

      const response = await axios.post(`${BASE_URL}/signup`, formdata);

      setLoading("");
      setSuccess(response.data.message || "Account created! You can now sign in.");

      setUsername("");
      setEmail("");
      setPassword("");
      setNumber("");

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setLoading("");
      setError(
        err.response?.data?.message ||
        "Registration failed. Please check your connection and try again."
      );
    }
  };

  return (
    <>
      <style>{`
        .signup-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #ffc0cb, #9b9798cc);
        }
        .signup-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }
        .form_area {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(182, 69, 131, 0.15);
          backdrop-filter: blur(10px);
          border: 2px solid #264143;
          border-radius: 20px;
          box-shadow: 3px 4px 0px 1px #E99F4C;
          padding: 2rem 1.8rem;
          width: 100%;
          max-width: 380px;
        }
        .signup-title {
          color: #fff;
          font-weight: 900;
          font-size: 1.5em;
          margin-bottom: 0.2rem;
          text-align: center;
        }
        .signup-subtitle {
          color: #ffe4ec;
          font-size: 13px;
          text-align: center;
          margin-bottom: 1.2rem;
        }
        .form_group {
          display: flex;
          flex-direction: column;
          margin: 8px 0;
          width: 100%;
        }
        .form_group label {
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .form_style {
          outline: none;
          border: 2px solid #264143;
          box-shadow: 3px 4px 0px 1px #E99F4C;
          width: 100%;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 14px;
          background: #fff;
          transition: transform 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .form_style:focus {
          transform: translateY(3px);
          box-shadow: 1px 2px 0px 0px #E99F4C;
        }
        .signup-btn {
          padding: 12px;
          margin-top: 1rem;
          width: 100%;
          font-size: 15px;
          background: #ff4d94;
          color: #fff;
          border-radius: 25px;
          font-weight: 800;
          box-shadow: 3px 3px 0px 0px #E99F4C;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .signup-btn:hover { opacity: 0.88; }
        .signup-link {
          color: #fff;
          font-size: 13px;
          margin-top: 1rem;
          text-align: center;
        }
        .signup-link a {
          color: #fff;
          font-weight: 800;
          text-decoration: underline;
        }
        .msg-loading { color: #ffe4ec; font-size: 13px; text-align: center; }
        .msg-success { color: #b9f6ca; font-size: 13px; text-align: center; }
        .msg-error   { color: #ff8a80; font-size: 13px; text-align: center; }
      `}</style>

      <div className="signup-page">
        <div className="signup-center">
          <div className="form_area">

            <p className="signup-title">SIGN UP</p>
            <p className="signup-subtitle">Create your account to get started</p>

            {loading && <p className="msg-loading">{loading}</p>}
            {success && <p className="msg-success">{success}</p>}
            {error   && <p className="msg-error">{error}</p>}

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>

              <div className="form_group">
                <label>Username</label>
                <input
                  className="form_style"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="form_group">
                <label>Email</label>
                <input
                  type="email"
                  className="form_style"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form_group">
                <label>Password</label>
                <input
                  type="password"
                  className="form_style"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="form_group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="form_style"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <button type="submit" className="signup-btn">
                SIGN UP
              </button>

            </form>

            <p className="signup-link">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Signup;