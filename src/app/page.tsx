'use client';

import { Calendar } from "lucide-react";
import Dropdown, { DropdownGroup } from "./_components/Dropdown";
import SearchBar from "./_components/SearchBar";
import Table from "./_components/Table";

//TODO: Criar o dropdown com os meses
const months: Array<DropdownGroup> = [
    {
        title: "2025",
        items: [
            {
                label: "Janeiro",
                action: () => console.log("Janeiro")
            },
            {
                label: "Fevereiro",
                action: () => console.log("Fevereiro")
            },
            {
                label: "Março",
                action: () => console.log("Março")
            },
            {
                label: "Abril",
                action: () => console.log("Abril")
            },
            {
                label: "Maio",
                action: () => console.log("Maio")
            },
            {
                label: "Junho",
                action: () => console.log("Junho")
            }
        ]
    }
];

const Page = () => {
    return (
        <>
            <div className="flex items-center gap-x-4 px-4 mb-8">
                <SearchBar placeholder={"Pesquisar"}/>
                <Dropdown
                    label="Mês"
                    icon={<Calendar className="text-gray-400" size={18}/>}
                    items={months}
                />
            </div>
            <Table/>
        </>
    );
}

export default Page;