import React, { createContext, useState, useEffect, useContext } from 'react';
import { client } from '../api/appwrite';
import { Account } from 'appwrite';
import { getCurrentUserData } from '../api/authApi';
const account = new Account(client);

// Create UserContext
const UserContext = createContext();

// Custom hook to access UserContext
export const useUser = () => {
    return useContext(UserContext);
};

// UserProvider component to wrap the app and manage user state
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Initial state is null (no user logged in)
    const [loading, setLoading] = useState(true);  // State for loading status

    // Function to handle login
    const login = async () => {
        const userData = await getCurrentUserData();
        setUser(userData);  // Set the user when logged in
    };

    // Function to handle logout
    const logout = async () => {
        try {
            await account.deleteSession('current');  // Delete current session
            setUser(null);  // Clear user state
            localStorage.removeItem('user');  // Remove user from localStorage
            console.log('log out success!');
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    // Check if the user is logged in on component mount
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            setLoading(true);  // Set loading to true while we fetch the user
                try {
                    // If no user in localStorage, check with Appwrite if there's an active session
                    const loggedInUser = await account.get();
                    const userData = await getCurrentUserData();
                    setUser(userData);  // Set the user if logged in
                    setLoading(false);  // Set loading to false when done
                } catch (error) {
                    setUser(null);  // If no user is logged in, set null
                    setLoading(false);  // Set loading to false even if there's an error
                    console.log('User is not logged in');
                }
            // }
        };

        checkUserLoggedIn();  // Call the function to check login status
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
