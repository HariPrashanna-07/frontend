import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#333', color: 'white' }}>
      <h1 style={{ margin: 0 }}>CollegeStore</h1>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Home</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
          Cart 🛒 ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;