import { firestore } from "../../firebase";

export async function inviteSomeoneToUseCaseGroup({
  setState,
  user,
  collectionName,
  userInvited,
  userNotExistError,
  userInvitedError
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
      .where("useCaseGroupId", "==", collectionName)
      .where("to", "==", userToAdd)
      .get()
      .then(async snap => {
        if (snap.empty) {
          await firestore.collection("invites").add({
            from: user,
            to: userToAdd,
            toEmail: userInvited.email,
            toPermission: userInvited.permission,
            type: "useCaseGroup",
            useCaseGroupId: collectionName,
            message: `You was invited to ${collectionName} use case group!`,
            status: "PENDING"
          });

          setState();
        } else {
          userInvitedError();
        }
      });
  }
}