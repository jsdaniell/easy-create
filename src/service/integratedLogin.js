import { auth } from "../firebase";
import firebase from "firebase";
import { insertingNewUserOnDatabase } from "../database/userQueries/insertingNewUser";
import returnStoreAndPersistor from "../redux";
const provider = new firebase.auth.GoogleAuthProvider();

export async function signInWithGoogle({
  success,
  newUserInsert,
  newDataModel
}) {
  const { store } = returnStoreAndPersistor();

  auth.signInWithPopup(provider).then(async data => {
    localStorage.setItem("logged", JSON.stringify(data));

    const userLogged = JSON.parse(localStorage.getItem("logged")).user;

    await insertingNewUserOnDatabase(userLogged, newUserInsert, newDataModel);

    store.dispatch({
      type: "SET_USER_UID",
      payload: userLogged.uid
    });

    localStorage.removeItem("logged");
    if (success) success();
  });
}
