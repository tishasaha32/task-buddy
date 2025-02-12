import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};
