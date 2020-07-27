import { firestore } from "../../firebase";

export async function savingNewTest({
  success,
  errorAlreadyExists,
  user,
  test,
  group,
  listGroups
}) {
  let ref;

  if (
    listGroups &&
    listGroups.find(item => item.itemId === group).shared === true &&
    !listGroups.find(item => item.itemId === group).owner
  ) {
    ref = listGroups.find(item => item.itemId === group).from;
  } else {
    ref = `users/${user}/testsGroups/${group}`;
  }

  const testsCollectionRef = firestore.collection(`${ref}/tests`);

  let testIfExists = await testsCollectionRef
    .where("title", "==", test.title)
    .get();

  if (testIfExists.empty) {
    await testsCollectionRef.doc(test.title).set(test);
    success();
  } else {
    errorAlreadyExists();
  }
}
