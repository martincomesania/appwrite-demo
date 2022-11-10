import { Client, Account, Databases } from 'appwrite';

const API_ENDPOINT = import.meta.env.VITE_APPWRITE_API_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_DB_COLL_ID;

let appwClient;
let appwAccount;
let appwDatabases;

function update () {
  appwClient = new Client()
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID)

  appwAccount = new Account(appwClient);
  appwDatabases = new Databases(appwClient);
}

update(); //In case the unsubscription to an event doesn't work

export * from 'appwrite';
export { appwClient, appwAccount, appwDatabases, update, DB_ID, COLLECTION_ID };