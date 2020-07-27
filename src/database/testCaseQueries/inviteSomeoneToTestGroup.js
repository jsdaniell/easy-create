import { firestore } from "../../firebase";

export async function inviteSomeoneToTestGroup({ setState, user, collectionName }) {

    // TODO: Verify if user exists

    // TODO: If yes, create a invite on invite table to his, autoID

    const groupsRef = firestore.collection(`users/${user}/testsGroups`);

    try {
        await groupsRef.doc(collectionName).delete()
        setState()
    } catch (e) {
        console.log(e)
    }




}
