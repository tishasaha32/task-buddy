import { SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input"
import { useTaskStore } from "@/store/taskStore";

type SearchProps = {
    setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    searchTerm: string,
}
const Search = ({ setFilteredTasks, setSearchTerm, searchTerm }: SearchProps) => {
    const { tasks } = useTaskStore((state) => state);
    const handleSearch = (searchTerm: string) => {
        setSearchTerm?.(searchTerm);
        const tasksFiltered = tasks.filter((task) => task?.title?.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredTasks(tasksFiltered);
    }

    const handleCancelClick = () => {
        setSearchTerm("");
        setFilteredTasks(tasks);
    }
    return (
        <Input
            value={searchTerm}
            placeholder="Search"
            className="md:w-[250px] rounded-3xl"
            startContent={<SearchIcon size={20} />}
            onChange={(e) => handleSearch(e.target.value)}
            endContent={searchTerm && <X size={20} onClick={handleCancelClick} />}
        />
    )
}

export default Search