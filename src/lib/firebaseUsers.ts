import { auth, db } from "@/lib/firebase";
import type { User } from "@/types/User";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  child,
  get,
  ref,
  remove,
  serverTimestamp,
  set,
  update,
} from "firebase/database";

const USERS_REF = "users";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export const registerAndCreateUser = async (
  data: RegisterFormData
): Promise<void> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  const user = userCredential.user;

  if (data.name) {
    await updateProfile(user, { displayName: data.name });
  }

  const userRef = ref(db, `users/${user.uid}`);
  const newUser: User = {
    id: user.uid,
    name: data.name || "",
    email: data.email,
    role: "customer",
    isActive: true,
  };

  await set(userRef, {
    ...newUser,
    createdAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
  });
};

export const updateUser = async (user: User) => {
  if (!user.id) throw new Error("User ID is required for update");
  const userRef = ref(db, `${USERS_REF}/${user.id}`);
  await update(userRef, user);
};

export const deleteUser = async (id: string) => {
  // Delete from Realtime Database
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
