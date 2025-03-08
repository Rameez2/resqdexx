import { ID, Query } from "appwrite";
import { account,databases } from "./appwrite";

// USER ACTIONS
export const getCurrentUserData = async () => {
    // GET CURRENT USER
    const currentUser = await account.get();
    const userId = currentUser.$id; // Authenticated user ID

    // console.log('1. current user is,', currentUser);

    const response = await databases.listDocuments(
      process.env.REACT_APP_DB_ID,  // Database ID
      process.env.REACT_APP_USERS_ID, // Users Collection ID
      [Query.equal("userId", userId)] // Query by userId field
    );

    // Check if the user document exists
    if (response.documents.length === 0) {
      // throw new Error("User data not found in the database.");
      console.log("User data not found in the database.");
      
    }

    const userData = response.documents[0]; // Get the first document (should be unique)
    // console.log("User Data from Database:", userData);
    return userData;
}

//  AUTHETICATION
export const registerUser = async (name, email, password, role) => {
  try {
    // Step 1: Create the user in Appwrite Authentication
    const user = await account.create(
      ID.unique(), // Unique ID for the user
      email,       // User's email
      password,    // User's password
      name         // User's name
    );

    console.log("User registered successfully in Auth:", user);

    // Now create a additional_info document
    
    const newAddInfo = await databases.createDocument(
      process.env.REACT_APP_DB_ID,  // Database ID
      "67c2aab2002b74932550", // Users Collection ID
      ID.unique(), // Unique Document ID
      { personal_info: ["dumy"] }
    );

    console.log("Additional info created:", newAddInfo);

    // Step 2: Add user data to the users collection
    const userData = {
      name: name,
      email: email,
      role: role, // Role (e.g., adopter, organization)
      userId: user.$id, // Add the Auth userId to the user document
      more_info:newAddInfo.$id
    };

    const newUser = await databases.createDocument(
      process.env.REACT_APP_DB_ID,  // Database ID
      process.env.REACT_APP_USERS_ID, // Users Collection ID
      ID.unique(), // Unique Document ID
      userData     // Document data
    );

    console.log("User data added to the users collection:", newUser);
    return { user, newUser }; // Return both objects for further use
  } catch (error) {
    // console.error("Error during registration:", error);

    // If something fails, rollback (delete created user if necessary)
    if (error.code === 409 && error.message.includes("email already exists")) {
      throw new Error("Email already exists.");
    }
    console.log('rpob',error);
    
    throw new Error(error.message);
  }
};

export const loginUserWithEmail = async (email, password) => {
  const response = await account.createEmailPasswordSession(email, password);
  // console.log("session ID",response.$id); // Success
      // 🔹 Generate JWT
      const jwt = await account.createJWT();
    
      // 🔹 Store JWT in localStorage
      localStorage.setItem("appwrite_jwt", jwt.jwt);
      console.log("JWT saved to localStorage:", jwt.jwt);
  return response;
};

export const generateJWT = async () => {
        // 🔹 Generate JWT
        const jwt = await account.createJWT();
    
        // 🔹 Store JWT in localStorage
        localStorage.setItem("appwrite_jwt", jwt.jwt);
        console.log("JWT saved to localStorage:", jwt.jwt);
}

export const logout = async () => {
  // console.log('oputingg start');
  return await account.deleteSession('current'); // Deletes the current session
  // Optionally, redirect user to the login page
  // window.location.href = "/login";
};