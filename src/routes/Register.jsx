import React, { useState, useEffect } from 'react';
import { registerUser } from '../api/apiCalls';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext'; // Import the useUser hook
import styles from '../styles/register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [userRole, setUserRole] = useState('Adopter');  // Default to "Adopter"
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get the role from the URL query parameters
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUser(); // Access the user from context

    // Redirect to homepage if the user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to homepage if user is logged in
        }
    }, [user, navigate]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roleParam = params.get('role');
        if (roleParam === 'organization') {
            setUserRole('Organization');
        } else {
            setUserRole('Adopter');
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

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(null); // Clear previous errors
        try {
            const result = await registerUser(formData.name, formData.email, formData.password, userRole);
            // Redirect user after successful registration
            navigate('/'); // Redirect to homepage (or any other page you want after registration)
        } catch (err) {
            setError(err.message); // Handle error
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.signupContainer}>
                <h2 className={styles.heading}>Sign Up</h2>
                <form onSubmit={handleRegister} className={styles.form}>
                    <div className={styles.formInputs}>
                        <div className={styles.formRow}>
                            <label>*First Name: <input type="text" placeholder="First Name" /></label>
                            <label>*Last Name: <input type="text" placeholder="Last Name" /></label>
                        </div>
                        <div className={styles.formRow}>
                            <label>*Gender: <input type="text" placeholder="Gender" /></label>
                            <label>*Organization Name: <input type="text" placeholder="Organization Name" /></label>
                        </div>
                        <div className={styles.formRow}>
                            <label>*Email Address: <input type="text" placeholder="Email Address" /></label>
                            <label>*Date of Birth: <input type="text" placeholder="Date of Birth" /></label>
                        </div>
                        <div className={styles.formRow}>
                            <label>*Organization’s Address: <input type="text" placeholder="Organization’s Address" /></label>
                            <label>*Phone Number: <input type="text" placeholder="Phone Number" /></label>
                        </div>
                        <div className={styles.formRow}>
                            <label>*Country: <input type="text" placeholder="Country" /></label>
                            <label>*Document (ID Card, Passport): <input type="text" placeholder="Document (ID Card, Passport)" /></label>
                        </div>
                    </div>

                    <button className='primary-btn'>Submit</button>
                </form>
            </div>
        </div>
    );
};

// const styles = {
//     container: {
//         maxWidth: '400px',
//         margin: '50px auto',
//         padding: '20px',
//         border: '1px solid #ccc',
//         borderRadius: '8px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         backgroundColor: '#f9f9f9',
//     },
//     heading: {
//         textAlign: 'center',
//         color: '#333',
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     label: {
//         marginBottom: '15px',
//         color: '#555',
//     },
//     input: {
//         width: '100%',
//         padding: '8px',
//         margin: '5px 0',
//         border: '1px solid #ccc',
//         borderRadius: '4px',
//     },
//     button: {
//         padding: '10px',
//         backgroundColor: '#28a745',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer',
//         fontSize: '16px',
//     },
// };

export default Register;
