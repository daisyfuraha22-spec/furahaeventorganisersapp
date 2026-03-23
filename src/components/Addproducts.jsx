import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {

  //INTRODUCE THE HOOKS
  const[product_name,setProductName]= useState("");
  const[product_description,setProductDescription]=useState("");
  const[product_cost,setProductCost]=useState("");
  const[product_photo,setProductPhoto]=useState("");

  // declare the additionl hooks to manage the state of the application
  const[loading,setLoading]=useState(false);
  const[success,setSuccess]=useState("");
  const[error,setError]=useState("");

  //create a function that will handle the submit action
  const handleSubmit = async (e) => {
    // prevent the site from releoading
    e.preventDefault()

    //set loading hook with a message ( activate it)
    setLoading(true)

    try{
      //create a form data
      const formdata = new FormData()

      // 
      formdata.append("product_name",product_name);
      formdata.append("product_description",product_description);
      formdata.append("product_cost",product_cost);
      formdata.append("product_photo",product_photo);

      //interact with axios to help you use the method post

      const response = await axios.post("https://daisyf.alwaysdata.net/api/add_product",formdata)

      // set the loading hook to default
      setLoading(false)

      // update the success hook wityh a message
      setSuccess(response.data.message)

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");



    }
    catch(error){
      //set loading back to default
      setLoading(false)

      //update the set error 
      setError(error.message)

    }
  }
  return (
    <div className='row justify-content-center mt-4'>
      <div className='col-md-6 p-4 card shadow'>
        <h3>Welcome to The Pick a Package page</h3>

        {loading && <Loader/>}

        <h5 className="text-info">{loading}</h5>
          <h3 className="text-primary">{success}</h3>

        <form onSubmit={handleSubmit}>
          <input type="text" 
          placeholder='Enter the Package Name'
          className='form-control'
          required 
          value={product_name}
          onChange={(e)=> setProductName(e.target.value)}/> <br />

          {/* {product_name} */}



          <input type="text" 
          placeholder='Enter the Package Description'
          className='form-control'
          required
          value={product_description} 
          onChange={(e)=> setProductDescription(e.target.value)}/> <br />

          {/* {product_description} */}

          <input type="number" 
          placeholder='Enter the Package Cost'
          className='form-control'
          required 
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)}/> <br />

          {/* {product_cost} */}

          <label>Package Photo</label>

          
         <input type="file"
          className='form-control'
          required 
          accept='image/*'
          onChange={(e) => setProductPhoto(e.target.files[0])}/> <br />

          <input type="submit" 
          value="Add package"
          className='btn btn-outline-primary'/>


        </form>

      </div>
        
      
    </div>
  )
}

export default Addproducts;
