import { ID, Query } from "appwrite";
import { account, databases } from "./appwrite";
import { getCurrentUserData } from "./authApi";

// update more_info of adopter or oganization
export const updateRecord = async (docId, formData) => {
    try {
        console.log('DOC ID:', docId);
        console.log('FORM DATA:', formData);

        // 1. Fetch existing org/adopter document
        const existingDoc = await databases.getDocument(
            process.env.REACT_APP_DB_ID,
            "67c2aab2002b74932550", // Collection ID for org/adopter
            docId
        );

        // 2. Remove system fields (cannot be updated directly)
        const {
            $id,
            $collectionId,
            $databaseId,
            $permissions,
            $createdAt,
            $updatedAt,
            ...oldData
        } = existingDoc;

        // 3. Merge old data with the new formData
        const mergedData = {
            ...oldData,
            ...formData,
        };

        // 4. Update the org/adopter document with merged data
        const response = await databases.updateDocument(
            process.env.REACT_APP_DB_ID,
            "67c2aab2002b74932550",
            docId,
            mergedData
        );

        // 5. Fetch current user from your 'users' collection
        const currentUser = await getCurrentUserData();  // Must return a doc with currentUser.$id

        // 6. Update that user's enum field to "Pending"
        await databases.updateDocument(
            process.env.REACT_APP_DB_ID,
            "6799c8e30016e6194427",     // <-- put the actual users collection ID here
            currentUser.$id,
            { status: "Pending" }          // <-- replace "status" with the exact enum attribute name
        );

        return response;
    } catch (error) {
        console.error("Error updating record:", error);
        throw error;
    }
};

export const getOrgAdopDataById = async (docId) => {
    try {
        const document = await databases.getDocument(
            process.env.REACT_APP_DB_ID,
            "67c2aab2002b74932550", // Your collection ID
            docId
        );
        return document;
    } catch (error) {
        console.error("Error fetching document by ID:", error);
        throw error;
    }
};
