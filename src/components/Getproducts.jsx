import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Carousel from './Carousel';

const GetProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const img_url = "https://daisyf.alwaysdata.net/static/images/";

  

  //  YOUR CUSTOM PACKAGES (YOU CONTROL TEXT HERE)
  const customPackages = [
    {
      title: "BASIC PACKAGE - Elegant Essentials",
      price: "KSH 25000",
      
      description:
        "Perfect for small or intimate events, this package covers the core elements needed to bring your vision to life. It includes event styling guidance, basic décor setup, vendor coordination, and on-the-day supervision."
    },
    {
      title: "STANDARD PACKAGE - Signature Experience",
      price: "KSH 45000",
      description:
        "Designed for clients who want a beautifully styled and well-coordinated event, this package includes full décor design, theme customization, vendor management, and on-site coordination."
    },
    {
      title: "PREMIUM PACKAGE - Luxury and Full Service",
      price: "KSH 50000",
      description:
        "Our all-inclusive package offers a stress-free, luxury experience from start to finish. It includes complete event planning, premium décor, vendor sourcing, and full event coordination."
    }
  ];

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
      <h1 className="text-center">Our Packages</h1>

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

      

      

      {loading && <Loader />}
      <h4 className="text-danger text-center">{error}</h4>

      {products.slice(0, 3).map((product, index) => (
        <div className="col-lg-4" key={index}>
          <div className="card shadow">

            {/* TITLE */}
            <div className="card-header">
              <h5 className="fw-bold f-1 text-danger text-center">
                {customPackages[index].title}
              </h5>
            </div>

            {/* IMAGE */}
            <div className="card-header">
              <img
                src={img_url + product.product_photo}
                alt="package"
                width="100%"
                height="250px"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="card-footer">
              <p className="text-center text-info f-1 fw-bold">
                {customPackages[index].description}
              </p>
            </div>

            {/* BUTTON */}
            <div className="text-center mt-5">
              <button
                className="simple-text btn btn-light px-4 py-2 fw-bold"
                onClick={() =>
                  navigate("/makepayment", { state: { product } })
                }
              >
                Purchase Now - {customPackages[index].price}
              </button>
            </div>

          </div>
        </div>
      ))}

      <Footer />
     
    </section>
  );
};

export default GetProducts;