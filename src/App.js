import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import Gallery from './components/Gallery';

// ── Helpers ───────────────────────────────────────────────────────────────────

const getUser = () => {
  try { return JSON.parse(localStorage.getItem("user")); }
  catch { return null; }
};

const isAdmin = (user) => user && user.username === "Admin";

// ── Route Guards ──────────────────────────────────────────────────────────────

const PrivateRoute = ({ children }) => {
  const user = getUser();
  return user ? children : <Navigate to="/signin" replace />;
};

const AdminRoute = ({ children }) => {
  const user = getUser();
  if (!user) return <Navigate to="/signin" replace />;
  if (!isAdmin(user)) return <Navigate to="/" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const user = getUser();
  return user ? <Navigate to="/" replace /> : children;
};

// ── Header (your original, with smart nav links) ──────────────────────────────

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const admin = isAdmin(user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  // Hide header on signin/signup pages
  if (["/signin", "/signup"].includes(location.pathname)) return null;

  return (
    <header className="custom-header">
      <div className="logo-area">
        <img
          src="/Bloom.png"
          alt="Logo"
          className="logo"
          width="600px"
          height="600px"
        />
        <h3>Furaha Event Decorations</h3>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/gallery">Gallery</Link>
        {admin && <Link to="/addproducts">Add Products</Link>}
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            font: "inherit",
            color: "inherit"
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  return (
    <Router>
      <div className="App">

        <Header />

        <Routes>
          {/* Public only */}
          <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

          {/* Any logged-in user */}
          <Route path="/" element={<PrivateRoute><Getproducts /></PrivateRoute>} />
          <Route path="/gallery" element={<PrivateRoute><Gallery /></PrivateRoute>} />
          <Route path="/makepayment" element={<PrivateRoute><Makepayment /></PrivateRoute>} />

          {/* Admin only */}
          <Route path="/addproducts" element={<AdminRoute><Addproducts /></AdminRoute>} />

          {/* 404 */}
          <Route path="*" element={<Notfound />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;