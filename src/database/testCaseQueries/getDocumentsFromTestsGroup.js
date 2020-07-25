import { firestore } from "../../firebase";

export async function getDocumentsFromTestsGroup({ setState, user, testGroupId }) {
    const docsOfGroupRef = firestore.collection(`users/${user}/testsGroups/${testGroupId}/tests`);

    let arrayOfDocs = [];



    await docsOfGroupRef.get().then(response => {
        response.forEach(item =>
            arrayOfDocs.push(item.data())
        );
    });

    setState(arrayOfDocs)
}
