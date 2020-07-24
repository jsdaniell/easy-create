import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPBexuJktp2lD3kinXzyT-7TOxL4eaaIg",
  authDomain: "devdatatools.firebaseapp.com",
  databaseURL: "https://devdatatools.firebaseio.com",
  projectId: "devdatatools",
  storageBucket: "devdatatools.appspot.com",
  messagingSenderId: "927462671821",
  appId: "1:927462671821:web:dedb919b2fb03553167084",
  measurementId: "G-KMZYVLK213"
};

const provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider).then(data => {
    localStorage.setItem("logged", JSON.stringify(data));
  });
};
