import { Search } from "lucide-react";

interface SearchBarProps {
    placeholder: string
}

const SearchBar = ({ placeholder }: SearchBarProps) => {

    return (
        <div className="relative">
            <input className="p-3 py-2.5 border rounded-lg border-gray-300 ps-10 hover:border-gray-400 transition" placeholder={placeholder}/>
            <Search className="absolute top-1/2 start-3 -translate-y-1/2 text-gray-500" size={20}/>
        </div>
    );
}

export default SearchBar;