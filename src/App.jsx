import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';

const API = import.meta.env.VITE_API_URL;

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // Fetch Products
  useEffect(() => {
    axios.get(`${API}/api/products`)
      .then(res => setProducts(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    alert("Logged out successfully!");
  };

  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#333', color: 'white' }}>
        <h1>CollegeStore</h1>
        <div>
          <Link to="/store" style={{ color: 'white', marginRight: '20px' }}>Store</Link>
          <Link to="/cart" style={{ color: 'white', marginRight: '20px' }}>
            Cart ({cart.length})
          </Link>

          {user ? (
            <>
              <span style={{ color: 'yellow', marginRight: '15px' }}>
                Hi, {user.name}!
              </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Login</Link>
              <Link to="/register" style={{ color: 'white' }}>Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
        <Route path="/store" element={<Home products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
