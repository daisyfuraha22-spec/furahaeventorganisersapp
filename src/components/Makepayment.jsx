import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Makepayment = () => {
    const {product} = useLocation().state || {}
    const navigate = useNavigate()

    const img_url = "http://daisyf.alwaysdata.net/static/images/"
    const [number, setNumber] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formdata = new FormData()
            formdata.append("phone", number)
            formdata.append("amount", product.product_cost)
            const response = await axios.post("https://daisyf.alwaysdata.net/api/mpesa_payment", formdata)
            setLoading(false)
            setSuccess(response.data.message)
        }
        catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

    return (
        <div className="row justify-content-center">

            <style>{`
                .pay-page {
                    min-height: 100vh;
                    background: linear-gradient(160deg, #fffdf9 0%, #fff5f8 100%);
                    padding: 2.5rem 1rem;
                }
                .pay-back-btn {
                    background: transparent;
                    border: 1px solid #c9a84c;
                    color: #8b6914;
                    padding: 0.4rem 1.1rem;
                    font-size: 0.78rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.25s;
                    border-radius: 1px;
                    margin-bottom: 2rem;
                }
                .pay-back-btn:hover {
                    background: #c9a84c;
                    color: #fff;
                }
                .pay-heading {
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: 1.9rem;
                    font-weight: 600;
                    color: #b8860b;
                    letter-spacing: 0.04em;
                    text-align: center;
                    margin-bottom: 0.3rem;
                }
                .pay-subheading {
                    text-align: center;
                    font-size: 0.8rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #d4a0b0;
                    margin-bottom: 2rem;
                }
                .pay-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 2rem;
                }
                .pay-divider span {
                    display: block;
                    height: 1px;
                    width: 60px;
                    background: linear-gradient(to right, transparent, #c9a84c);
                }
                .pay-divider span:last-child {
                    background: linear-gradient(to left, transparent, #c9a84c);
                }
                .pay-divider i {
                    width: 8px;
                    height: 8px;
                    background: #c9a84c;
                    transform: rotate(45deg);
                    display: block;
                }
                .pay-card {
                    background: #fff;
                    border: 1px solid #f0e0c8;
                    border-radius: 2px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(180,130,60,0.08);
                }
                .pay-img-wrap {
                    position: relative;
                    overflow: hidden;
                    height: 260px;
                }
                .pay-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s;
                }
                .pay-img-wrap img:hover {
                    transform: scale(1.04);
                }
                .pay-img-wrap::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(185,120,60,0.22) 0%, transparent 60%);
                }
                .pay-card-body {
                    padding: 1.5rem 1.8rem 2rem;
                    border-top: 2px solid #c9a84c;
                }
                .pay-product-name {
                    font-family: Georgia, 'Times New Roman', serif;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #8b6914;
                    margin-bottom: 0.5rem;
                }
                .pay-product-desc {
                    font-size: 0.85rem;
                    color: #9a7e8a;
                    line-height: 1.7;
                    margin-bottom: 1rem;
                }
                .pay-price {
                    display: inline-block;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #c9a84c;
                    letter-spacing: 0.06em;
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid #f0e0c8;
                    padding-bottom: 1rem;
                    width: 100%;
                }
                .pay-form-label {
                    font-size: 0.78rem;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #b8860b;
                    margin-bottom: 0.4rem;
                    display: block;
                }
                .pay-input {
                    width: 100%;
                    padding: 0.6rem 0.9rem;
                    border: 1px solid #f0e0c8;
                    border-radius: 1px;
                    font-size: 0.88rem;
                    color: #5a4a3a;
                    outline: none;
                    transition: border 0.2s;
                    background: #fffdf9;
                    margin-bottom: 1.2rem;
                }
                .pay-input:focus {
                    border-color: #c9a84c;
                }
                .pay-submit-btn {
                    width: 100%;
                    padding: 0.65rem;
                    background: transparent;
                    border: 1px solid #c9a84c;
                    color: #8b6914;
                    font-size: 0.82rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.25s;
                    border-radius: 1px;
                }
                .pay-submit-btn:hover {
                    background: #c9a84c;
                    color: #fff;
                }
                .pay-success {
                    background: #fff9ee;
                    border: 1px solid #c9a84c;
                    border-left: 3px solid #c9a84c;
                    color: #8b6914;
                    padding: 0.7rem 1rem;
                    font-size: 0.85rem;
                    margin-bottom: 1rem;
                    border-radius: 1px;
                }
                .pay-error {
                    background: #fff5f8;
                    border: 1px solid #e8a0b8;
                    border-left: 3px solid #d4a0b0;
                    color: #9a3a5a;
                    padding: 0.7rem 1rem;
                    font-size: 0.85rem;
                    margin-bottom: 1rem;
                    border-radius: 1px;
                }
            `}</style>

            <div className="pay-page col-md-12">

                {/* Heading */}
                <h2 className="pay-heading">Make Payment</h2>
                <p className="pay-subheading">Lipa na M-Pesa — Fast & Secure</p>
                <div className="pay-divider">
                    <span></span>
                    <i></i>
                    <span></span>
                </div>

                {/* Back Button */}
                <div className="text-center mb-4">
                    <button
                        className="pay-back-btn"
                        onClick={() => navigate("/")}
                    >
                        ← Back to Services
                    </button>
                </div>

                {/* Card */}
                <div className="col-md-6 mx-auto pay-card">

                    {/* Product Image */}
                    <div className="pay-img-wrap">
                        <img src={img_url + product.product_photo} alt="product" />
                    </div>

                    {/* Card Body */}
                    <div className="pay-card-body">

                        <p className="pay-product-name">{product.product_name}</p>
                        <p className="pay-product-desc">{product.product_description}</p>
                        <span className="pay-price">KES {product.product_cost}</span>

                        {/* Loader */}
                        {loading && <Loader />}

                        {/* Success Message */}
                        {success && <div className="pay-success">{success}</div>}

                        {/* Error Message */}
                        {error && <div className="pay-error">{error}</div>}

                        {/* Form — your original handleSubmit untouched */}
                        <form onSubmit={handleSubmit}>
                            <label className="pay-form-label">M-Pesa Phone Number</label>
                            <input
                                type="number"
                                className="pay-input"
                                placeholder="254XXXXXXXX"
                                required
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                            <input
                                type="submit"
                                value="Make Payment"
                                className="pay-submit-btn"
                            />
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Makepayment