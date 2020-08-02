import { firestore } from "../../firebase";

export async function savingNewUseCase({
                                        success,
                                        errorAlreadyExists,
                                        user,
                                        useCase,
                                        group,
                                        listGroups
                                    }) {
    let ref;

    if (
        listGroups &&
        listGroups.find(item => item.itemId === group).shared === true &&
        !listGroups.find(item => item.itemId === group).owner
    ) {
        ref = listGroups.find(item => item.itemId === group).from;
    } else {
        ref = `users/${user}/useCaseGroups/${group}`;
    }

    const testsCollectionRef = firestore.collection(`${ref}/useCases`);

    let testIfExists = await testsCollectionRef
        .where("title", "==", useCase.title)
        .get();

    if (testIfExists.empty) {
        await testsCollectionRef.doc(useCase.title).set(useCase);
        success();
    } else {
        errorAlreadyExists();
    }
}
