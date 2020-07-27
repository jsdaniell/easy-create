import { firestore } from "../../firebase";

export async function getUsersOfThisGroup({
  setState,
  user,
  testGroupId,
  groups
}) {
  let groupRef;

  let ref;

  if (
    groups.find(item => item.itemId === testGroupId).shared === true &&
    !groups.find(item => item.itemId === testGroupId).owner
  ) {
    ref = groups.find(item => item.itemId === testGroupId).from;
  } else {
    ref = `users/${user}/testsGroups/${testGroupId}`;
  }

  groupRef = firestore.doc(`${ref}`);

  let users = [];

  await groupRef.get().then(doc => {
    doc.data().sharedWith.forEach(async (sh, ind) => {
      let us = await firestore.doc(`users/${sh.user}`);

      await us.get().then(async user => {
        users.push({
          userUid: user.data().uid,
          userEmail: user.data().email,
          userPermission: sh.permission
        });

        if (ind === doc.data().sharedWith.length - 1) {
          setState(users);
        }
      });
    });
  });
}
