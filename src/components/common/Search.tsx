import { useTaskStore } from "@/store/taskStore";
import { Input } from "../ui/input"
import { SearchIcon } from "lucide-react";

type SearchProps = {
    setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>
    setSearchTerm?: React.Dispatch<React.SetStateAction<string>>
}
const Search = ({ setFilteredTasks, setSearchTerm }: SearchProps) => {
    const { tasks } = useTaskStore((state) => state);
    const handleSearch = (searchTerm: string) => {
        setSearchTerm?.(searchTerm);
        const tasksFiltered = tasks.filter((task) => task?.title?.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredTasks(tasksFiltered);
    }
    return (
        <Input
            placeholder="Search"
            className="md:w-[250px] rounded-3xl"
            startContent={<SearchIcon size={20} />}
            onChange={(e) => handleSearch(e.target.value)}
        />
    )
}

export default Search