import { firestore } from "../../firebase";

export async function deletingOneUseCase({
                                          success,

                                          user,
                                          useCase,
                                          group,
                                          error,
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
    let testIfExists = await testsCollectionRef.doc(useCase.title).get();

    if (testIfExists.exists) {
        await testsCollectionRef.doc(useCase.title).delete();
        success();
    }
}
