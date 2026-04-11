import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading("Please wait as registration is in progress...");

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", number);

      const response = await axios.post(
        "http://daisyf.alwaysdata.net/api/signup",
        formdata
      );

      setLoading("");
      setSuccess(response.data.message);
      setError("");

      setUsername("");
      setEmail("");
      setPassword("");
      setNumber("");

      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      setLoading("");
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <>
      {/*  CSS INSIDE SAME FILE */}
      <style>{`
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f5f5f5;
        }

        .container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form_area {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #EDDCD9;
          border: 2px solid #264143;
          border-radius: 20px;
          box-shadow: 3px 4px 0px 1px #E99F4C;
          padding: 25px;
        }

        .title {
          color: #264143;
          font-weight: 900;
          font-size: 1.5em;
        }

        .sub_title {
          font-weight: 600;
          margin: 5px 0;
        }

        .form_group {
          display: flex;
          flex-direction: column;
          margin: 10px;
        }

        .form_style {
          outline: none;
          border: 2px solid #264143;
          box-shadow: 3px 4px 0px 1px #E99F4C;
          width: 290px;
          padding: 12px 10px;
          border-radius: 4px;
          font-size: 15px;
        }

        .form_style:focus {
          transform: translateY(4px);
          box-shadow: 1px 2px 0px 0px #E99F4C;
        }

        .btn {
          padding: 15px;
          margin: 20px 0;
          width: 290px;
          font-size: 15px;
          background: #DE5499;
          border-radius: 10px;
          font-weight: 800;
          box-shadow: 3px 3px 0px 0px #E99F4C;
          border: none;
          cursor: pointer;
        }

        .btn:hover {
          opacity: 0.9;
        }

        .link {
          font-weight: 800;
          color: #264143;
          padding: 5px;
        }
      `}</style>

      {/* PAGE */}
      <div className="page">

        <div className="container">
          <div className="form_area">

            <p className="title">SIGN UP</p>
            <p className="sub_title">Create your account</p>

            {loading && <p style={{ color: "orange" }}>{loading}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>

              <div className="form_group">
                <label>Username</label>
                <input
                  className="form_style"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form_group">
                <label>Email</label>
                <input
                  className="form_style"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  required
                />
              </div>

              <div className="form_group">
                <label>Phone</label>
                <input
                  className="form_style"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn">
                SIGN UP
              </button>

            </form>

            <p className="link">
              Already have an account? <Link to="/signin">Signin</Link>
            </p>

          </div>
        </div>

        <Footer />

      </div>
    </>
  );
};

export default Signup;