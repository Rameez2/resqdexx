import { ID, Query } from "appwrite";
import { databases } from "./appwrite"

export const sendMessage = async (senderId,recieverId,content) => {
    try {
        const document = await databases.createDocument(
          process.env.REACT_APP_DB_ID,
          "679b5d920001b01e6659",
          ID.unique(), // Unique ID for the message
          {
            sender: senderId,  // Sender ID (can be the authenticated user's ID)
            reciever:recieverId,
            content: content,
          }
        );
      } catch (error) {
        console.error('Error sending message:', error);
      }
}

export const getMessages = async (senderId, recieverId) => {
  try {
    // Simple check to ensure both senderId and recieverId are provided
    if (!senderId || !recieverId) {
      console.error('Sender ID or Receiver ID is missing');
      return []; // Return empty array if either ID is missing
    }

    const messageDocuments = await databases.listDocuments(
      process.env.REACT_APP_DB_ID,
      "679b5d920001b01e6659",
      [
        Query.equal('sender', senderId), // Filtering messages by senderId
        Query.equal('reciever', recieverId) // Filtering messages by recieverId
      ]
    );

    return messageDocuments.documents;
  } catch (error) {
    console.error('Error getting messages:', error);
    return []; // Return empty array in case of error
  }
};
