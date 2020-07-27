import { firestore } from "../../firebase";

export async function getTestsGroups({ setState, user }) {
  const groupsRef = firestore.collection(`users/${user}/testsGroups`);

  const sharedGroupsRef = firestore.collection(
    `users/${user}/sharedTestsGroups`
  );

  let arrayOfGroups = [];

  await groupsRef.get().then(response => {
    response.forEach(item =>
      arrayOfGroups.push({
        itemId: item.id,
        itemLabel: item.data().title,
        permission: "edit",
        shared: Boolean(item.data().sharedWith.length),
        owner: true
      })
    );
  });

  await sharedGroupsRef.get().then(response => {
    response.forEach(async item => {
      let groupDocRef = await firestore.doc(item.data().ref);

      console.log("refShared: ", item.data().ref);

      groupDocRef.get().then(dt => {
        if (dt.data().sharedWith.find(item => item.user === user)) {
          arrayOfGroups.push({
            itemId: dt.id,
            itemLabel: dt.data().title,
            permission: dt.data().sharedWith.find(item => item.user === user)
              .permission,
            shared: true,
            from: item.data().ref
          });
        }
      });
    });
  });

  console.log("arrays: ", arrayOfGroups);

  setState(arrayOfGroups);
}
