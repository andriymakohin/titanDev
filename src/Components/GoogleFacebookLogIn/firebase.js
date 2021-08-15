import firebase from "firebase";

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

//Google Authentication
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const GoogleAuth = firebase.auth();

//Facebook Authentication
export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
export const FacebookAuth = firebase.auth();


export const auth = firebase.auth();

export default firebase;
