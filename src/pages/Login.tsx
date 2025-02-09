import Rings from "../assets/Rings.png"
import { NotepadText } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoginPage from "../assets/LoginPage.png"
import GoogleLogo from "../assets/GoogleLogo.png"

const Login = () => {
    return (
        <>
            <div className="hidden lg:grid grid-cols-2 justify-center h-screen items-center gap-10">
                <div className="flex flex-col justify-center gap-4 px-40">
                    <h1 className="text-2xl flex items-center gap-2 text-primary font-semibold"><NotepadText size={30} />TaskBuddy</h1>
                    <p>Streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
                    <Button className="bg-black text-white rounded-xl hover:bg-black/80" >
                        <img src={GoogleLogo} />Continue with Google
                    </Button>
                </div>
                <div className="hidden md:block">
                    <img src={LoginPage} />
                </div>
            </div>
            <div className="flex h-screen flex-col gap-5 justify-center items-center lg:hidden relative p-4">
                <img src={Rings} className="absolute -top-20 -right-10" />
                <img src={Rings} className="absolute top-28 -left-28" />
                <h1 className="text-2xl flex justify-center items-center gap-2 text-primary font-bold"><NotepadText size={30} />TaskBuddy</h1>
                <p className="text-center font-semibold text-sm">Streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
                <Button className="bg-black text-white rounded-xl hover:bg-black/80" >
                    <img src={GoogleLogo} />Continue with Google
                </Button>
                <img src={Rings} className="absolute bottom-20" />
            </div>
        </>
    )
}

export default Login