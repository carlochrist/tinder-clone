import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBSRXYvh2xmpAv7V0YW5VAoQzZbj9l5wtU",
  authDomain: "tinder-clone-488fa.firebaseapp.com",
  databaseURL: "https://tinder-clone-488fa.firebaseio.com",
  projectId: "tinder-clone-488fa",
  storageBucket: "tinder-clone-488fa.appspot.com",
  messagingSenderId: "11725487099",
  appId: "1:11725487099:web:7eb6f1e1f287db2a17e95e",
  measurementId: "G-GVSN6EBX08",
});

const database = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebaseApp, database, auth, storage };
