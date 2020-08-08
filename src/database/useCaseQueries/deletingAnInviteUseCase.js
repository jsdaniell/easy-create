import { firestore } from "../../firebase";

export async function deletingAnInviteUseCase({
                                           setState,

                                           invite
                                       }) {
    await firestore
        .collection("invites")
        .where("from", "==", invite.from)
        .where("useCaseGroupId", "==", invite.useCaseGroupId)
        .where("to", "==", invite.to)
        .get()
        .then(snap => {
            snap.forEach(doc => {
                doc.ref.delete();
            });

            setState();
        });
}
