import { Query } from "appwrite";
import { account, databases } from "./appwrite";
import { getCurrentUserData } from "./authApi";

export const getUserDocuments = async (role) => {
  // Check if the role is provided
  if (!role) {
    console.error('Role is missing');
    return []; // Return empty array if role is not provided
  }
  // Query to fetch users by their role
  const userDocuments = await databases.listDocuments(
    process.env.REACT_APP_DB_ID, // Database ID from your environment variables
    process.env.REACT_APP_USERS_ID, // Collection ID where users are stored
    [
      Query.equal('role', role) // Filter users by the 'role' field
    ]
  );

  return userDocuments.documents; // Return the list of users
};

export const getUserById = async (id) => {
  try {
    const response = await databases.getDocument(
      process.env.REACT_APP_DB_ID,    // Your Database ID
      process.env.REACT_APP_USERS_ID, // Your Users Collection ID
      id                              // Document ID provided as a parameter
    );
    return response;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

export const changeUserPassword = async (currentPassword, newPassword) => {
  try {
    // Step 1: Authenticate the current password (manually re-login with current password)
    const user = await account.get(); // Get the currently logged-in user

    if (!user) {
      throw new Error("User is not logged in.");
    }

    // Step 2: Try to update the password
    await account.updatePassword(currentPassword, newPassword);

    // Step 3: Return success message
    return { success: true, message: "Password updated successfully." };
  } catch (error) {
    // Step 4: Handle error (Appwrite returns a 400 if the password update fails)
    return { success: false, message: error.message };
  }
};

export const updateUserData = async (userId, userData) => {
  // Update user document in the database
  const response = await databases.updateDocument(
    process.env.REACT_APP_DB_ID,    // Database ID
    process.env.REACT_APP_USERS_ID, // Collection ID where users are stored
    userId,                         // User ID to identify the document to update
    userData                        // New data to update in the user document
  );

  return response;  // Return the updated document
}

export const addToChatList = async (id) => {
  // Get the current user's data
  let currentUserDoc = await getCurrentUserData();

  // Check if the current user's chats list exists
  if (!currentUserDoc.chats) {
    currentUserDoc.chats = []; // Initialize the chats list if it doesn't exist
  }

  const organization = await databases.getDocument(
    process.env.REACT_APP_DB_ID,   // Database ID
    process.env.REACT_APP_USERS_ID, // Animals Collection ID
    id
  );
  let idFormat = `${id}+++${organization.name}`;
  console.log(idFormat);
  // Check if the ID is not already in the chat list
  if (!currentUserDoc.chats.includes(idFormat)) {

    // Push the recipient's ID to the chat list
    currentUserDoc.chats.push(idFormat);

    // Update the user's document with the new chats list
    await databases.updateDocument(  process.env.REACT_APP_DB_ID,   // Database ID
      process.env.REACT_APP_USERS_ID, // Animals Collection ID
      currentUserDoc.$id, {
      chats: currentUserDoc.chats,
    });

    console.log(`User ${id} added to chat list.`);
  } else {
    console.log(`User ${id} is already in the chat list.`);
  }
};

export const getChatList = async () => {
  // Get the current user's data
  let currentUserDoc = await getCurrentUserData();  // Assuming this function gets the current user's data

  // Check if the current user's chats list exists
  if (!currentUserDoc.chats) {
    console.log('No chats found for the current user');
    return [];  // Return empty array if no chats exist
  }

  // Return the chat list (array of chat IDs)
  console.log('Chat list:', currentUserDoc.chats);
  return currentUserDoc.chats;
};

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