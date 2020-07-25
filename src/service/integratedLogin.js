import { auth } from "../firebase";
import firebase from "firebase";
import { insertingNewUserOnDatabase } from "../database/userQueries/insertingNewUser";
import returnStoreAndPersistor from "../redux";
const provider = new firebase.auth.GoogleAuthProvider();
export async function signInWithGoogle() {
  const { store } = returnStoreAndPersistor();

  auth.signInWithPopup(provider).then(data => {
    localStorage.setItem("logged", JSON.stringify(data));

    const userLogged = JSON.parse(localStorage.getItem("logged")).user;

    insertingNewUserOnDatabase(userLogged);

    store.dispatch({
      type: "SET_USER_UID",
      payload: userLogged.uid
    });

    localStorage.removeItem("logged");

    window.location.reload();
  });
}
