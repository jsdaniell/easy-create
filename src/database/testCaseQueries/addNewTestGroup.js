import { firestore } from "../../firebase";

export async function addNewTestGroup({ setState, user, newCollectionName, errorAlreadyExists }) {
    const groupsRef = firestore.collection(`users/${user}/testsGroups`);

    const collRef = await groupsRef.doc(newCollectionName).get()

    if(!collRef.exists){
        await groupsRef.doc(newCollectionName).set({title: newCollectionName})

        await groupsRef.doc(newCollectionName).collection('tests')

        setState()
    } else {
        errorAlreadyExists()
    }



}
