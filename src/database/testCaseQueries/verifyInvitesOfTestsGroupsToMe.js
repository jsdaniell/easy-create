import { firestore } from "../../firebase";

export async function verifyInvitesOfTestsGroupsToMe({
  setState,

  user
}) {
  let invitesToMe = [];

  await firestore
    .collection("invites")
    .where("to", "==", user)
    .get()
    .then(snap => {
      snap.forEach(doc => {
        invitesToMe.push(doc.data());
      });

      console.log(invitesToMe);

      setState(invitesToMe);
    });
}
