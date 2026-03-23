
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import Signin from './components/Signin';
import Signup from './components/Signup';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Notfound from './components/Notfound';
import Makepayment from './components/Makepayment';



function App() {
  return (
    <Router>
      <div className="App">
      <header className="App-header">
        <h2>Welcome to Furaha Event Decoration-The best Organisers to deliver your dream event</h2>
      </header>
      <Routes>
        <Route path='/' element={<Getproducts/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/addproducts' element={<Addproducts/>} />
        <Route path='*' element={<Notfound/>}/>
        <Route path='/makepayment' element={<Makepayment/>}/>

        

      </Routes>
    </div>
    </Router>
  );
}

export default App;
