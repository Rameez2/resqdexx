import { ID, Query } from "appwrite";
import { account,databases } from "./appwrite";

// USER ACTIONS
export const getCurrentUserData = async () => {
    // GET CURRENT USER
    const currentUser = await account.get();
    const userId = currentUser.$id; // Authenticated user ID

    console.log('1. current user is,', currentUser);

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
    console.log("User Data from Database:", userData);
    return userData;
}

export const updateFavourites = async (petId) => {
  try {
      // Step 1: Get the current user
      const currentUser = await account.get();
      const userId = currentUser.$id; // Authenticated user ID

      console.log('1. Current user is:', currentUser);

      // Step 2: Fetch the user's document
      const response = await databases.listDocuments(
          process.env.REACT_APP_DB_ID,  // Database ID
          process.env.REACT_APP_USERS_ID, // Users Collection ID
          [Query.equal("userId", userId)] // Query by userId field
      );

      if (response.documents.length === 0) {
          throw new Error('User document not found');
      }

      const userDocument = response.documents[0]; // Assuming only one document matches
      const documentId = userDocument.$id; // Document ID of the user

      console.log('2. User document fetched:', userDocument);

      // Step 3: Update the `favourites` array
      const updatedFavourites = userDocument.favourites
          ? [...userDocument.favourites, petId] // Append petId if favourites exists
          : [petId]; // Initialize favourites if it doesn't exist

      // Step 4: Save the updated user document
      const updatedUser = await databases.updateDocument(
          process.env.REACT_APP_DB_ID, // Database ID
          process.env.REACT_APP_USERS_ID, // Users Collection ID
          documentId, // Document ID of the user
          { favourites: updatedFavourites } // Updated data
      );

      console.log('3. User favourites updated:', updatedUser);
      return updatedUser;
  } catch (error) {
      console.error('Error updating user favourites:', error.message);
      throw error;
  }
};


// GET PET BY ID

export const getPetById = async (petId) => {

  const petResponse = await databases.getDocument(
    process.env.REACT_APP_DB_ID,      // Database ID
    process.env.REACT_APP_ANIMALS_ID, // Animals Collection ID
    petId                             // Document ID (Pet ID)
  );

  return petResponse;

}

// PETS ACTIONS


// GET MY UPLOADED PETS

export const getAllPets = async () => {
  try {

    // Step 4: Fetch all pets (no filter)
    const petsResponse = await databases.listDocuments(
      process.env.REACT_APP_DB_ID,   // Database ID
      process.env.REACT_APP_ANIMALS_ID, // Animals Collection ID
    );
    // Step 5: Display the pets
    const pets = petsResponse.documents;
    console.log('ALL PETS:', pets);
    
    // You can now update your state or UI with the fetched pets
    return pets;
  } catch (error) {
    console.error('Error fetching pets:', error.message);
  }
};

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

    // Step 2: Add user data to the users collection
    const userData = {
      name: name,
      email: email,
      role: role, // Role (e.g., adopter, organization)
      userId: user.$id, // Add the Auth userId to the user document
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
    console.error("Error during registration:", error);

    // If something fails, rollback (delete created user if necessary)
    if (error.code === 409 && error.message.includes("email already exists")) {
      throw new Error("Email already exists.");
    }

    throw new Error("Registration failed. Please try again.");
  }
};

export const loginUserWithEmail = async (email, password) => {
  const response = await account.createEmailPasswordSession(email, password);
  console.log("session ID",response.$id); // Success
  localStorage.setItem('sessionId', response.$id);
  return response;
};


export const logout = async () => {
  // console.log('oputingg start');
  return await account.deleteSession('current'); // Deletes the current session
  // Optionally, redirect user to the login page
  // window.location.href = "/login";
};