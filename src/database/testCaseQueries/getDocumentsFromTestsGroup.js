import { firestore } from "../../firebase";

export async function getDocumentsFromTestsGroup({
  setState,
  user,
  testGroupId,
  lastItem,
  paginate
}) {
  let docsOfGroupRef;

  console.log(testGroupId);

  if (paginate && paginate === "next") {
    docsOfGroupRef = firestore
      .collection(`users/${user}/testsGroups/${testGroupId}/tests`)
      .orderBy("title")
      .startAfter(lastItem)
      .limit(7);
  } else if (paginate && paginate === "back") {
    docsOfGroupRef = firestore
      .collection(`users/${user}/testsGroups/${testGroupId}/tests`)
      .orderBy("title")
      .endBefore(lastItem)
      .limitToLast(7);
  } else {
    docsOfGroupRef = firestore
      .collection(`users/${user}/testsGroups/${testGroupId}/tests`)
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
