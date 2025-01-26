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
        console.log('userData is:',userData);
        
        setUser(userData);  // Set the user when logged in
        localStorage.setItem('user', JSON.stringify(userData));  // Save user to localStorage
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
            // First, try to get the user from localStorage
            const storedUser = JSON.parse(localStorage.getItem('user'));
            
            if (storedUser) {
                setUser(storedUser);  // Set user from localStorage if it exists
            } else {
                try {
                    // If no user in localStorage, check with Appwrite if there's an active session
                    const loggedInUser = await account.get();
                    setUser(loggedInUser);  // Set the user if logged in
                    localStorage.setItem('user', JSON.stringify(loggedInUser));  // Save to localStorage
                } catch (error) {
                    setUser(null);  // If no user is logged in, set null
                    console.log('User is not logged in');
                }
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
