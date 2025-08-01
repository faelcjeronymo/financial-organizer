'use client';

import { Calendar, Plus } from "lucide-react";
import Dropdown, { DropdownGroup } from "./_components/Dropdown";
import SearchBar from "./_components/SearchBar";
import TransactionsTable from "./_components/TransactionsTable";
import LargeBtn from "./_components/LargeBtn";

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
                    icon={<Calendar className="text-gray-400" size={18}/>}
                    items={months}
                />
                <button className="flex justify-center items-center ms-auto bg-primary-400 text-primary-950 border-0 rounded-lg px-4 py-1.5 h-[38] cursor-pointer transition-colors hover:bg-primary-500">
                    <Plus className="0.5" width={22} height={22}/>
                    <span className="leading-4">Adicionar Transação</span>
                </button>
            </div>
            <div className="h-full bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                <TransactionsTable/>
            </div>
            <div className="fixed bottom-0 end-0">
                <LargeBtn onClick={() => {/* TODO: Add Transaction */}}/>
            </div>
        </div>
    );
}

export default Page;