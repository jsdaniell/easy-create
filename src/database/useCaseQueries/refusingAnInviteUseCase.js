import { firestore } from "../../firebase";

export default async function refuseAnInviteUseCase({ setState, user, invite }) {
    await firestore
        .collection("invites")
        .where("from", "==", invite.from)
        .where("useCaseGroupId", "==", invite.useCaseGroupId)
        .where("to", "==", user)
        .get()
        .then(async snap => {
            if (!snap.empty) {
                snap.forEach(doc => {
                    doc.ref.delete();
                });
            }

            setState()
        });
}
