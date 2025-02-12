import { auth } from "@/firebase/config";

const handleSignOut = async () => {
  try {
    await auth.signOut();
    sessionStorage.clear();
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

export default handleSignOut;
