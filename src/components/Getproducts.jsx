import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Carousel from './Carousel';

const GetProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const img_url = "https://daisyf.alwaysdata.net/static/images/";

  

  

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://daisyf.alwaysdata.net/api/get_products"
      );

      setProducts(response.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="row">
      

      <Carousel/>
      <div class="col-md-12 p-4 text-black">
                            <h1 class="text-center text-danger fw-bold">Get to know us</h1>
                            <p class="text-center text-danger">Creating Memorable events tailored to your dreams.</p>
                            <div class="feautures-inline text-center">
                                <span class="text btn-danger">Experienced team </span> |
                                <span class="text btn-danger">Affordable Packages </span>|
                                <span class="text btn-danger">  Timely Execution</span>


                            </div>


                        </div>
                        <h1 class="text-center">Our Services</h1>
                <div class="col-lg-3">
                {/* <!-- below is a div carrying the card and its contents --> */}
                 <div class="card shadow">
                    
                     
                     {/* <!-- below is the div with the body section of the card --> */}
                      <div class="card-header">
                       <img src="images/farinaz-athari-OwEL5Z5cA48-unsplash.jpg" alt="wedding" width="100%" height="250px" />
                      </div>
                      {/* <!-- below is the div with the footer section  --> */}
                       <div class="card-footer">
                        <p class=" text-center text-info f-1 fw-bold">Weddings</p>
                        
                       

                       </div>

                 </div>
            </div>


            <div class="col-lg-3">
                {/* <!-- below is a div carrying the card and its contents --> */}
                 <div class="card shadow">
                    
                     
                     {/* <!-- below is the div with the body section of the card --> */}
                      <div class="card-header">
                       
                       <img src="images/lisa-davidson-ETHSaeYc59U-unsplash.jpg" alt="Babyshower"   width="100%" height="250px" />

                      </div>
                      {/* <!-- below is the div with the footer section  --> */}
                       <div class="card-footer">
                        <p class=" text-center text-info f-1 fw-bold">Baby shower</p>
                        
                       

                       </div>

                 </div>
            </div>

            <div class="col-lg-3">
                {/* <!-- below is a div carrying the card and its contents --> */}
                 <div class="card shadow">
                    
                     
                     {/* <!-- below is the div with the body section of the card --> */}
                      <div class="card-header">
                        <img src="images/sujan-khalifa-LO1lToLGGFA-unsplash.jpg" alt="birthday"  width="100%" height="250px" />

                      </div>
                      {/* <!-- below is the div with the footer section  --> */}
                       <div class="card-footer">
                        <p class=" text-center text-info f-1 fw-bold">Birthdays</p>
                        
                       

                       </div>

                 </div>
            </div>


            <div class="col-lg-3">
                {/* <!-- below is a div carrying the card and its contents --> */}
                 <div class="card shadow">
                    
                     
                     {/* <!-- below is the div with the body section of the card --> */}
                      <div class="card-header">
                        <img src="/images/ezebunwo-omachi-Sx2yNRb3GYU-unsplash.jpg" alt="cooperateevnts"  width="100%" height="250px" />

                      </div>
                      {/* <!-- below is the div with the footer section  --> */}
                       <div class="card-footer">
                        <p class=" text-center text-info f-1 fw-bold">Cooperate Events</p>
                        
                       

                       </div>

                 </div>
            </div>

            <br /> <br />


            <div class="container">

                    {/* <!-- title --> */}
                     <div class="text-center mb-5">
                      <h2 class="fw-bold">Why Choose us?</h2>

                     </div>
                     {/* <!-- icons row --> */}
                      <div class="row text-center">

                        <div class="col-md-3 mb-4">
                          <img src="images/verified_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png" alt="verified" />
                          <p class="mt-3 fw-bold f-1 ">Creative Design</p>

                        </div>
                        <div class="col-md-3 mb-4">
                          
                          <img src="/images/credit_card_heart_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png" alt="budget" />
                          <p class="mt-3 fw-bold f-1">Budget friendly</p>

                        </div>
                        <div class="col-md-3 mb-4">
                          <img src="/images/business_center_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png" alt="reliable" />
                          <p class="mt-3 fw-bold f-1">Reliable and Professional</p>

                        </div>
                        <div  class="col-md-3 mb-4">
                          
                          <img src="/images/favorite_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png" alt="attention" />
                          <p class="mt-3 fw-bold f-1">Attention to detail</p>

                        </div>

                      </div>
                      <div>
                        
                      </div>

                  </div>


                   <div class="container">
                      {/* <!-- title --> */}
                       <div class="text-center mb-5">
                        <h2 class=" simple-topic fw-bold">Event Gallery</h2>

                       </div>
                       <div class="row g-4">
                        <div class="col-md-3 col-sm-6">
                          <img src="images/jennifer-kalenberg-Rkj0ms67lio-unsplash.jpg" alt="jpg"   width="500px" height="300px"/>
                        </div>
                        <div class="col-md-3 col-sm-6">
                          <img src="images/jonathan-borba-B_R3rmJPeSE-unsplash.jpg" alt="jpg" width="500px" height="300px"  />

                        </div>
                        <div class="col-md-3 col-sm-6">
                          <img src="images/tabitha-turner-GYQuKGktCt4-unsplash.jpg" alt="jpg" width="500px" height="300px"  />

                        </div>
                        <div class="col-md-3 col-sm-6">
                         <img src="images/al-elmes-ULHxWq8reao-unsplash.jpg" alt="jpg" width="500px" height="300px" />
                        </div>
                        <div class="col-md-3 col-sm-6">
                          <img src="images/tamara-govedarovic-7d0-zkJ51Yk-unsplash.jpg" alt="jpg" width="500px" height="300px" />

                        </div>
                        <div class="col-md-3 col-sm-6">
                          <img src="images/maria-luisa-queiroz-k6g0JxLXRP0-unsplash.jpg" alt="jpg" width="500px" height="300px" />

                        </div>
                        <div class="col-md-3 col-sm-6">
                          <img src="images/ibrahim-boran-m8YjB0noWiY-unsplash.jpg" alt="jpg" width="500px" height="300px" />
                          
                        </div>
                        <div class="col-md-3 col-sm-6">
                          <img src="images/ridham-supriyanto-4FGhD_iGuqg-unsplash.jpg" alt="jpg" width="500px" height="300px" />

                        </div>

                       </div>
                       {/* <!-- button --> */}
                       <nav className="text-center mt-5" >
                        <Link to="/gallery" className="pink-btn"> View Full Gallery
                        </Link>

                       </nav>
                        

                    </div>

      

      

      {loading && <Loader />}
     
     
      <Footer />
     
    </section>
  );
};

export default GetProducts;