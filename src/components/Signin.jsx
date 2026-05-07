import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_URL = "https://daisyf.alwaysdata.net/api";

const Signin = () => {

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error,   setError]   = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Please wait...");
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("email",    email);
      formdata.append("password", password);

      const response = await axios.post(`${BASE_URL}/signin`, formdata);

      setLoading("");

      const user = response.data.user || response.data;

      if (user && (user.id || user.username || user.email)) {
        localStorage.setItem("user", JSON.stringify(user));
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 800);
      } else {
        setError("Login failed. Invalid credentials, please try again.");
      }

    } catch (err) {
      setLoading("");
      setError(
        err.response?.data?.message ||
        "Something went wrong. Check your connection and try again."
      );
    }
  };

  return (
    <div style={styles.page}>
      <div className='row justify-content-center align-items-center' style={{ minHeight: "90vh", margin: 0 }}>

        <div className="col-md-5 col-sm-10 col-11">
          <div style={styles.card}>

            <h2 style={styles.title}>Welcome Back</h2>
            <p style={styles.subtitle}>Sign in to continue planning your perfect event</p>

            {loading && <p style={styles.msgLoading}>{loading}</p>}
            {success && <p style={styles.msgSuccess}>{success}</p>}
            {error   && <p style={styles.msgError}>{error}</p>}

            <form onSubmit={handleSubmit}>

              <div style={{ marginBottom: "1rem" }}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="form-control"
                  style={styles.input}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password..."
                  className="form-control"
                  style={styles.input}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={styles.button}
                disabled={!!loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="text-center mt-3">
                <span style={{ color: "#ffe4ec", fontSize: "13px" }}>
                  Don't have an account?{" "}
                </span>
                <Link to="/signup" style={styles.link}>Register here</Link>
              </div>

            </form>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

const styles = {
  page: {
    background: "linear-gradient(135deg, #ffc0cb, #9b9798cc)",
    minHeight: "100vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  card: {
    background: "rgba(182, 69, 131, 0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "2rem 1.8rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: "0.3rem",
  },
  subtitle: {
    textAlign: "center",
    color: "#ffe4ec",
    marginBottom: "1.5rem",
    fontSize: "13px",
  },
  label: {
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "4px",
    display: "block",
  },
  input: {
    borderRadius: "10px",
    border: "none",
    padding: "10px",
    fontSize: "14px",
    transition: "0.3s",
  },
  button: {
    background: "#ff4d94",
    color: "#fff",
    borderRadius: "25px",
    padding: "10px",
    fontWeight: "bold",
    transition: "0.3s",
    border: "none",
    marginTop: "0.5rem",
  },
  link: {
    color: "#fff",
    fontWeight: "800",
    textDecoration: "underline",
    fontSize: "13px",
  },
  msgLoading: { color: "#ffe4ec", textAlign: "center", fontSize: "13px" },
  msgSuccess: { color: "#b9f6ca", textAlign: "center", fontSize: "13px" },
  msgError:   { color: "#ff8a80", textAlign: "center", fontSize: "13px" },
};

export default Signin;