import { firestore } from "../../firebase";

export async function getDocumentsFromTestsGroup({
  setState,
  user,
  testGroupId,
  lastItem,
  paginate,
  groups
}) {
  let docsOfGroupRef;

  let ref;

  if (
    groups.find(item => item.itemId === testGroupId).shared === true &&
    !groups.find(item => item.itemId === testGroupId).owner
  ) {
    ref = groups.find(item => item.itemId === testGroupId).from;
  } else {
    ref = `users/${user}/testsGroups/${testGroupId}`;
  }

  if (paginate && paginate === "next") {
    docsOfGroupRef = firestore
      .collection(`${ref}/tests`)
      .orderBy("title")
      .startAfter(lastItem)
      .limit(7);
  } else if (paginate && paginate === "back") {
    docsOfGroupRef = firestore
      .collection(`${ref}/tests`)
      .orderBy("title")
      .endBefore(lastItem)
      .limitToLast(7);
  } else {
    docsOfGroupRef = firestore
      .collection(`${ref}/tests`)
      .orderBy("title")
      .startAfter(0)
      .limit(7);
  }

  let arrayOfDocs = [];

  await docsOfGroupRef.get().then(response => {
    response.forEach(item => arrayOfDocs.push(item.data()));
  });

  console.log(arrayOfDocs);

  setState(arrayOfDocs);
}
