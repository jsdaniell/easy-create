import { firestore } from "../../firebase";

export async function savingNewTest({
  success,
  errorAlreadyExists,
  user,
  test,
  group
}) {
  const testsCollectionRef = firestore.collection(
    `users/${user}/testsGroups/${group}/tests`
  );

  let testIfExists = await testsCollectionRef
    .where("title", "==", test.title)
    .get();

  if(testIfExists.empty){
      testsCollectionRef.doc(test.title).set(test);
      success()
  } else {
      errorAlreadyExists()
  }


}
