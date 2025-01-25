import { loginUserWithEmail, logout } from '../api/apiCalls';
import { useState } from 'react';
import { useUser } from '../context/userContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    // State management for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const { login } = useUser();

    // Handle login with email and password
    async function handleLogin(e) {
        e.preventDefault();
        try {
            let response = await loginUserWithEmail(email, password);
            console.log(response);
            login(response);
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f4f4f4'
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '300px',
                textAlign: 'center'
            }}>
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>
                <form>
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                    <button
                        type="submit"
                        onClick={handleLogin}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
