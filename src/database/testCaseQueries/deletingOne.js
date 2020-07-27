import { firestore } from "../../firebase";

export async function deletingOneTest({
  success,

  user,
  test,
  group,
  error,
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
  let testIfExists = await testsCollectionRef.doc(test.title).get();

  if (testIfExists.exists) {
    await testsCollectionRef.doc(test.title).delete();
    success();
  }
}
