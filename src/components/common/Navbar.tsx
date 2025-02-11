import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import List from "../container/List"
import Board from "../container/Board"

import handleSignOut from "@/lib/googleSignOut"

import { AlignJustify, LogOut, SquareKanban } from "lucide-react"


const Navbar = () => {
    return (
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
    )
}

export default Navbar