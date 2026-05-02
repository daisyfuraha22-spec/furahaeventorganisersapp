import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';
import Gallery from './components/Gallery';

function App() {
  return (
    <Router>
      <div className="App">

        {/* HEADER */}
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
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/addproducts">Add Products</Link>
            <Link to="/gallery">Gallery</Link>
          </nav>
        </header>

        {/* ROUTES */}
        <Routes>
          <Route path='/' element={<Getproducts />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproducts' element={<Addproducts />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path='*' element={<Notfound />} />
          <Route path='/gallery' element={<Gallery/>}/>
        </Routes>

      </div>
    </Router>
  );
}

export default App;