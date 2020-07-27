import { firestore } from "../../firebase";

export async function getTestsGroups({ setState, user }) {
  const groupsRef = firestore.collection(`users/${user}/testsGroups`);

  let arrayOfGroups = [];

  await groupsRef.get().then(response => {
    response.forEach(item =>
      arrayOfGroups.push({
        itemId: item.id,
        itemLabel: item.data().title
      })
    );
  });

  setState(arrayOfGroups);
}
