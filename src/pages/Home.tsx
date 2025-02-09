import { Link } from "react-router-dom"
import { auth } from "@/firebase/config"
import { Board, List } from "@/components/app"
import { Button } from "@/components/ui/button"
import handleSignOut from "@/lib/googleSignOut"
import { useAuthState } from "react-firebase-hooks/auth"
import { AlignJustify, LogOut, NotepadText, SquareKanban } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const Home = () => {
    const [user] = useAuthState(auth)
    return (
        <div className="md:m-10 flex flex-col gap-2 md:gap-5">
            <div className="flex items-center justify-between md:bg-background p-4 md:p-0 bg-[#FAEEFC]">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                    <NotepadText size={30} className="hidden md:block" />TaskBuddy
                </h1>
                <Link to="/profile" className="flex items-center gap-2"><img src={user?.photoURL || ""} className="w-6 h-6 rounded-full" /><p className="hidden md:block text-sm">{user?.displayName?.split(" ")[0]}</p></Link>
            </div>
            <Tabs defaultValue="list">
                <div className="flex items-center justify-between">
                    <TabsList className="hidden md:flex justify-start">
                        <TabsTrigger value="list" className="md:flex items-center gap-2"> <AlignJustify size={20} />List</TabsTrigger>
                        <TabsTrigger value="board" className="md:flex items-center gap-2"> <SquareKanban size={20} />Board</TabsTrigger>
                    </TabsList>
                    <Button variant="outline" className="hidden md:flex items-center gap-2 border rounded-xl border-[#ebd8e8]" onClick={() => handleSignOut()}><LogOut size={20} />Logout</Button>
                </div>
                <TabsContent value="list" ><List /></TabsContent>
                <TabsContent value="board" className="hidden md:block"><Board /></TabsContent>
            </Tabs>
        </div>
    )
}

export default Home