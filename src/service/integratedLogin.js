import { auth } from "../firebase";
import firebase from "firebase";
import { insertingNewUserOnDatabase } from "../database/userQueries/insertingNewUser";
const provider = new firebase.auth.GoogleAuthProvider();
export async function signInWithGoogle() {
  auth.signInWithPopup(provider).then(data => {
    localStorage.setItem("logged", JSON.stringify(data));

    const userLogged = JSON.parse(localStorage.getItem("logged")).user;

    insertingNewUserOnDatabase(userLogged);

    // data.user to insert document on firebase users
  });
}
