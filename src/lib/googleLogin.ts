import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";

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
