import { firestore } from "../../firebase";

export async function getInvitesUseCasesGroupsFromMe({
  setState,
  user,
  collectionName
}) {
  let invites = [];

  const invitesRef = await firestore
    .collection("invites")
    .where("from", "==", user)
    .where("useCaseGroupId", "==", collectionName)
    .get()
    .then(snap => {
      if (!snap.empty) {
        snap.forEach(doc => {
          invites.push(doc.data());
        });
      }
    });

  setState(invites);
}
