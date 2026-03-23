import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  //intialize the hooks
  const[username,setUsername]= useState("");
  const[email,setEmail]= useState("");
  const[password,setPassword]=useState("");
  const[number,setNumber]=useState("");
  //define the three states an pplication will have to
  const[loading,setLoading] = useState("");
  const[success,setSuccess] = useState("");
  const[error,setError] = useState("");

  //below is a function that will handle the submit action
  const handleSubmit = async (e) => {
    e.preventDefault()
    //update our loading hook with a message that will be displayed to the users who are trying to register
    setLoading("Please wait as registartion is in progress...")

    try{
      //create a form data object that will enable you to capture the four details entered on the form
      const formdata = new FormData();

      //insert the four details interns of key -value pair
      formdata.append("username",username);
      formdata.append("email",email);
      formdata.append("password",password);
      formdata.append("phone",number);

      //by use of axios
      const response=await axios.post("http://daisyf.alwaysdata.net/api/signup",formdata)
      //set backthe loading to default
      setLoading("");
      //just incase everything goes welll update the success hook ith a message
      setSuccess(response.data.message)
      //close your hooks
      setUsername("");
      setEmail("");
      setPassword("");
      setNumber("");

       setTimeout(() => {
    setSuccess("");
  }, 5000);
  console.log("The content inside of the response are")



    }
    catch(error){
      //set the loading back to default
      setLoading("");

      //update the error hook with messsage given back
      setError(error.message)

    }


  }




  return (
    <div className='row justify-content-center mt-4'>
      <div className='card col-md-6 shadow p-4'>
        <h1 className='text-primary'>Sign Up</h1>

        <h5 className="text-warning">{loading}</h5>
        <h3 className='text-success'>{success}</h3>
        <h4 className='text-danger'>{error}</h4>

        <form onSubmit={handleSubmit} >
          <input type="text" 
          placeholder='Enter the username'
          className='form-control'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required/> <br />
          {/* {username} */}

          <input type="email" 
          placeholder='Enter the  Email Address'
          className='form-control'
          value ={email}
          onChange={(e) => setEmail(e.target.value)}
          required/> <br />

          {/* {email} */}
          

          <input type="password" 
          placeholder='Enter the password'
          className='form-control'
          value ={password}
          onChange={(e) => setPassword(e.target.value)}
          required/> <br />

          {/* {password} */}

          <input type="number" 
          placeholder='Enter the phone number'
          className='form-control'
          value ={number}
          onChange={(e) => setNumber(e.target.value)}
          required/>  <br /> <br /> <br />

          {/* {number} */}

          <input type="submit" value="Signup" className='btn btn-primary'/>
          <br /> <br />
          Already have an account? <Link to={'/signin'}>Signin</Link>
        
        </form>

      </div>
      
    </div>
  )
}

export default Signup;


