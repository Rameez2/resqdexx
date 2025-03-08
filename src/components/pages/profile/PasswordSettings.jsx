import React, { useState, useEffect } from 'react';
import styles from '../../../styles/profile/password.module.css';
import { changeUserPassword } from '../../../api/userApi';

const PasswordSettings = ({ userId }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false); // Loading state

    // Enable the button when any of the fields change
    useEffect(() => {
        if (currentPassword || newPassword || confirmNewPassword) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [currentPassword, newPassword, confirmNewPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if new password and confirm password match
        if (newPassword !== confirmNewPassword) {
            setErrorMessage("New password and confirm password do not match.");
            return;
        }

        setLoading(true); // Start loading

        try {
            // Call the change password API function
            await changeUserPassword(currentPassword, newPassword);

            // Reset form after successful submission
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setErrorMessage('');
            setIsButtonDisabled(true);

            alert("Password changed successfully!");

        } catch (error) {
            setErrorMessage(error.message || "Failed to change password.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Change Password {userId}</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

                <button
                    type="submit"
                    disabled={isButtonDisabled || loading}
                    className={loading ? styles.loadingButton : ""}
                >
                    {loading ? "Changing..." : "Change Password"}
                </button>
            </form>
        </div>
    );
}

export default PasswordSettings;
