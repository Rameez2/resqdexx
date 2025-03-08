import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

export const searchAdopterByName = async (adopterName) => {
    try {
        const response = await databases.listDocuments(
          process.env.REACT_APP_DB_ID,                // Your Database ID
          process.env.REACT_APP_USERS_ID,             // Your Users Collection ID
          [
            Query.search("name", adopterName)            // Search the "name" field for "Rameez"
          ]
        );
        console.log('searched', response.documents);
        return response.documents;
      } catch (error) {
        console.error("Error searching for adopter by name:", error);
        throw error;
      }
}

export const getRandomAdopters = async (count) => {
    try {
        const response = await databases.listDocuments(
            process.env.REACT_APP_DB_ID,    // Your Database ID
            process.env.REACT_APP_USERS_ID, // Your Users Collection ID
            [
              Query.limit(10)
            ]
          );
          
          console.log("First 10 users:", response.documents);
          return response.documents;
      } catch (error) {
        console.error("Error fetching first 10 users:", error);
        throw error;
      }
}

export const searchPetByName = async (petName) => {
    console.log('Pet Name:',petName);
    try {
        
    } catch (error) {
        
    }
}
