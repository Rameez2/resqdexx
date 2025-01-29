import { Client,Databases,Account,Storage } from 'appwrite';
const client = new Client();
client.setProject(process.env.REACT_APP_PROJECT_ID);
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client)

export {account,databases,storage,client};