import { firestore } from "../../firebase";

export async function deleteOneGroup({ setState, user, collectionName }) {
    const groupsRef = firestore.collection(`users/${user}/testsGroups`);

    try {
        await groupsRef.doc(collectionName).delete()
        setState()
    } catch (e) {
      console.log(e)
    }




}
