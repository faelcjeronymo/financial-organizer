import { Search } from "lucide-react";
import CustomInput from "../CustomInput";

const SearchBar = () => {
    return (
        <>
            <CustomInput placeholder="Pesquisar" icon={<Search size={18}/>}/>
        </>
    );
}

export default SearchBar;