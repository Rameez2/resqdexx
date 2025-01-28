import { Client,Databases,Account,ID } from 'appwrite';
const client = new Client();
client.setProject(process.env.REACT_APP_PROJECT_ID);
const account = new Account(client);
const databases = new Databases(client);

export {account,databases,client};