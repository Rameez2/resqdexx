import { Databases, Account, ID } from "appwrite";
import { client } from "./appwrite";
// const databases = new Databases(client);
const account = new Account(client);
const databases = new Databases(client);

export const registerUser = async (name, email, password, role) => {
   // Step 1: Create the user in Appwrite Authentication
   const user = await account.create(
    ID.unique(), // Unique ID for the user
    email,       // User's email
    password,    // User's password
    name         // User's name
  );

  console.log('User registered successfully:', user);

  // Step 2: Add the user to the users collection with extra fields
  const userData = {
    name: name,
    email: email,
    role: role,  // Role (e.g., adopter, organization)
    verified: role === "organization" ? false : true // Example: Default verification for organizations
  };

  // Create a document in the users collection
  const newUser = await databases.createDocument(
    "6794e43c00368efa3bc3",  // Your Database ID
    "6794e448001983bf439c",           // Collection ID
    ID.unique(),       // Unique Document ID
    userData           // Document data
  );

  console.log('User data added to the database:', newUser);
  
  return user; // Return the user data (you can use this to proceed with login or session handling)
};

export const loginUserWithEmail = async (email, password) => {
    const response = await account.createEmailPasswordSession(email, password);
    console.log(response); // Success
};


export const logout = async () => {
    await account.deleteSession('current'); // Deletes the current session
    // Optionally, redirect user to the login page
    window.location.href = "/login";
};