'use client';

import { Calendar } from "lucide-react";
import SearchBar from "./_components/SearchBar";
import Dropdown, { DropdownGroup, DropdownMenuItemProps } from "./_components/Dropdown";

//TODO: Verificar se isso foi feito do jeito certo e remover esta declaração
const teste: Array<DropdownMenuItemProps> = [
    {
        "label": "Item 1",
        "action": () => {console.log("Item 1")}
    }, 
    {
        "label": "Item 2",
        "action": () => {console.log("Item 2")}
    }
];

//TODO: Verificar se isso foi feito do jeito certo e remover esta declaração
const teste2: Array<DropdownGroup> = [
    {
        "title": "Título 1",
        "items": [
            {
                "label": "Item 1",
                "action": () => {console.log("Item 1")}
            }, 
            {
                "label": "Item 2",
                "action": () => {console.log("Item 2")}
            }
        ]
    },
    {
        "title": "Título 2",
        "items": [
            {
                "label": "Item 1",
                "action": () => {console.log("Item 2-1")}
            }, 
            {
                "label": "Item 2",
                "action": () => {console.log("Item 2-2")}
            }
        ]
    }
];

const Page = () => {
    return (
        <>
            <div className="flex items-center gap-x-4 px-4">
                <SearchBar placeholder={"Pesquisar"}/>
                <Dropdown icon={<Calendar className="text-gray-400" size={18}/>} items={teste} label="Mês"/>
                <Dropdown icon={<Calendar className="text-gray-400" size={18}/>} items={teste2} label="Mês"/>
            </div>
        </>
    );
}

export default Page;