import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import Footer from './Footer';

const GetProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate()

    const img_url = "https://daisyf.alwaysdata.net/static/images/"

    const fetchProducts = async() =>{
        try{
            setLoading(true)
            const response = await axios.get("https://daisyf.alwaysdata.net/api/get_products")
            setProducts(response.data)
            setLoading(false)
        }
        catch(error){
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='row'>

        <style>{`
          /* ── ABOUT ── */
          .about-section {
            padding: 4rem 1rem;
            background: linear-gradient(160deg, #fffdf9 0%, #fff5f8 100%);
            width: 100%;
            text-align: center;
          }
          .about-heading {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 2.2rem;
            font-weight: 600;
            color: #b8860b;
            letter-spacing: 0.04em;
            margin-bottom: 0.4rem;
          }
          .about-tagline {
            font-size: 0.85rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #d4a0b0;
            margin-bottom: 2rem;
          }
          .about-divider {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 2rem;
          }
          .about-divider span {
            display: block;
            height: 1px;
            width: 60px;
            background: linear-gradient(to right, transparent, #c9a84c);
          }
          .about-divider span:last-child {
            background: linear-gradient(to left, transparent, #c9a84c);
          }
          .about-divider i {
            width: 8px;
            height: 8px;
            background: #c9a84c;
            transform: rotate(45deg);
            display: block;
          }
          .about-desc {
            max-width: 600px;
            margin: 0 auto 2.5rem;
            font-size: 0.95rem;
            color: #9a7e8a;
            line-height: 1.8;
          }
          .about-badges {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .about-badge {
            padding: 0.5rem 1.4rem;
            border: 1px solid #c9a84c;
            background: transparent;
            color: #8b6914;
            font-size: 0.78rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            border-radius: 1px;
            transition: all 0.25s;
            cursor: default;
          }
          .about-badge:hover {
            background: #c9a84c;
            color: #fff;
          }

          /* ── WHY CHOOSE US ── */
          .why-section {
            padding: 4rem 1rem;
            background: #fff;
            width: 100%;
          }
          .why-heading {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 2rem;
            font-weight: 600;
            color: #b8860b;
            letter-spacing: 0.04em;
            text-align: center;
            margin-bottom: 0.4rem;
          }
          .why-sub {
            text-align: center;
            font-size: 0.85rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #d4a0b0;
            margin-bottom: 2.5rem;
          }
          .why-divider {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 2.5rem;
          }
          .why-divider span {
            display: block;
            height: 1px;
            width: 60px;
            background: linear-gradient(to right, transparent, #c9a84c);
          }
          .why-divider span:last-child {
            background: linear-gradient(to left, transparent, #c9a84c);
          }
          .why-divider i {
            width: 8px;
            height: 8px;
            background: #c9a84c;
            transform: rotate(45deg);
            display: block;
          }
          .why-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1.5rem;
            max-width: 900px;
            margin: 0 auto;
          }
          .why-card {
            background: linear-gradient(160deg, #fffdf9 0%, #fff5f8 100%);
            border: 1px solid #f0e0c8;
            border-top: 2px solid #c9a84c;
            border-radius: 2px;
            padding: 2rem 1.2rem;
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .why-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 28px rgba(180,130,60,0.11);
          }
          .why-icon {
            width: 48px;
            height: 48px;
            margin: 0 auto 1rem;
          }
          .why-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .why-label {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 0.95rem;
            font-weight: 600;
            color: #8b6914;
            letter-spacing: 0.03em;
          }

          /* ── OUR SERVICES ── */
          .srv-section {
            font-family: inherit;
            padding: 3rem 1rem;
            background: linear-gradient(160deg, #fffdf9 0%, #fff5f8 100%);
            width: 100%;
          }
          .srv-heading {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 2.2rem;
            font-weight: 600;
            text-align: center;
            color: #b8860b;
            letter-spacing: 0.04em;
            margin-bottom: 0.3rem;
          }
          .srv-sub {
            text-align: center;
            font-size: 0.85rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #d4a0b0;
            margin-bottom: 2.5rem;
            font-weight: 400;
          }
          .srv-divider {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 2.8rem;
          }
          .srv-divider span {
            display: block;
            height: 1px;
            width: 60px;
            background: linear-gradient(to right, transparent, #c9a84c);
          }
          .srv-divider span:last-child {
            background: linear-gradient(to left, transparent, #c9a84c);
          }
          .srv-divider i {
            width: 8px;
            height: 8px;
            background: #c9a84c;
            transform: rotate(45deg);
            display: block;
          }
          .srv-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 1.5rem;
            max-width: 1100px;
            margin: 0 auto;
          }
          .srv-card {
            background: #fff;
            border: 1px solid #f0e0c8;
            border-radius: 2px;
            overflow: hidden;
            transition: transform 0.3s, box-shadow 0.3s;
            display: flex;
            flex-direction: column;
          }
          .srv-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 32px rgba(180,130,60,0.13);
          }
          .srv-img-wrap {
            position: relative;
            overflow: hidden;
            height: 200px;
          }
          .srv-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
          }
          .srv-card:hover .srv-img-wrap img {
            transform: scale(1.06);
          }
          .srv-img-wrap::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(185,120,60,0.18) 0%, transparent 60%);
          }
          .srv-body {
            padding: 1.1rem 1.2rem 1.4rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            border-top: 2px solid #c9a84c;
          }
          .srv-name {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 1.15rem;
            font-weight: 600;
            color: #8b6914;
            margin: 0 0 0.4rem;
          }
          .srv-desc {
            font-size: 0.82rem;
            color: #9a7e8a;
            line-height: 1.65;
            flex: 1;
            margin-bottom: 0.9rem;
          }
          .srv-price {
            font-size: 0.82rem;
            letter-spacing: 0.08em;
            color: #c9a84c;
            font-weight: 500;
            margin-bottom: 1rem;
          }
          .srv-actions {
            display: flex;
            gap: 8px;
            align-items: center;
          }
          .srv-btn {
            flex: 1;
            padding: 0.45rem 1rem;
            border: 1px solid #c9a84c;
            background: transparent;
            color: #8b6914;
            font-size: 0.78rem;
            letter-spacing: 0.12em;
            cursor: pointer;
            transition: all 0.25s;
            border-radius: 1px;
            text-transform: uppercase;
          }
          .srv-btn:hover {
            background: #c9a84c;
            color: #fff;
          }
          .cart-add-btn {
            padding: 0.45rem 0.7rem;
            border: 1px solid #c9a84c;
            background: #c9a84c;
            color: #fff;
            cursor: pointer;
            transition: all 0.25s;
            border-radius: 1px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cart-add-btn:hover {
            background: #a8882e;
            border-color: #a8882e;
          }
          .cart-add-btn svg {
            width: 16px;
            height: 16px;
            display: block;
          }

          /* ── FLOATING CART ── */
          .floating-cart {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #c9a84c;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 18px rgba(180,130,60,0.38);
            transition: background 0.25s, transform 0.2s;
            z-index: 1000;
          }
          .floating-cart:hover {
            background: #a8882e;
            transform: scale(1.07);
          }
          .floating-cart svg {
            width: 24px;
            height: 24px;
          }
          .floating-cart-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #9b5278;
            color: #fff;
            font-size: 11px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: sans-serif;
            pointer-events: none;
          }
        `}</style>

        <Carousel/>

        {/* ABOUT */}
        <div className="about-section col-md-12">
          <h2 className="about-heading">Get to Know Us</h2>
          <p className="about-tagline">Creating memorable events tailored to your dreams</p>
          <div className="about-divider">
            <span></span>
            <i></i>
            <span></span>
          </div>
          <p className="about-desc">
            We are a passionate team of event planners dedicated to turning your vision into reality.
            From intimate gatherings to grand celebrations, we bring creativity, precision, and heart
            to every event we craft.
          </p>
          <div className="about-badges">
            <span className="about-badge">Experienced Team</span>
            <span className="about-badge">Affordable Packages</span>
            <span className="about-badge">Timely Execution</span>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="why-section col-md-12">
          <h2 className="why-heading">Why Choose Us</h2>
          <p className="why-sub">Reasons our clients keep coming back</p>
          <div className="why-divider">
            <span></span>
            <i></i>
            <span></span>
          </div>
          <div className="why-grid">
            {[
              { img: "verified_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png", text: "Creative Design" },
              { img: "credit_card_heart_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png", text: "Budget Friendly" },
              { img: "business_center_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png", text: "Reliable & Professional" },
              { img: "favorite_30dp_9B5278_FILL0_wght400_GRAD0_opsz24.png", text: "Attention to Detail" }
            ].map((item, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">
                  <img src={`images/${item.img}`} alt={item.text} />
                </div>
                <p className="why-label">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {loading && <Loader/>}
        <h4 className="text-danger">{error}</h4>

        {/* OUR SERVICES */}
        <div className="srv-section">
          <h2 className="srv-heading">Our Services</h2>
          <p className="srv-sub">Curated experiences for every occasion</p>
          <div className="srv-divider">
            <span></span>
            <i></i>
            <span></span>
          </div>
          <div className="srv-grid">
            {products.map((product) => (
              <div className="srv-card" key={product.id}>
                <div className="srv-img-wrap">
                  <img
                    src={img_url + product.product_photo}
                    alt={product.product_name}
                  />
                </div>
                <div className="srv-body">
                  <p className="srv-name">{product.product_name}</p>
                  <p className="srv-desc">
                    {product.product_description.slice(0, 100)}...
                  </p>
                  <p className="srv-price">KES {product.product_cost}</p>
                  <div className="srv-actions">
                    <button
                      className="srv-btn"
                      onClick={() => navigate("/makepayment", { state: { product } })}
                    >
                      Purchase Now
                    </button>
                    <button
                      className="cart-add-btn"
                      onClick={() => addToCart(product)}
                      title="Add to Cart"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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

        {/* FLOATING CART BUTTON */}
        <button
          className="floating-cart"
          onClick={() => navigate("/cart", { state: { cartItems } })}
          title="View Cart"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {totalCartCount > 0 && (
            <span className="floating-cart-badge">{totalCartCount}</span>
          )}
        </button>

    </div>
  )
}

export default GetProducts;