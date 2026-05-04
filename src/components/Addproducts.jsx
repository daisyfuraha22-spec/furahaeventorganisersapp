import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Loader from "./Loader";

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      const response = await axios.post(
        "https://daisyf.alwaysdata.net/api/add_product.php",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);
      setError("");

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

      setTimeout(() => setSuccess(""), 4000);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <>
      {/* STYLE SECTION */}
      <style>{`
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, #fff0f5, #ffffff);
        }

        .container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card_box {
          width: 100%;
          max-width: 500px;
          background: #ffffff;
          border-radius: 20px;
          padding: 30px;
          border: 2px solid #d4af37;
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
        }

        .title {
          text-align: center;
          font-size: 24px;
          font-weight: 900;
          color: #d4af37;
          margin-bottom: 5px;
        }

        .subtitle {
          text-align: center;
          color: #ff69b4;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .form_group {
          margin-bottom: 15px;
        }

        .label {
          font-weight: 700;
          color: #b8860b;
          margin-bottom: 5px;
          display: block;
        }

        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 2px solid #ffd1dc;
          outline: none;
          font-size: 15px;
          transition: 0.3s;
        }

        .input:focus {
          border-color: #d4af37;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
        }

        .btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg, #ff69b4, #d4af37);
          border: none;
          border-radius: 12px;
          font-weight: 800;
          color: white;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 10px;
        }

        .btn:hover {
          transform: scale(1.03);
          opacity: 0.95;
        }

        .message_success {
          color: green;
          text-align: center;
          font-weight: 600;
        }

        .message_error {
          color: red;
          text-align: center;
          font-weight: 600;
        }

        .message_loading {
          color: #d4af37;
          text-align: center;
          font-weight: 600;
        }
      `}</style>

      {/*  PAGE */}
      <div className="page">
        <div className="container">
          <div className="card_box">

            <h2 className="title">Add Package</h2>
            

            {loading && <Loader />}
            {loading && <p className="message_loading">Uploading product...</p>}
            {success && <p className="message_success">{success}</p>}
            {error && <p className="message_error">{error}</p>}

            <form onSubmit={handleSubmit}>

              <div className="form_group">
                <label className="label">Package Name</label>
                <input
                  className="input"
                  type="text"
                  value={product_name}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>

              <div className="form_group">
                <label className="label">Package Description</label>
                <input
                  className="input"
                  type="text"
                  value={product_description}
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form_group">
                <label className="label">Package Cost</label>
                <input
                  className="input"
                  type="number"
                  value={product_cost}
                  onChange={(e) => setProductCost(e.target.value)}
                  required
                />
              </div>

              <div className="form_group">
                <label className="label">Package Photo</label>
                <input
                  className="input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProductPhoto(e.target.files[0])}
                  required
                />
              </div>

              <button className="btn" type="submit">
                ADD PACKAGE 
              </button>

            </form>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Addproducts;