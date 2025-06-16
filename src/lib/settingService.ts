// lib/settingsService.ts
import { ref, get, set } from "firebase/database";
import { db } from "./firebase";

const SETTINGS_PATH = "settings"; // You can make this dynamic per user/org if needed

export const saveSettings = async (data: any) => {
  await set(ref(db, SETTINGS_PATH), data);
};

export const fetchSettings = async () => {
  const snapshot = await get(ref(db, SETTINGS_PATH));
  return snapshot.exists() ? snapshot.val() : null;
};
