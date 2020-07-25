import { firestore } from "../../firebase";

export async function insertingNewUserOnDatabase(
  user,
  newUserInsert,
  newDataModel
) {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, uid, apiKey, email, photoURL } = user;

    try {
      await userRef.set({
        displayName,
        uid,
        apiKey,
        email,
        photoURL
      });

      userRef.collection("testsGroups").doc("default");

      const defaultRef = userRef.collection("testsGroups").doc("default");

      await defaultRef.set({ title: "Default" });

      defaultRef
        .collection("tests")
        .doc(newDataModel.title)
        .set({ ...newDataModel });

      newUserInsert(newDataModel);
    } catch (error) {
      console.error("Error creating user document", error);
    }
  } else {
    console.log("User exists");
  }

  return getUserDocument(user.uid);
}

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
