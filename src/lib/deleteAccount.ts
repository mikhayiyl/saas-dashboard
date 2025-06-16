import { getAuth, deleteUser } from "firebase/auth";
// import { getDatabase, ref, remove } from "firebase/database";

// export async function resetBusinessData(userId: string) {
//   const db = getDatabase();
//   const pathsToClear = [
//     `products/${userId}`,
//     `orders/${userId}`,
//     `users/${userId}`,
//   ];

//   const promises = pathsToClear.map((path) => remove(ref(db, path)));

//   await Promise.all(promises);
// }

export async function deleteUserAccount() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    await deleteUser(user);
  } else {
    throw new Error("No authenticated user found.");
  }
}
