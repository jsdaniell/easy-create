import { firestore } from "../../firebase";

export async function acceptingAnInvite({ setState, user, invite }) {
  console.log(invite);

  await firestore
    .collection("invites")
    .where("from", "==", invite.from)
    .where("testGroupId", "==", invite.testGroupId)
    .where("to", "==", user)
    .get()
    .then(async snap => {
      if (!snap.empty) {
        let docRef = await firestore
          .collection(`users/${invite.from}/testsGroups/`)
          .doc(invite.testGroupId);

        let meRef = await firestore.collection(`users/`).doc(user);

        let docSharedRef = meRef
          .collection("sharedTestsGroups")
          .doc(invite.testGroupId);

        docSharedRef.set({
          ref: `users/${invite.from}/testsGroups/${invite.testGroupId}`
        });

        try {
          docRef.get().then(doc => {
            if (doc.exists) {
              docRef.update({
                sharedWith: [
                  ...doc.data().sharedWith,
                  {
                    user: user,
                    permission: invite.toPermission ? "edit" : "see"
                  }
                ]
              });
            }
          });
        } catch (e) {
          console.log(e);
        }

        snap.forEach(doc => {
          doc.ref.delete();
        });
      }

      setState();
    });
}
