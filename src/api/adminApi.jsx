import { account, databases } from "./appwrite"

export const getAllUsers = async () => {
    const response = await databases.listDocuments(
      process.env.REACT_APP_DB_ID,  // Database ID
      process.env.REACT_APP_USERS_ID, // Users Collection ID
    );
    return response.documents;
}

export const approveOrganization = async (orgId,status) => {
        // Fetch the user document by its ID
        const Orgresponse = await databases.getDocument(
            process.env.REACT_APP_DB_ID,  // Database ID
            process.env.REACT_APP_USERS_ID, // Users Collection ID
            orgId  // The unique ID of the user
          );
          if(Orgresponse.status === status) {
            throw new Error("Already in same status!");
          }

          const url = process.env.REACT_APP_PETS_API;
          const jwtToken = await account.createJWT();
              console.log('chaning status',jwtToken.jwt);
              
              const response = await fetch("https://679b8e4754abf196901a.appwrite.global/admin/status", {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken.jwt}`
                },
                body: JSON.stringify({orgId:orgId,status:status})
              });
    
            const data = await response.json();
            console.log('statsu res',data);
    
            if (response.status !== 200) {
              throw new Error(data.error);
            }
          return data;

      
          // Return the updated document
          // return updatedResponse;
}

export const adminDeletePetById = async (petId) => {
  const url = process.env.REACT_APP_PETS_API;
  const jwtToken = await account.createJWT();
      console.log('deleting pet',jwtToken.jwt);
      
      const response = await fetch("https://679b8e4754abf196901a.appwrite.global/admin/pets", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken.jwt}`
        },
        body: JSON.stringify({petId:petId})
      });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.error);
    }
  return data;
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
      // Return the updated document
      return updatedResponse;
  } catch (error) { 
      console.log('error at admin change:',error.message);
      
  }
}
