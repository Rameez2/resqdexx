import React, { createContext, useState, useEffect, useContext } from 'react';
import { client } from '../api/appwrite';
import { Account } from 'appwrite';
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

    // Function to handle login
    const login = (userData) => {
        setUser(userData);  // Set the user when logged in
    };

    // Function to handle logout
    const logout = async () => {
        try {
            await account.deleteSession('current');  // Delete current session
            setUser(null);  // Clear user state
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    // Check if the user is logged in on component mount
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const user = await account.get();  // Check the logged-in user
                setUser(user);  // Set the user if logged in
            } catch (error) {
                setUser(null);  // If no user is logged in, set null
                console.log('User is not logged in');
            }
        };

        checkUserLoggedIn();  // Call the function to check login status
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
