import { Link } from "react-router-dom"
import { Board, List } from "@/components/app"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AlignJustify, NotepadText, SquareKanban, UserCircle } from "lucide-react"

const Home = () => {
    return (
        <div className="md:m-10 flex flex-col gap-2 md:gap-5">
            <div className="flex items-center justify-between md:bg-background p-4 md:p-0 bg-[#FAEEFC]">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                    <NotepadText size={30} className="hidden md:block" />TaskBuddy
                </h1>
                <Link to="/profile"><UserCircle size={30} /></Link>
            </div>
            <Tabs defaultValue="list">
                <TabsList className="hidden md:flex justify-start">
                    <TabsTrigger value="list" className="md:flex items-center gap-2"> <AlignJustify size={20} />List</TabsTrigger>
                    <TabsTrigger value="board" className="md:flex items-center gap-2"> <SquareKanban size={20} />Board</TabsTrigger>
                </TabsList>
                <TabsContent value="list" ><List /></TabsContent>
                <TabsContent value="board" className="hidden md:block"><Board /></TabsContent>
            </Tabs>
        </div>
    )
}

export default Home