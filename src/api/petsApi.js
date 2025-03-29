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

// SPONSOR

export const addSponsorToPet = async (petId, paymentInfo,amount) => { 
  try {
    console.log('details in function',paymentInfo);
    const details = [amount,paymentInfo.id,paymentInfo.payer.payer_id,paymentInfo.payer.email_address,paymentInfo.payer.name.given_name];
    
    paymentInfo = details.join(',');
    // paymentInfo = ["MEWO MOEW MEOW"];
    // paymentInfo= paymentInfo.join(',');
      // Fetch the existing pet document
      const petResponse = await databases.getDocument(
          process.env.REACT_APP_DB_ID,      // Database ID
          process.env.REACT_APP_ANIMALS_ID, // Animals Collection ID
          petId                             // Document ID (Pet ID)
      );

      // Ensure total_donations is an array and push the new donation
      const updatedDonations = Array.isArray(petResponse.total_donations) 
          ? [...petResponse.total_donations, paymentInfo] 
          : [paymentInfo];

      // Update the document with the new donations array
      await databases.updateDocument(
          process.env.REACT_APP_DB_ID,
          process.env.REACT_APP_ANIMALS_ID,
          petId,
          { total_donations: updatedDonations }
      );

      return true; // Success
  } catch (error) {
      console.error("Error adding sponsor donation:", error);
      return false; // Handle errors gracefully
  }
};


// PETS ACTIONS


// GET MY UPLOADED PETS

// export const getPetsByFilter = async (numberOfPets, offset ) => {
//   try {
//     // Build query filters if parameters are provided
//     const queries = [];
//     if (numberOfPets !== undefined) {
//       queries.push(Query.limit(numberOfPets));
//     }
//     if (offset !== undefined) {
//       queries.push(Query.offset(offset));
//     }

//     // Fetch pets with queries if provided, otherwise all pets
//     const petsResponse = await databases.listDocuments(
//       process.env.REACT_APP_DB_ID,    // Database ID
//       process.env.REACT_APP_ANIMALS_ID, // Animals Collection ID
//       queries
//     );
    
//     const pets = petsResponse.documents;
//     console.log("ALL PETS:", pets);
//     return pets;
//   } catch (error) {
//     console.error("Error fetching pets:", error.message);
//     throw error;
//   }
// };

export const getPetsByFilter = async (numberOfPets, offset, filters = {}) => {
  try {
    const queries = [];

    if (numberOfPets !== undefined) {
      queries.push(Query.limit(numberOfPets));
    }
    if (offset !== undefined) {
      queries.push(Query.offset(offset));
    }

    // Apply filters dynamically (ignoring age and empty values)
    if (filters.breed && filters.breed.trim() !== "") {
      console.log('yes btreeed');
      
      queries.push(Query.equal("breed", filters.breed));
    }
    if (filters.specie && filters.specie.trim() !== "") {
      queries.push(Query.equal("specie", filters.specie));
    }
    if (filters.size && filters.size.trim() !== "") {
      queries.push(Query.equal("size", filters.size));
    }
    if (filters.gender && filters.gender.trim() !== "") {
      queries.push(Query.equal("gender", filters.gender));
    }

    // Fetch pets with applied filters
    const petsResponse = await databases.listDocuments(
      process.env.REACT_APP_DB_ID,    
      process.env.REACT_APP_ANIMALS_ID, 
      queries
    );
    
    const pets = petsResponse.documents;
    console.log("Filtered Pets:", pets);
    return pets;
  } catch (error) {
    console.error("Error fetching pets:", error.message);
    throw error;
  }
};
