import { firestore } from "../../firebase";

export async function changingUserPermissionUseCase({
         setState,
         userToChangePermission,
         user,
         useCaseGroupId
       }) {
         const groupRef = firestore.doc(
           `users/${user}/useCaseGroups/${useCaseGroupId}`
         );

         groupRef.get().then(dt => {
           if (
             dt
               .data()
               .sharedWith.find(
                 us => us.user === userToChangePermission.userUid
               )
           ) {
             let oldArray = dt.data().sharedWith;

             let newArray = oldArray.filter(
               item => item.user !== userToChangePermission.userUid
             );

             newArray.push({
               user: userToChangePermission.userUid,
               permission:
                 userToChangePermission.userPermission === "see"
                   ? "edit"
                   : "see"
             });

             groupRef.update({
               ...dt.data(),
               sharedWith: newArray
             });

             setState();
           }
         });
       }
