import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container text-center text-md-start">
        <div className="row">

          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h4 style={styles.brand}> Furaha Event Decorations</h4>
            <p style={styles.text}>
              We turn your special moments into unforgettable memories with elegant event decorations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 style={styles.heading}>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" style={styles.link}>Home</a></li>
              <li><a href="/signin" style={styles.link}>SignIn</a></li>
              <li><a href="/signup" style={styles.link}>SignUp</a></li>
              <li><a href="/addproducts" style={styles.link}>Add products</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">
            <h5 style={styles.heading}>Follow Us</h5>
            <div>
              <a href="https://www.facebook.com" style={styles.social}>Facebook</a><br/>
              <a href="https://www.instagram.com" style={styles.social}> Instagram</a><br/>
              <a href="https://www.tiktok.com" style={styles.social}>TikTok</a><br/>
              <a href="https://www.pintrest.com" style={styles.social}> Pinterest</a>
            </div>
          </div>

        </div>

        <hr style={{ borderColor: "#fff" }} />

        <div className="text-center">
          <p style={styles.copy}>
            © {new Date().getFullYear()} Furaha Event Decorations | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: "linear-gradient(135deg, #ff9ecf, #ff5fa2)",
    color: "#fff",
    padding: "40px 0",
    marginTop: "50px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
    boxShadow: "0 -5px 20px rgba(0,0,0,0.2)"
  },
  brand: {
    fontWeight: "bold"
  },
  heading: {
    marginBottom: "15px",
    fontWeight: "600"
  },
  text: {
    fontSize: "14px",
    opacity: "0.9"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    display: "block",
    marginBottom: "8px",
    transition: "0.3s"
  },
  social: {
    color: "#fff",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "8px",
    transition: "0.3s"
  },
  copy: {
    fontSize: "13px",
    opacity: "0.8"
  }
}

export default Footer