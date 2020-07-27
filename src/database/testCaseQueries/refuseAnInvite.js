import { firestore } from "../../firebase";

export default async function refuseAnInvite({ setState, user, invite }) {
  await firestore
    .collection("invites")
    .where("from", "==", invite.from)
    .where("testGroupId", "==", invite.testGroupId)
    .where("to", "==", user)
    .get()
    .then(async snap => {
      if (!snap.empty) {
        snap.forEach(doc => {
          doc.ref.delete();
        });
      }
    });
}
