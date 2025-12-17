import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();

  // 1. Calculate Total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // 2. Checkout Function
  const handleCheckout = async () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      alert("Please Login to Checkout!");
      navigate('/login');
      return;
    }

    // Prepare Data for Backend
    const orderData = {
      userId: user.id, // We get this from the saved LocalStorage
      orderItems: cart.map(item => ({
        name: item.name,
        price: item.price,
        product: item._id
      })),
      totalPrice: total
    };

    try {
      // Send to Backend
      await axios.post('http://localhost:5000/api/orders', orderData);
      alert('Order Placed Successfully! 🎉');
      // Ideally, you would clear the cart here (we can do that next)
    } catch (error) {
      console.error(error);
      alert('Checkout Failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 Your Shopping Cart</h2>
      
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          {cart.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '10px' }}>
              <span>{item.name}</span>
              <span>${item.price}</span>
              <button onClick={() => removeFromCart(index)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                Remove ❌
              </button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          
          {/* THE CHECKOUT BUTTON */}
          <button 
            onClick={handleCheckout}
            style={{ background: 'green', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
            Place Order ✅
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;