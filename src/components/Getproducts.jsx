import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import Footer from './Footer';
import Chatbox from './Chatbox';

const GetProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

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

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const changeQty = (id, delta) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + item.product_cost * item.quantity, 0);

    // For Buy Now with multiple items, take first item or handle as needed
    const handleBuyNow = () => {
        if (cartItems.length === 0) return;
        setCartOpen(false);
        // Pass first item; you can adjust this logic as needed
        navigate("/makepayment", { state: { product: cartItems[0] } });
    };

  return (
    <div className='row'>

        <style>{`
          /* ── CART DRAWER ── */
          .cart-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            z-index: 1100;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
          }
          .cart-overlay.open {
            opacity: 1;
            pointer-events: all;
          }
          .cart-drawer {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            width: 340px;
            max-width: 95vw;
            background: #fffdf9;
            border-left: 1px solid #f0e0c8;
            z-index: 1200;
            display: flex;
            flex-direction: column;
            transform: translateX(100%);
            transition: transform 0.35s cubic-bezier(.4,0,.2,1);
            box-shadow: -8px 0 32px rgba(180,130,60,0.10);
          }
          .cart-drawer.open {
            transform: translateX(0);
          }
          .cart-drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.2rem 1.4rem;
            border-bottom: 1px solid #f0e0c8;
          }
          .cart-drawer-title {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 1.2rem;
            font-weight: 600;
            color: #b8860b;
            letter-spacing: 0.03em;
            margin: 0;
          }
          .cart-close-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            color: #c9a84c;
            font-size: 1.4rem;
            line-height: 1;
            padding: 0.2rem 0.4rem;
            transition: color 0.2s;
          }
          .cart-close-btn:hover { color: #8b6914; }
          .cart-drawer-items {
            flex: 1;
            overflow-y: auto;
            padding: 1rem 1.2rem;
          }
          .cart-empty {
            text-align: center;
            color: #d4a0b0;
            font-size: 0.88rem;
            margin-top: 3rem;
            letter-spacing: 0.1em;
          }
          .cart-item {
            display: flex;
            gap: 0.8rem;
            align-items: flex-start;
            padding: 0.9rem 0;
            border-bottom: 1px solid #f0e0c8;
          }
          .cart-item img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border: 1px solid #f0e0c8;
            flex-shrink: 0;
          }
          .cart-item-info { flex: 1; }
          .cart-item-name {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 0.88rem;
            font-weight: 600;
            color: #8b6914;
            margin: 0 0 0.2rem;
          }
          .cart-item-price {
            font-size: 0.78rem;
            color: #c9a84c;
            margin: 0 0 0.5rem;
          }
          .cart-qty-row {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .cart-qty-btn {
            background: transparent;
            border: 1px solid #c9a84c;
            color: #8b6914;
            width: 24px;
            height: 24px;
            cursor: pointer;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            border-radius: 1px;
          }
          .cart-qty-btn:hover { background: #c9a84c; color: #fff; }
          .cart-qty-num {
            font-size: 0.82rem;
            color: #8b6914;
            min-width: 16px;
            text-align: center;
          }
          .cart-remove-btn {
            background: transparent;
            border: none;
            color: #d4a0b0;
            cursor: pointer;
            font-size: 1rem;
            padding: 0;
            margin-left: auto;
            transition: color 0.2s;
            align-self: center;
          }
          .cart-remove-btn:hover { color: #9b5278; }
          .cart-drawer-footer {
            padding: 1.2rem 1.4rem;
            border-top: 1px solid #f0e0c8;
            background: #fffdf9;
          }
          .cart-subtotal-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }
          .cart-subtotal-label {
            font-size: 0.78rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #9a7e8a;
          }
          .cart-subtotal-amount {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 1.05rem;
            font-weight: 600;
            color: #b8860b;
          }
          .cart-buy-btn {
            width: 100%;
            padding: 0.6rem;
            background: #c9a84c;
            border: 1px solid #c9a84c;
            color: #fff;
            font-size: 0.8rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.25s;
            border-radius: 1px;
            margin-bottom: 0.6rem;
          }
          .cart-buy-btn:hover { background: #a8882e; border-color: #a8882e; }
          .cart-continue-btn {
            width: 100%;
            padding: 0.6rem;
            background: transparent;
            border: 1px solid #c9a84c;
            color: #8b6914;
            font-size: 0.8rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.25s;
            border-radius: 1px;
          }
          .cart-continue-btn:hover { background: #f9f0e0; }

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
          .about-badge:hover { background: #c9a84c; color: #fff; }

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
          .why-icon { width: 48px; height: 48px; margin: 0 auto 1rem; }
          .why-icon img { width: 100%; height: 100%; object-fit: contain; }
          .why-label {
            font-family: Georgia, 'Times New Roman', serif;
            font-size: 0.95rem;
            font-weight: 600;
            color: #8b6914;
            letter-spacing: 0.03em;
          }

          /* ── OUR SERVICES ── */
          .srv-section {
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
          .srv-card:hover .srv-img-wrap img { transform: scale(1.06); }
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
          .srv-btn:hover { background: #c9a84c; color: #fff; }
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
          .cart-add-btn:hover { background: #a8882e; border-color: #a8882e; }
          .cart-add-btn svg { width: 16px; height: 16px; display: block; }

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
          .floating-cart:hover { background: #a8882e; transform: scale(1.07); }
          .floating-cart svg { width: 24px; height: 24px; }
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
          <div className="about-divider"><span></span><i></i><span></span></div>
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
          <div className="why-divider"><span></span><i></i><span></span></div>
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
          <div className="srv-divider"><span></span><i></i><span></span></div>
          <div className="srv-grid">
            {products.map((product) => (
              <div className="srv-card" key={product.id}>
                <div className="srv-img-wrap">
                  <img src={img_url + product.product_photo} alt={product.product_name} />
                </div>
                <div className="srv-body">
                  <p className="srv-name">{product.product_name}</p>
                  <p className="srv-desc">{product.product_description.slice(0, 100)}...</p>
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
            <Link to="/gallery" className="pink-btn">View Full Gallery</Link>
          </nav>
        </div>

        <Footer/>

        {/* FLOATING CART BUTTON */}
        <button
          className="floating-cart"
          onClick={() => setCartOpen(true)}
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

        {/* CART OVERLAY */}
        <div
          className={`cart-overlay ${cartOpen ? 'open' : ''}`}
          onClick={() => setCartOpen(false)}
        />

        {/* CART DRAWER */}
        <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
          <div className="cart-drawer-header">
            <p className="cart-drawer-title">Your Cart ({totalCartCount})</p>
            <button className="cart-close-btn" onClick={() => setCartOpen(false)}>✕</button>
          </div>

          <div className="cart-drawer-items">
            {cartItems.length === 0 ? (
              <p className="cart-empty">Your cart is empty</p>
            ) : (
              cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <img src={img_url + item.product_photo} alt={item.product_name} />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.product_name}</p>
                    <p className="cart-item-price">KES {item.product_cost}</p>
                    <div className="cart-qty-row">
                      <button className="cart-qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                      <span className="cart-qty-num">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))
            )}
          </div>

          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span className="cart-subtotal-label">Subtotal</span>
              <span className="cart-subtotal-amount">KES {subtotal.toLocaleString()}</span>
            </div>
            <button
              className="cart-buy-btn"
              onClick={handleBuyNow}
              disabled={cartItems.length === 0}
            >
              Buy Now
            </button>
            <button className="cart-continue-btn" onClick={() => setCartOpen(false)}>
              Continue Shopping
            </button>
          </div>
        </div>
<Chatbox/>
    </div>
  )
}

export default GetProducts;