import Rings from "../assets/Rings.png"
import GoogleLogo from "../assets/GoogleLogo.png"
import LoginPage from "../assets/LoginPage.png"
import { NotepadText } from "lucide-react"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "@/lib/googleLogin";

const Login = () => {
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
        } catch (error) {
            console.error("Sign-in failed:", error);
        }
    };

    return (
        <>
            <div className="hidden lg:grid grid-cols-2 justify-center h-screen items-center gap-10 relative overflow-hidden bg-[#FFF9F9]">
                <div className="flex flex-col justify-center gap-4 pl-20 pr-40">
                    <h1 className="text-2xl flex items-center gap-2 text-primary font-semibold"><NotepadText size={30} />TaskBuddy</h1>
                    <p>Streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
                    <Button className="bg-black text-white rounded-xl hover:bg-black/80" onClick={handleSignIn}>
                        <img src={GoogleLogo} />Continue with Google
                    </Button>
                </div>
                <div className="hidden md:block">
                    <img src={LoginPage} className="absolute top-0 -right-80" />
                </div>
            </div>
            <div className="flex h-screen flex-col gap-5 justify-center items-center overflow-hidden lg:hidden relative p-4 bg-[#FFF9F9]">
                <img src={Rings} className="absolute -top-16 -right-16" />
                <img src={Rings} className="absolute top-32 -left-24" />
                <h1 className="text-2xl flex justify-center items-center gap-2 text-primary font-bold"><NotepadText size={30} />TaskBuddy</h1>
                <p className="text-center font-semibold text-sm">Streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
                <Button className="bg-black text-white rounded-xl hover:bg-black/80" onClick={handleSignIn}>
                    <img src={GoogleLogo} />Continue with Google
                </Button>
                <img src={Rings} className="absolute bottom-20" />
            </div>
        </>
    )
}

export default Login