// src/authFunctions.ts
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User Info:", result.user);
    return result.user; // Returns user info
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

// Function to sign out
export const signOutFromGoogle = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error during sign-out:", error);
    throw error;
  }
};
