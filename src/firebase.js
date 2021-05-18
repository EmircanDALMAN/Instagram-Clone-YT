import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB0n-ORFa4X8ZPSghLGQYcm4eNzyUYDYzM",
  authDomain: "instagram-clone-react-614d8.firebaseapp.com",
  projectId: "instagram-clone-react-614d8",
  storageBucket: "instagram-clone-react-614d8.appspot.com",
  messagingSenderId: "797042424344",
  appId: "1:797042424344:web:a584b76a83c249e4c9216d",
  measurementId: "G-X1SQ1YCRCW",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
