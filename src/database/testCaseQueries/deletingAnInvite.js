import { firestore } from "../../firebase";

export async function deletingAnInvite({
  setState,

  invite
}) {
  await firestore
    .collection("invites")
    .where("from", "==", invite.from)
    .where("testGroupId", "==", invite.testGroupId)
    .where("to", "==", invite.to)
    .get()
    .then(snap => {
      snap.forEach(doc => {
        doc.ref.delete();
      });

      setState();
    });
}
