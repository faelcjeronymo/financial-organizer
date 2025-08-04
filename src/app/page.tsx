'use client';

import { Calendar, Plus } from "lucide-react";
import Dropdown, { DropdownGroup } from "./_components/Dropdown";
import SearchBar from "./_components/SearchBar";
import TransactionsTable from "./_components/TransactionsTable";

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
        <div className="relative h-full flex flex-col pb-4">
            <div className="flex items-center gap-x-4 mb-4">
                <SearchBar 
                    placeholder={"Pesquisar"}
                />
                <Dropdown
                    label="Mês"
                    icon={<Calendar className="text-primary-600" size={18}/>}
                    items={months}
                />
                <button className="flex justify-center items-center ms-auto bg-primary-500 text-white border-0 rounded-lg px-4 py-1.5 h-[38] cursor-pointer transition-colors hover:bg-primary-500 shadow">
                    <Plus className="me-0.5" width={18} height={18}/>
                    <span className="leading-4">Adicionar Transação</span>
                </button>
            </div>
            <div className="bg-white border-0 shadow-lg h-full overflow-auto rounded-b-lg">
                <TransactionsTable/>
            </div>
        </div>
    );
}

export default Page;