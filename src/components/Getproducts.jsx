import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import Footer from './Footer';



const GetProducts = () => {

    // Initialize hook to help you manage the state of your application
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // declare the navigate hook
    const navigate = useNavigate()

    // below we specify the image base url
    const img_url = "https://daisyf.alwaysdata.net/static/images/"

    // create a function to help you fetch the products from your API
    const fetchProducts = async() =>{
        try{
            //4. update the loading hook
            setLoading(true)

            // 5.	Interact with your endpoint for fetching the products
            const response = await axios.get("https://daisyf.alwaysdata.net/api/get_products")

            // 6. update the products hook with the response given from the API
            setProducts(response.data)

            // 7. Set the loading hook back to default
            setLoading(false)
        }
        catch(error){
            // step 8.
            // if there is an error
            // set the loading back to default
            setLoading(false)

            // update the error hook with a message
            setError(error.message)
        }
    }

    // we shall use the useEffect hook. This hook enables us to automatically re-render new features incase of any changes.
    useEffect(() => {
        fetchProducts()
    }, [])

    // console.log("The products fetched are: ",products)




  return (
    <div className='row'>
        
        <Carousel/>
         {/* ABOUT */}
      <div className="col-md-12 p-4 text-black">
        <h1 className="text-center text-danger fw-bold">Get to know us</h1>
        <p className="text-center text-danger">Creating memorable events tailored to your dreams.</p>

        <div className="text-center">
          <span className="btn btn-danger">Experienced team </span> |
          <span className="btn btn-danger"> Affordable Packages </span> |
          <span className="btn btn-danger"> Timely Execution</span>
        </div>
      </div>


        {/* WHY CHOOSE US */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold mb-4">Why Choose Us?</h2>

        <div className="row text-center">
          {[
            { img: "verified_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png", text: "Creative Design" },
            { img: "credit_card_heart_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png", text: "Budget Friendly" },
            { img: "business_center_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png", text: "Reliable & Professional" },
            { img: "favorite_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png", text: "Attention to Detail" }
          ].map((item, i) => (
            <div className="col-md-3 mb-4" key={i}>
              <img src={`images/${item.img}`} alt={item.text} />
              <p className="mt-3 fw-bold">{item.text}</p>
            </div>
          ))}
        </div>
      </div>


       

        {loading && <Loader/> }
        <h4 className="text-danger"> {error} </h4>
          <h2 className="simple-topic fw-bold">Our Services</h2>

        {/* map the products fetched from the API to the user interface */}

        {products.map((product) => (
             <div className="col-md-3 justify-content-center mb-3">
           <div className="card shadow">
             <img 
             src={img_url + product.product_photo}
             alt="product name"
             className='product_img mt-3' />

             <div className="card-body">
                <h5 className="text-primary"> {product.product_name} </h5>

                <p className="text-dark"> {product.product_description.slice(0, 100)}... </p>

                <h4 className="text-warning"> Kes {product.product_cost} </h4>

                <button className="btn btn-outline-info" onClick={() => navigate("/makepayment", {state : {product}})}>Purchase Now</button>
             </div>
           </div>
        </div>
        )   )}
        {/* GALLERY SECTION */}

      <div className="container">
  <div className="text-center mb-5">
    <h2 className="simple-topic fw-bold">Event Gallery</h2>
  </div>

  <div className="row g-4">
    <div className="col-md-3 col-sm-6">
      <img src="images/jennifer-kalenberg-Rkj0ms67lio-unsplash.jpg" alt="" width="100%" height="300px" />
    </div>

    <div className="col-md-3 col-sm-6">
      <img src="images/jonathan-borba-B_R3rmJPeSE-unsplash.jpg" alt="" width="100%" height="300px" />
    </div>

    <div className="col-md-3 col-sm-6">
      <img src="images/tabitha-turner-GYQuKGktCt4-unsplash.jpg" alt="" width="100%" height="300px" />
    </div>

    <div className="col-md-3 col-sm-6">
      <img src="images/al-elmes-ULHxWq8reao-unsplash.jpg" alt="" width="100%" height="300px" />
    </div>

  
  </div>

  <nav className="text-center mt-5">
    <Link to="/gallery" className="pink-btn">
      View Full Gallery
    </Link>
  </nav>
</div>

<Footer/>

       
    </div>
    

    
  )
}

export default GetProducts;