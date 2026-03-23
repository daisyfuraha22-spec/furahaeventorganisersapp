import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Makepayment = () => {
    // destructure the details past from the get products component
    // the use location hook allows us to get the properties past the previous component
    const {product} = useLocation().state || {}
    // declare the navigate look
  const navigate = useNavigate()

    // console.log("the details passed from get product are:",product)
     // below we specify image based url
   const img_url = "http://kbenkamotho.alwaysdata.net/static/images/"
   //intialize hooks to manage the state of the application
     const[number,setNumber]= useState("")
     const[loading,setLoading]=useState(false);
     const[success,setSuccess]=useState("");
     const[error,setError]=useState("");
   

   
   
   //create a function that will handle the submit action
   const handleSubmit = async (e) => {
    //prvent the site from reloading
    e.preventDefault()
    //update the loading hook
    setLoading(true)


     try{
        //create a form data object
        const formdata = new FormData()

        //append the data to the form data
        formdata.append("phone",number)
        formdata.append("amount",product.product_cost)

        const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment",formdata)
        //set loading back to default
        setLoading(false)

        //update the success hook with the message
        setSuccess(response.data.message)

     }
     catch(error){
        //if there is an error
        setLoading(false)

        //update the error hook with the error message
        setError(error.message)

     }
   }



  return (
    <div className='row justify-content-center'>
        {/* <button className='btn btn-outline-primary'>Back to Products</button> */}
        <h1 className="text-success">Make Payment-Lipa na Mpesa</h1>

        <div className="col-md-1">
            <input type="button"
            className='btn btn-primary'
            value="<- back to products"
            onClick={() => navigate("/") }/>
        </div>
        <div className=" col-md-6 card shadow p-4">
            <img src={img_url + product.product_photo} alt="product"  className='product_img'/>

            <div className="card-body">
                <h2 className="text-info"> {product.product_name}</h2>

                <p className="text-dark"> {product.product_description}</p>

                <b className="text-warning">KES {product.product_cost}</b> <br />

                <form  onSubmit={handleSubmit}>

                    {loading && <Loader/>}

          <h5 className="text-info">{loading}</h5>
          <h3 className="text-primary">{success}</h3>
                    <input type="number" 
                    className='"form-control'
                    placeholder='Enter the Phone Number 254XXXXXXXX'
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}/> <br /> <br />
                    {/* {number} */}

                    <input type="submit" 
                    value="Make Payment"
                    className='btn btn-success'/>
                    
                </form>

            </div>


        </div>
      
    </div>
  )
}

export default Makepayment

