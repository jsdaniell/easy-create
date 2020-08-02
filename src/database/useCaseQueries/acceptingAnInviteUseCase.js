import { firestore } from "../../firebase";

export async function acceptingAnInviteUseCase({ setState, user, invite }) {


    await firestore
        .collection("invites")
        .where("from", "==", invite.from)
        .where("useCaseGroupId", "==", invite.useCaseGroupId)
        .where("to", "==", user)
        .get()
        .then(async snap => {
            if (!snap.empty) {
                let docRef = await firestore
                    .collection(`users/${invite.from}/useCaseGroups/`)
                    .doc(invite.testGroupId);

                let meRef = await firestore.collection(`users/`).doc(user);

                let docSharedRef = meRef
                    .collection("sharedTestsGroups")
                    .doc(invite.useCaseGroupId);

                docSharedRef.set({
                    ref: `users/${invite.from}/useCaseGroups/${invite.useCaseGroupId}`
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
