import { auth } from "../firebase";
import firebase from "firebase";
import returnStoreAndPersistor from "../redux";
import { api } from "./api";
const provider = new firebase.auth.GoogleAuthProvider();

export async function signInWithGoogle({ success }) {
  const { store } = returnStoreAndPersistor();

  auth.signInWithPopup(provider).then(async data => {
    const { displayName, uid, apiKey, email, photoURL } = await data.user;

    await api
      .post(
        `/login`,
        {
          displayName,
          uid,
          apiKey,
          email,
          photoURL
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(data => {
        store.dispatch({
          type: "SET_USER_UID",
          payload: data.data
        });

        if (success) success();
      });
  });
}
