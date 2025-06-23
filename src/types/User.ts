export type User = {
  id?: string; // Firebase Auth UID
  name?: string; // username
  email: string; // Auth email
  phone?: string; // Optional contact phone
  address?: string; // Optional default shipping address

  // role?: "customer" | "admin" | "staff" |"undefined"; // Role for dashboard permission
  role?: string; // Role for dashboard permission
  createdAt?: number; // Timestamp of account creation
  lastSeen?: number; // Timestamp of last activity

  isActive?: boolean; // Used for tracking currently online
  avatarUrl?: string; // Optional profile picture

  //  custom fields (optional)
  loyaltyPoints?: number; // For reward systems
  newsletterOptIn?: boolean; // Marketing opt-in flag
};

export type UserInput = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: string;
  lastSeen: number;
};
