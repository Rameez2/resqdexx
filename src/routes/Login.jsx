import { loginUserWithEmail } from '../api/authApi';
import { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import ButtonLoader from '../components/loaders/ButtonLoader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [FormLoading, setFormLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state

    let navigate = useNavigate();
    const {loading, user, login } = useUser(); 

    useEffect(() => {
        if (user) {
            navigate('/'); 
        }
    }, [user, navigate]);

    async function handleLogin(e) {
        e.preventDefault();
        if (FormLoading) return;

        setFormLoading(true);
        setError(''); // Clear previous error

        try {
            let response = await loginUserWithEmail(email, password);
            console.log('Login successful:', response.$id);
            login();
            navigate("/");
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid email or password. Please try again.');
        } finally {
            setFormLoading(false);
        }
    }

    if(loading) {
        return (<h1>checks...</h1>)
    }

    return (
        <div>

            <div className={styles.formContainer}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        <span>Email:</span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError(''); // Clear error on input change
                            }}
                        />
                    </label>

                    <label>
                        <span>Password:</span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                        />
                    </label>

                    {error && <p className={styles.error}>{error}</p>} {/* Display error message */}

                    <button 
                        className="primary-btn" 
                        type="submit" 
                        disabled={FormLoading}
                    >
                        {FormLoading ? "Logging in..." : <ButtonLoader loaderSize={30}/>}
                        {/* {FormLoading ? "Logging in..." : "Login"} */}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
