import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // ✅ Use Appwrite Cloud URL
  .setProject(process.env.REACT_APP_PROJECT_ID); // ✅ Use your project ID from environment variables

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { account, databases, storage, client };
