import Rings from "../assets/rings.png"
import { auth } from "@/firebase/config";
import { Input } from "@/components/ui/input";
import handleSignOut from "@/lib/googleSignOut";
import { Button } from "@/components/ui/button";
import Loading from "@/components/common/Loading";
import { ChevronLeft, LogOut } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Loading />
    }
    return (
        <div className="flex h-screen flex-col gap-5 justify-center items-center overflow-hidden p-8 relative bg-[#FFF9F9]">
            <img src={Rings} className="absolute -top-16 -right-16" />
            <img src={Rings} className="absolute top-32 -left-24" />
            <ChevronLeft size={30} className="absolute top-5 left-5 cursor-pointer" onClick={() => window.history.back()} />
            <img src={user?.photoURL || ""} className="w-10 h-10 rounded-full" />
            <h1>User Profile</h1>
            <Input className="md:w-96" readOnly value={user?.email || ""} />
            <Input className="md:w-96" readOnly value={user?.displayName || ""} />
            <Button onClick={() => handleSignOut()} className="md:hidden"><LogOut />Logout</Button>
            <img src={Rings} className="absolute bottom-20" />
        </div>
    )
}

export default Profile