import { Search } from "lucide-react";

interface SearchBarProps {
    placeholder: string
}

const SearchBar = ({ placeholder }: SearchBarProps) => {
    return (
        <div className="relative">
            <input className="appearence-none p-3 py-2 border rounded-lg shadow bg-white border-gray-100 ps-10 hover:border-gray-200 focus-visible:outline-0 transition h-[42] placeholder:text-gray-400" placeholder={placeholder}/>
            <Search className="absolute top-1/2 start-3 -translate-y-1/2 text-primary-600" size={18}/>
        </div>
    );
}

export default SearchBar;