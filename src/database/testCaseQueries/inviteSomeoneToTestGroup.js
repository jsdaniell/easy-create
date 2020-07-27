import { firestore } from "../../firebase";

export async function inviteSomeoneToTestGroup({
  setState,
  user,
  collectionName,
  userInvited,
  userNotExistError
}) {
  let userToAdd;

  await firestore
    .collection("users")
    .where("email", "==", userInvited.email)
    .get()
    .then(snap => {
      if (!snap.empty) {
        snap.forEach(doc => {
          userToAdd = doc.data().uid;
        });
      } else {
        if (userNotExistError) return userNotExistError();
      }
    });

  if (userToAdd) {
    await firestore
      .collection("invites")
      .where("from", "==", user)
      .where("testGroupId", "==", collectionName)
      .where("to", "==", userToAdd)
      .get()
      .then(async snap => {
        if (snap.empty) {
          await firestore.collection("invites").add({
            from: user,
            to: userToAdd,
            toEmail: userInvited.email,
            toPermission: userInvited.permission,
            type: "testGroup",
            testGroupId: collectionName,
            message: `You was invited to ${collectionName} group test!`,
            status: "PENDING"
          });

          setState()
        } else {
          console.log("Already have a invite");
        }
      });
  }
}
