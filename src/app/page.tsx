'use client';

import { BanknoteArrowDown, BanknoteArrowUp, Calendar, PiggyBank, Plus, Search } from "lucide-react";
import Dropdown, { DropdownGroup } from "./_components/Dropdown";
import SearchBar from "./_components/SearchBar";
import TransactionsTable, { Transaction } from "./_components/TransactionsTable";
import DataCard from "./_components/DataCard";
import { PaymentType, TransactionType } from "./_components/Transaction";
import { useEffect, useState } from "react";
import CustomInput from "./_components/CustomInput";

function getMonths(action: (year: number, month: number) => void): Array<DropdownGroup> {
    const months: Array<DropdownGroup> = [];
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    
    for (let i = 2025; i <= 2027; i++) {
        months.push({
            title: `${i}`,
            items: monthNames.map((month, index) => ({
                label: month,
                action: (e) => {
                    e.preventDefault();
                    action(i, index + 1) // index + 1 because months are 1-indexed
                }
            }))
        })
    }

    return months;
}

//TODO: Fetch transactions from a database or API (REMOVE THIS)
async function fetchTransactions(additionalParameters?: any) {
    console.log(`Fetching transactions... Additional parameters: ${JSON.stringify(additionalParameters)}`);
    
    const transactions: Array<Transaction> = [];

    try {
        // Simulate fetching transactions from a database
        
        transactions.push(
            {
                id: 1,
                description: "Violão",
                type: TransactionType.EXPENSE,
                value: 89.90,
                dueDate: new Date(),
                isPayed: false,
                payment_type: PaymentType.CREDIT,
                currentInstallment: 3,
                totalInstallments: 10
            },
            {
                id: 2,
                description: "Sorvete",
                type: TransactionType.EXPENSE,
                value: 3.00,
                isPayed: true,
                payment_type: PaymentType.DEBIT
            },
            {
                id: 3,
                description: "Telecine",
                type: TransactionType.REVENUE,
                value: 29.90
            }
        );
        
        return transactions;
        
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return transactions;
    }
}

const Page = () => {
    const actualYear = new Date().getFullYear();
    const actualMonth = new Date().getMonth() + 1;
    
    const [totalExpenses, setTotalExpenses] = useState<number>(0.00);
    const [totalRevenue, setTotalRevenue] = useState<number>(0.00);
    const [finalBalance, setFinalBalance] = useState<number>(0.00);
    const [transactions, setTransactions] = useState<Array<Transaction>>([]);
    const [fetchingTransactions, setFetchingTransactions] = useState(false);
    const [selectedYear, setSelectedYear] = useState<number>(actualYear);
    const [selectedMonth, setSelectedMonth] = useState<number>(actualMonth + 1);

    const changeSelectedDate = (year: number, month: number) => {
        setSelectedYear(year);
        setSelectedMonth(month);
    }

    const months = getMonths(changeSelectedDate);
    
    useEffect(() => {
        getTransactions();
    }, []);

    useEffect(() => {
        if (transactions.length > 0) {
            transactions.forEach((transaction) => {
                if (transaction.type === TransactionType.EXPENSE) {
                    setTotalExpenses((prev) => prev + transaction.value);
                } else if (transaction.type === TransactionType.REVENUE) {
                    setTotalRevenue((prev) => prev + transaction.value);
                }
            });
        }
    }, [transactions])

    useEffect(() => {
        setFinalBalance(totalRevenue - totalExpenses);
    }, [totalExpenses, totalRevenue])

    useEffect(() => {
        getTransactions();
        setTotalExpenses(0.00);
        setTotalRevenue(0.00);
        setFinalBalance(0.00);
    }, [selectedYear, selectedMonth])

    const getTransactions = () => {
        //TODO: fetch transactions from database
        setFetchingTransactions(true);
        
        fetchTransactions({
            year: selectedYear,
            month: selectedMonth
        }).then((data) => {
            setTransactions(data);
            setFetchingTransactions(false);
        }).catch((error) => {
            console.error("Failed to fetch transactions:", error);
        });
    }

    return (
        <div className="relative h-full flex flex-col pb-4">
            <div className="flex items-center gap-x-4 mb-4">
                <CustomInput placeholder="Pesquisar transações" icon={<Search size={18} />} />
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
            <div className="bg-white border-0 shadow-md h-full overflow-auto rounded-b-lg mb-4">
                <TransactionsTable transactions={transactions} isLoading={fetchingTransactions}/>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {/* TODO: Use database values */}
                <DataCard title="Total Gasto" value={`${totalExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`} icon={<BanknoteArrowDown/>} iconClassNames="bg-red-100 text-red-800"/>
                <DataCard title="Total Recebido" value={`${totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`} icon={<BanknoteArrowUp/>} iconClassNames="bg-green-100 text-green-800"/>
                <DataCard title="Saldo Final" value={`${finalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`} icon={<PiggyBank/>} iconClassNames="bg-secondary-50 text-secondary-400"/>
            </div>
        </div>
    );
}

export default Page;