import React from 'react';

function Home({ products, addToCart }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2>🛍️ Available Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              style={{ background: 'black', color: 'white', padding: '10px', width: '100%', border: 'none', cursor: 'pointer' }}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;