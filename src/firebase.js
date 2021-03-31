import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCjuARY5HvyrZZAZm57J8oB4rl0NFIdtns",
  authDomain: "peni-a436d.firebaseapp.com",
  projectId: "peni-a436d",
  storageBucket: "peni-a436d.appspot.com",
  messagingSenderId: "942790035505",
  appId: "1:942790035505:web:593a19b126de9445cced10",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
