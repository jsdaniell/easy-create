import { firestore } from "../../firebase";

export async function verifyInvitesOfUseCaseGroupsToMe({
                                                         setState,

                                                         user
                                                     }) {
    let invitesToMe = [];

    await firestore
        .collection("invites")
        .where("to", "==", user).where('type', "==", "useCaseGroup")
        .get()
        .then(snap => {
            snap.forEach(doc => {
                invitesToMe.push(doc.data());
            });



            setState(invitesToMe);
        });
}
