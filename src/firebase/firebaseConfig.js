import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBhcyiqR3sylrhsbgdR45Jk9aoeXf9opRU",
  authDomain: "drive-clone-d3926.firebaseapp.com",
  projectId: "drive-clone-d3926",
  storageBucket: "drive-clone-d3926.appspot.com",
  messagingSenderId: "999629823349",
  appId: "1:999629823349:web:e61515f690bc5fd193473c",
});

export const auth = app.auth();
const firestore = app.firestore();
export const storage = app.storage();
export const database = {
  folder: firestore.collection("folder"),
  files: firestore.collection("files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  currentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};
export default app;

// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// appId: process.env.REACT_APP_FIREBASE_APP_ID,
