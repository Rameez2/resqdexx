import { Query } from "appwrite";
import { databases } from "./appwrite";


export const getUserDocuments = async (role) => {
  try {
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
  } catch (error) {
    console.error('Error getting user documents:', error);
    return []; // Return empty array in case of error
  }
};
