import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signin = () => {

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const[loading,setLoading]=useState("");
  const[success,setSuccess]=useState("");
  const[error,setError]=useState("");

  const navigate = useNavigate()

  const handleSubmit= async (e) => {
    e.preventDefault()
    setLoading("Please Wait... ")

    try{
      const formdata = new FormData ()
      formdata.append("email",email);
      formdata.append("password",password);

      const response = await axios.post("https://daisyf.alwaysdata.net/api/signin",formdata)

      setLoading("");

      if(response.data.user){
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      }
      else{
        setError("Login failed. Please try again ")
      }

    }
    catch(error){
      setLoading("")
      setError("Something went wrong. Try again later ")
    }
  }

  return (
    <div style={styles.page}>
      <div className='row justify-content-center align-items-center vh-100'>

        <div className="col-md-5">
          <div style={styles.card}>

            <h2 style={styles.title}> Welcome Back</h2>

            <p style={styles.subtitle}>Sign in to continue planning your perfect event</p>

            <h6 className="text-light">{loading}</h6>
            <h6 className="text-success">{success}</h6>
            <h6 className="text-warning">{error}</h6>

            <form onSubmit={handleSubmit}>

              <input 
                type="email"
                placeholder='Enter your email...'
                className='form-control mb-3'
                style={styles.input}
                required 
                value={email}
                onChange={(e)=> setEmail (e.target.value)}
              />

              <input 
                type="password" 
                placeholder='Enter your password...'
                className='form-control mb-3'
                style={styles.input}
                required
                value={password}
                onChange={(e)=> setPassword (e.target.value)}
              />

              <button 
                type="submit"
                className="btn w-100"
                style={styles.button}
              >
                 Sign In
              </button>

              <div className="text-center mt-3">
                <span style={{color:"#fff"}}>Don't have an account?</span><br/>
                <Link to={'/signup'} style={styles.link}>Register </Link>
              </div>

            </form>
          </div>
        </div>

      </div>

      <Footer/>
    </div>
  )
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #ffc0cb, #9b9798cc)",
    minHeight: "100vh",
    overflow: "hidden"
  },

  card: {
    background: "rgba(182, 69, 131, 0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    animation: "fadeIn 1s ease-in-out"
  },

  title: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold"
  },

  subtitle: {
    textAlign: "center",
    color: "#ffe4ec",
    marginBottom: "20px",
    fontSize: "14px"
  },

  input: {
    borderRadius: "10px",
    border: "none",
    padding: "10px",
    transition: "0.3s"
  },

  button: {
    background: "#ff4d94",
    color: "#fff",
    borderRadius: "25px",
    padding: "10px",
    fontWeight: "bold",
    transition: "0.3s",
    border: "none"
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold"
  }
}

export default Signin;