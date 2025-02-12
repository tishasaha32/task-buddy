import { Loader2 } from "lucide-react"

const Loading = () => {
    return (
        <div className="flex gap-2 justify-center items-center h-screen">
            <Loader2 className="animate-spin" size={40} /> Loading...
        </div>
    )
}

export default Loading