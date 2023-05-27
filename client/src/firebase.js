// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXvDL3AYx0-KoXUXHJ8DZxK8nJqzKyR5Y",
  authDomain: "react-community-d17d4.firebaseapp.com",
  projectId: "react-community-d17d4",
  storageBucket: "react-community-d17d4.appspot.com",
  messagingSenderId: "836986720402",
  appId: "1:836986720402:web:9c17ffbd031ad69e29964b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
