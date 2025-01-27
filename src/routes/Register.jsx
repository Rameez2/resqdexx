import React, { useState, useEffect } from 'react';
import { registerUser } from '../api/apiCalls';
import { useLocation } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [userRole, setUserRole] = useState('adopter');  // Default to "Adopter"

    // Get the role from the URL query parameters
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roleParam = params.get('role');
        if (roleParam === 'organization') {
            setUserRole('organization');
        } else {
            setUserRole('adopter');
        }
    }, [location]);

    // Handle change in select dropdown
    const handleRoleChange = (event) => {
        setUserRole(event.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(null); // Clear previous errors
        try {
            const result = await registerUser(formData.name, formData.email, formData.password, userRole);
        } catch (err) {
            setError(err.message); // Handle error
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Register</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                <label style={styles.label}>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Role:
                    <select
                        className={styles.navSelect}
                        name="role"
                        id="role"
                        value={userRole}  // Set the value to match the state
                        onChange={handleRoleChange}  // Update state on change
                    >
                        <option value="adopter">Adopter</option>
                        <option value="organization">Organization</option>
                    </select>
                </label>
                <div>
                    <button style={styles.button} type='submit' disabled={loading}>
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                    {error && <p>Error: {error}</p>}
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '15px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Register;
