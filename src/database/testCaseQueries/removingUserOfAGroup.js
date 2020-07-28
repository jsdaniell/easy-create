import { firestore } from "../../firebase";

export async function removingUserOfAGroup({  user, userToRemove, group }) {



    let docRef = await firestore.doc(`users/${user}/testsGroups/${group}`)

    await docRef.get().then((doc)=>{
        let newArr = doc.data().sharedWith.filter(item => item.user !== userToRemove.userUid)

        docRef.update({
            ...doc.data(),
            sharedWith: newArr
        })

        console.log({
            ...doc.data(),
            sharedWith: newArr
        })
    })

   await firestore.doc(`users/${userToRemove}/sharedTestsGroups/${group}`).delete();



}
