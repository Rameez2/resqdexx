import { ID, Query } from "appwrite";
import { account, databases } from "./appwrite";


export const uploadPet = async (petData) => {
    try {
  
      console.log('Uploading Pet started...');
      // Step 1: Get current authenticated user
      const currentUser = await account.get();
  
      // Step 2: Fetch the user document from the users collection
      const response = await databases.listDocuments(
        process.env.REACT_APP_DB_ID,  // Database ID
        process.env.REACT_APP_USERS_ID, // Users Collection ID
        [Query.equal("userId", currentUser.$id)] // Query using userId
      );
  
      // Step 3: Ensure the user is an organization
      const userDocument = response.documents[0];
      if (userDocument.role !== 'Organization' || userDocument.status !== 'Approved') {
        // if (userDocument.role !== 'Organization' || userDocument.status !== 'Approved') {
        throw new Error('Only organizations can upload pets.');
      }
      // Step 4: Ensure the organization_id is available in the user document
      const organizationId = userDocument.userId;
      if (!organizationId) {
        throw new Error('Organization ID is required to upload pets.');
      }
  
      // Step 5: Add organization_id to pet data
      const petWithOrgDataAndCategory = {
        ...petData,
        category: petData.category || 'others',
        organization_id: organizationId // Attach the organization_id to the pet data
      };
  
      // Step 6: Add pet data to the animals collection
      const newPet = await databases.createDocument(
        process.env.REACT_APP_DB_ID,    // Database ID
        process.env.REACT_APP_ANIMALS_ID, // Animals Collection ID
        ID.unique(), // Unique Document ID
        petWithOrgDataAndCategory  // Pet Data to be stored in the document
      );
  
      console.log("Pet added successfully:", newPet);
  
    } catch (error) {
      console.log(error);
  
    }
  }

  export const getMyPets = async () => {
    try {
      // Step 1: Get current authenticated user
      const currentUser = await account.get();
  
      // Step 2: Fetch the user document from the users collection
      const response = await databases.listDocuments(
        process.env.REACT_APP_DB_ID,  // Database ID
        process.env.REACT_APP_USERS_ID, // Users Collection ID
        [Query.equal("userId", currentUser.$id)] // Query using userId
      );
  
      // Step 3: Ensure the user is an organization
      const userDocument = response.documents[0];
      if (userDocument.role !== 'Organization') {
        throw new Error('Only organizations can see their pets.');
      }
      
  // Step 4: Fetch all pets (no filter)
  const petsResponse = await databases.listDocuments(
    process.env.REACT_APP_DB_ID,   // Database ID
    process.env.REACT_APP_ANIMALS_ID, // Animals Collection ID
    [Query.equal('organization_id', currentUser.$id)] // Filter by organization_id
  );
  
  
      // Step 5: Display the pets
      const pets = petsResponse.documents;
      console.log('My Uploaded Pets:', pets);
      
      // You can now update your state or UI with the fetched pets
      return pets;
    } catch (error) {
      console.error('Error fetching pets:', error.message);
    }
  };

  export const updatePetById = async (petId, updatedData) => {
    try {
          // Step 1: Get current authenticated user
          const currentUser = await account.get();
      
          // Step 2: Fetch the user document from the users collection
          const response = await databases.listDocuments(
            process.env.REACT_APP_DB_ID,  // Database ID
            process.env.REACT_APP_USERS_ID, // Users Collection ID
            [Query.equal("userId", currentUser.$id)] // Query using userId
          );
          
          // Step 3: Ensure the user is an organization
          const userDocument = response.documents[0];
          if (userDocument.role !== 'Organization') {
            throw new Error('Only organizations can see their pets.');
          }
      // Update the pet document by its ID
      const updatedPet = await databases.updateDocument(
        process.env.REACT_APP_DB_ID,     // Database ID
        process.env.REACT_APP_ANIMALS_ID, // Animals Collection ID
        petId,                           // Document ID (pet ID)
        updatedData                      // Object containing updated fields
      );
  
      console.log(`Pet with ID ${petId} updated successfully:`, updatedPet);
      return updatedPet;
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  export const deleteMyPet = async (petId) => {
    try {
      
      // Step 1: Get current authenticated user
      const currentUser = await account.get();
      
      // Step 2: Fetch the user document from the users collection
      const response = await databases.listDocuments(
        process.env.REACT_APP_DB_ID,  // Database ID
        process.env.REACT_APP_USERS_ID, // Users Collection ID
        [Query.equal("userId", currentUser.$id)] // Query using userId
      );
      
      // Step 3: Ensure the user is an organization
      const userDocument = response.documents[0];
      if (userDocument.role !== 'Organization') {
        throw new Error('Only organizations can see their pets.');
      }
      
      console.log('pet deleting...');
      // Delete the pet document by its ID
      await databases.deleteDocument(
        process.env.REACT_APP_DB_ID,     // Database ID
        process.env.REACT_APP_ANIMALS_ID, // Animals Collection ID
        petId                            // Document ID (pet ID)
      );
  
      console.log(`Pet with ID ${petId} deleted successfully.`);
      
  
    } catch (error) {
      console.log('error',error.message);
       
    }
  
  }