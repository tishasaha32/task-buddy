import { Link } from "react-router-dom"
import { auth } from "@/firebase/config"
import { NotepadText, UserRound } from "lucide-react"
import { useAuthState } from "react-firebase-hooks/auth"

const TopNavbar = () => {
    const [user] = useAuthState(auth)

    return (
        <div className="flex items-center justify-between md:bg-background p-4 md:p-0 bg-[#FAEEFC]">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
                <NotepadText size={30} className="hidden md:block" />TaskBuddy
            </h1>
            <Link to="/profile" className="flex items-center gap-2">
                {user?.photoURL ?
                    (
                        <>
                            <img src={user?.photoURL || ""} className="w-6 h-6 rounded-full" />
                            <p className="hidden md:block text-sm">{user?.displayName?.split(" ")[0]}</p>
                        </>
                    ) : (
                        <>
                            <UserRound size={20} />
                            <p className="hidden md:block text-sm">{user?.displayName?.split(" ")[0]}</p>

                        </>
                    )
                }
            </Link>
        </div>
    )
}

export default TopNavbar