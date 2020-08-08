import { firestore } from "../../firebase";

export async function getDocumentsFromUseCasesGroup({
  setState,
  user,
  useCasesGroupId,
  lastItem,
  paginate,
  groups
}) {
  let docsOfGroupRef;

  let ref;

  if (
    groups.find(item => item.itemId === useCasesGroupId) &&
    groups.find(item => item.itemId === useCasesGroupId).shared === true &&
    !groups.find(item => item.itemId === useCasesGroupId).owner
  ) {
    ref = groups.find(item => item.itemId === useCasesGroupId).from;
  } else {
    ref = `users/${user}/useCaseGroups/${useCasesGroupId}`;
  }

  if (paginate && paginate === "next") {
    docsOfGroupRef = firestore
      .collection(`${ref}/useCases`)
      .orderBy("title")
      .startAfter(lastItem)
      .limit(7);
  } else if (paginate && paginate === "back") {
    docsOfGroupRef = firestore
      .collection(`${ref}/useCases`)
      .orderBy("title")
      .endBefore(lastItem)
      .limitToLast(7);
  } else {
    docsOfGroupRef = firestore
      .collection(`${ref}/useCases`)
      .orderBy("title")
      .startAfter(0)
      .limit(7);
  }

  let arrayOfDocs = [];

  await docsOfGroupRef.get().then(response => {
    response.forEach(item => arrayOfDocs.push(item.data()));
  });

  setState(arrayOfDocs);
}
