import { firestore } from "../../firebase";

export async function addNewUseCaseGroup({
  setState,
  user,
  newCollectionName,
  errorAlreadyExists
}) {
  const groupsRef = firestore.collection(`users/${user}/useCaseGroups`);

  const collRef = await groupsRef.doc(newCollectionName).get();

  if (!collRef.exists) {
    await groupsRef
      .doc(newCollectionName)
      .set({ title: newCollectionName, sharedWith: [] });

    await groupsRef.doc(newCollectionName).collection("useCases");

    setState();
  } else {
    errorAlreadyExists();
  }
}
