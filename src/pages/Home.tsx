import List from "./List"
import Board from "./Board"
import { AlignJustify, NotepadText, SquareKanban } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const Home = () => {
    return (
        <div className="m-10 flex flex-col gap-5">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
                <NotepadText size={30} />TaskBuddy
            </h1>
            <Tabs defaultValue="list">
                <TabsList>
                    <TabsTrigger value="list" className="flex items-center gap-2"> <AlignJustify size={20} />List</TabsTrigger>
                    <TabsTrigger value="board" className="flex items-center gap-2"> <SquareKanban size={20} />Board</TabsTrigger>
                </TabsList>
                <TabsContent value="list"><List /></TabsContent>
                <TabsContent value="board"><Board /></TabsContent>
            </Tabs>
        </div>
    )
}

export default Home