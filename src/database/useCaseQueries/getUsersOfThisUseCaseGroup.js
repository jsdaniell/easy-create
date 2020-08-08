import { firestore } from "../../firebase";

export async function getUsersOfThisUseCaseGroup({
  setState,
  user,
  useCaseGroupId,
  groups
}) {
  let groupRef;

  let ref;

  if (
    groups.find(item => item.itemId === useCaseGroupId) &&
    groups.find(item => item.itemId === useCaseGroupId).shared === true &&
    !groups.find(item => item.itemId === useCaseGroupId).owner
  ) {
    ref = groups.find(item => item.itemId === useCaseGroupId).from;
  } else {
    ref = `users/${user}/useCaseGroups/${useCaseGroupId}`;
  }

  groupRef = firestore.doc(`${ref}`);

  let users = [];

  await groupRef.get().then(doc => {
    if (doc.data().sharedWith) {
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
    }
  });
}
