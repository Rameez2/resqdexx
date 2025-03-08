import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

export const getPostsByAdopterId = async (adopterId) => {
    try {
        const response = await databases.listDocuments(
            process.env.REACT_APP_DB_ID,
            process.env.REACT_APP_ANIMALS_ID,
            [Query.equal("organization_id", adopterId)]
        );
        return response;
    } catch (error) {
        console.error("Error fetching posts by organization_id:", error);
        throw error;
    }
};

export const deletePostById = async (postId) => {
    try {
        const response = await databases.deleteDocument(
            process.env.REACT_APP_DB_ID,
            process.env.REACT_APP_ANIMALS_ID,
            postId
        );
        return response;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};


export const adopterPost = async (data) => {
    console.log('creating post....');

    const postData = {
        name: "",
        age: 1,
        contact: "",
        breed: "",
        gender: "",
        size: "",
        temperament: "",
        location: "",
        main_image: "",
        bio: "",
        category: "Other",
        organization_id: data.id,
        content: data.content,
        post_by: "Adopter",
        // post_by: "Organization" 
    };

    try {
        const response = await databases.createDocument(
            process.env.REACT_APP_DB_ID,   // Database ID
            process.env.REACT_APP_ANIMALS_ID, // Animals Collection ID
            ID.unique(),                    // Generates a unique document ID
            postData
        );
        console.log("POST created successfully:", response);
        return response;
    } catch (error) {
        console.error("Error upload post:", error);
        throw error;
    }
};