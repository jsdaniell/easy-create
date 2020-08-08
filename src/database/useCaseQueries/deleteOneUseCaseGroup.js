import { firestore } from "../../firebase";

export async function deleteOneUseCaseGroup({ setState, user, collectionName }) {
    const groupsRef = firestore.collection(`users/${user}/useCaseGroups`);

    try {
        await groupsRef
            .doc(collectionName)
            .collection("useCases")
            .get()
            .then(snap => {
                snap.forEach(doc => {
                    doc.ref.delete();
                });
            });

        await groupsRef.doc(collectionName).delete();

        setState();
    } catch (e) {
        console.log(e);
    }
}
