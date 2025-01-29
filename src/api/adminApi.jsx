import { databases,account } from "./appwrite"

export const getAllUsers = async () => {
    const response = await databases.listDocuments(
      process.env.REACT_APP_DB_ID,  // Database ID
      process.env.REACT_APP_USERS_ID, // Users Collection ID
    );

    return response.documents;
}


export const approveOrganization = async (id,status) => {
        // Fetch the user document by its ID
        const response = await databases.getDocument(
            process.env.REACT_APP_DB_ID,  // Database ID
            process.env.REACT_APP_USERS_ID, // Users Collection ID
            id  // The unique ID of the user
          );
          if(response.status === status) {
            throw new Error("Already in same status!");
          }
          // Update the status field to 'approved'
          const updatedResponse = await databases.updateDocument(
            process.env.REACT_APP_DB_ID,  // Database ID
            process.env.REACT_APP_USERS_ID, // Users Collection ID
            id, // The unique ID of the user
            {
              status: status  // New status value
            }
          );
      
          // Return the updated document
          return updatedResponse;
}


export const makeAdmin = async (id) => {
  try {
    
    // Fetch the user document by its ID
    const response = await databases.getDocument(
        process.env.REACT_APP_DB_ID,  // Database ID
        process.env.REACT_APP_USERS_ID, // Users Collection ID
        id  // The unique ID of the user
      );
      // Update the status field to 'approved'
      const updatedResponse = await databases.updateDocument(
        process.env.REACT_APP_DB_ID,  // Database ID
        process.env.REACT_APP_USERS_ID, // Users Collection ID
        id, // The unique ID of the user
        {
          isAdmin:!response.isAdmin  // New status value
        }
      );
      alert('Admin succes!')
      // Return the updated document
      return updatedResponse;
  } catch (error) { 
      console.log('error at admin change:',error.message);
      
  }
}