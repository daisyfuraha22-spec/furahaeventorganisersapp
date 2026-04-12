import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

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