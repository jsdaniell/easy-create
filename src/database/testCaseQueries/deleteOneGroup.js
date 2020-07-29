import { firestore } from "../../firebase";

export async function deleteOneGroup({ setState, user, collectionName }) {
  const groupsRef = firestore.collection(`users/${user}/testsGroups`);

  try {
    await groupsRef
      .doc(collectionName)
      .collection("tests")
      .get()
      .then(snap => {
        snap.forEach(doc => {
          doc.ref.delete();
        });
      });

    await groupsRef.doc(collectionName).delete();

    setState();
  } catch (e) {
    console.log(e);
  }
}
