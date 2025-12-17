import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) { // We pass setUser to update the App state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            
            // 1. SAVE TO BROWSER STORAGE (New Step)
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user)); 
            
            // 2. Update App State
            setUser(res.data.user);
            
            alert('Login Successful!');
            navigate('/store'); 
        } catch (err) {
            console.error(err);
            alert('Invalid Credentials');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>🔑 Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none' }}>Login</button>
            </form>
        </div>
    );
}

export default Login;