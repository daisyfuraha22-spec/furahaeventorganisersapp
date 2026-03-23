import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

  //define the two hooks

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  //declare the hooks
  const[loading,setLoading]=useState("");
  const[success,setSuccess]=useState("");
  const[error,setError]=useState("");


  //below we have the use navigate hook to redirect us to anothe rpage on success login/signin
  const navigate = useNavigate()

  //below is the function to handle the submit
  const handleSubmit= async (e) => {
    //prevent the site form reloading
    e.preventDefault()

    //update the loading hook with a message

    setLoading("Please Wait")

    try{
      //create a formdata that will hold the email and pasword
      const formdata = new FormData ()

      //append
      formdata.append("email",email);
      formdata.append("password",password);

      //interact
      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/signin",formdata)
      //set loading
      setLoading("");

      //catch whether the user exists as part of your response from the API
      if(response.data.user){
         // Store user details in local storage
    localStorage.setItem("user", JSON.stringify(response.data.user));
        

        //if user is there, definetly the details entered durig signin are correct
        // setSuccess("login successful")
        //if it is successful let a persorn get redirected to another page
        navigate("/");


      }
      else{
        //they are incorrect
        setError("login failed.please try again...")
      }

    }
    catch(error){
      setLoading("")

      //update the error hook with messsage

    }


  }
  return (
    <div className='row justify-content-center mt-4 '>
        <div className="col-md-6 card shadow p-4 bg-danger">
          <h1 className='text-warning'>Sign In</h1>

          <h5 className="text-info">{loading}</h5>
          <h3 className="text-primary">{success}</h3>
          <h4 className="text-danger">{error}</h4>


          <form onSubmit={handleSubmit}>
            <input type="email"
            placeholder='Enter the email address here..' 
            className='form-control'
            required 
            value={email}
            onChange={(e)=> setEmail (e.target.value)}/> <br />

            {/* {email} */}

            <input type="password" 
            placeholder='Enter your password here..'
            className='form-control'
            required
            value={password}
            onChange={(e)=> setPassword (e.target.value)}/> <br />

            {/* {password} */}

            <input type="submit" 
            value='Signin'
            className='btn btn-primary'/> <br /> <br />
          Dont have an account? <Link to={'/signup'}>Register</Link>


          </form>
        </div>
      
    </div>
  )
}

export default Signin;
