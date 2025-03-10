import { ID, Query } from "appwrite";
import { account, databases } from "./appwrite";

export const uploadPet = async (petData) => {
  console.log('uploading...');

  const url = process.env.REACT_APP_PETS_API;
  const jwtToken = await account.createJWT();

  const response = await fetch("https://679b7ca8bcf48aaa6895.appwrite.global/pets", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken.jwt}`
    },
    body: JSON.stringify(petData)
  });

  const data = await response.json();

  // console.log('dataaa res:',response.status);

  if (response.status !== 200) {
    throw new Error(data.error);
  }
  // console.log('Pet created successfully:', data);

  return data;
}

export const getMyPets = async () => {
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
    [Query.equal('organization_id', userDocument.$id)] // Filter by organization_id
  );


  // Step 5: Display the pets
  const pets = petsResponse.documents;
  console.log('My Uploaded Pets:', pets);

  // You can now update your state or UI with the fetched pets
  return pets;
};

export const updatePetById = async (petId, updatedPetData) => {
  console.log('updateeeeeee...');

  const url = process.env.REACT_APP_PETS_API;
  const jwtToken = await account.createJWT();

  const response = await fetch("https://679b7ca8bcf48aaa6895.appwrite.global/pets", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken.jwt}`
    },
    body: JSON.stringify({ petId, updatedPetData })
  });

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
};

export const deleteMyPet = async (petId) => {
  console.log('deetlting...');

  const url = process.env.REACT_APP_PETS_API;
  const jwtToken = await account.createJWT();

  const response = await fetch("https://679b7ca8bcf48aaa6895.appwrite.global/pets", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken.jwt}`
    },
    body: JSON.stringify({ petId: petId })
  });

  const data = await response.json();
  console.log('del res', data);

  if (response.status !== 200) {
    throw new Error(data.error);
  }
  return data;
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