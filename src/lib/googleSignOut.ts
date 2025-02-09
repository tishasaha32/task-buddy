import { auth } from "@/firebase/config";

const handleSignOut = async () => {
  try {
    await auth.signOut();
    sessionStorage.clear(); // Clear any session-related data
    console.log("Session cleared. User signed out successfully.");
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

export default handleSignOut;
