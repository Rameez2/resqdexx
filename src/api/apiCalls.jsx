import { Databases, Account, ID, Query } from "appwrite";
import { client } from "./appwrite";
// const databases = new Databases(client);
const account = new Account(client);
const databases = new Databases(client);


// USER ACTIONS
export const getCurrentUserData = async () => {
  try {
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
      throw new Error("User data not found in the database.");
    }

    const userData = response.documents[0]; // Get the first document (should be unique)
    console.log("User Data from Database:", userData);

  } catch (error) {
    console.log('User Fetching Error', error);

  }

}

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
    if (userDocument.role !== 'organization') {
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

// GET MY UPLOADED PETS

// Function to fetch pets uploaded by the current authenticated user (organization)
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
    if (userDocument.role !== 'organization') {
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

// DELETE MY PET
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
    if (userDocument.role !== 'organization') {
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

export const updatePetById = async (petId, updatedData) => {
  try {
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
    throw error; // Handle this error in your UI
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
      verified: role === "organization" ? false : true, // Set verification status
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
  // console.log(response); // Success
  return response;
};


export const logout = async () => {
  // console.log('oputingg start');
  return await account.deleteSession('current'); // Deletes the current session
  // Optionally, redirect user to the login page
  // window.location.href = "/login";
};