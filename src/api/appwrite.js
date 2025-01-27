import { Client,Databases,ID } from 'appwrite';
const client = new Client();
client.setProject(process.env.REACT_APP_PROJECT_ID);

export {client};