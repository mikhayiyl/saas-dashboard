// src/lib/firebaseUsers.ts
import type { User } from "@/components/users/EditUserModal";
import { db } from "@/lib/firebase";
import { ref, set, push, update, remove, get, child } from "firebase/database";

const USERS_REF = "users";

// Add user
export const addUser = async (user: Omit<User, "id">) => {
  const newUserRef = push(ref(db, "users"));
  const userWithId: User = {
    ...user,
    id: newUserRef.key || "", // Make sure id is never undefined
  };
  await set(newUserRef, userWithId);
};

export const updateUser = async (user: User) => {
  if (!user.id) throw new Error("User ID is required for update");
  const userRef = ref(db, `${USERS_REF}/${user.id}`);
  await update(userRef, user);
};

export const deleteUser = async (id: number | string) => {
  const userRef = ref(db, `${USERS_REF}/${id}`);
  await remove(userRef);
};

export const fetchUsers = async (): Promise<User[]> => {
  const snapshot = await get(child(ref(db), USERS_REF));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.entries(data).map(([id, val]: any) => ({
      id,
      ...val,
    }));
  }
  return [];
};
