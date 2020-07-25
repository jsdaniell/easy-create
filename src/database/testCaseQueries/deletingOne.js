import { firestore } from "../../firebase";

export async function deletingOneTest({
                                        success,

                                        user,
                                        test,
                                        group,
    error
                                    }) {
    const testsCollectionRef = firestore.collection(
        `users/${user}/testsGroups/${group}/tests`
    );

    let testIfExists = await testsCollectionRef
        .doc(test.title).get()


    if(testIfExists.exists){
        testsCollectionRef.doc(test.title).delete()
        success()
    }


}
