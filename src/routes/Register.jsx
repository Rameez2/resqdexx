import React, { useState, useEffect } from 'react';
import { registerUser } from '../api/authApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import styles from '../styles/register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [userRole, setUserRole] = useState('Adopter'); // Default to "Adopter"
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { loading,user } = useUser();

    // Redirect to homepage if the user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    // Get the role from the URL query parameters
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roleParam = params.get('role');
        if (roleParam === 'organization') {
            setUserRole('Organization');
        } else {
            setUserRole('Adopter');
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (e) => {
        setUserRole(e.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormData(true);
        setError(null);
        try {
            await registerUser(formData.name, formData.email, formData.password, userRole);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setFormData(false);
        }
    };

    if(loading) {
        return (<h1>checks...</h1>)
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.signupContainer}>
                <h2 className={styles.heading}>Sign Up</h2>
                <form onSubmit={handleRegister} className={styles.form}>
                    <div className={styles.formInputs}>
                        <label>Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                        </label>
                        <label>Email Address:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                        </label>
                        <label>Password:
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                        </label>
                        <label>Role:
                            <select value={userRole} onChange={handleRoleChange}>
                                <option value="Adopter">Adopter</option>
                                <option value="Organization">Organization</option>
                            </select>
                        </label>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button className='primary-btn' type="submit" disabled={formLoading}>
                        {formLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
