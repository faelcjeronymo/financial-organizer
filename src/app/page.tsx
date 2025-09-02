'use client';

import { BanknoteArrowDown, BanknoteArrowUp, Calendar, CirclePlus, PiggyBank } from "lucide-react";
import Dropdown, { DropdownGroup } from "./_components/Dropdown";
import TransactionsTable, { Transaction } from "./_components/TransactionsTable";
import DataCard from "./_components/DataCard";
import { PaymentType, TransactionType } from "./_components/Transaction";
import { Context, createContext, RefObject, useEffect, useRef, useState } from "react";
import Button from "./_components/Button";
import Link from "next/link";

const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function getMonths(changeMonth: (year: number, month: number) => void, selectedYear: number, selectedMonth: number): Array<DropdownGroup> {
    const months: Array<DropdownGroup> = [];

    for (let i = 2025; i <= 2027; i++) {
        months.push({
            title: `${i}`,
            items: monthNames.map((month, index) => ({
                label: month,
                action: function () {
                    changeMonth(i, index + 1) // index + 1 because months are 1-indexed
                },
                selected: (i === selectedYear && index + 1 === selectedMonth)
            })),
        })
    }

    return months;
}

//TODO: Fetch transactions from a database or API (REMOVE THIS)
async function fetchTransactions(additionalParameters?: {year: number, month: number}) {
    console.log(`Fetching transactions... Additional parameters: ${JSON.stringify(additionalParameters)}`); // TODO: Remove this
    
    const transactions: Array<Transaction> = [];

    try {
        // Simulating fetching transactions from a database
        
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

export interface HomePageContextType {
    transactionsTableRef: RefObject<HTMLTableElement | null> | null
}

export const HomePageContext: Context<HomePageContextType> = createContext<HomePageContextType>({transactionsTableRef: null});

const HomePage = () => {
    const actualYear = new Date().getFullYear();
    const actualMonth = new Date().getMonth() + 1;
    
    const [totalExpenses, setTotalExpenses] = useState<number>(0.00);
    const [totalRevenue, setTotalRevenue] = useState<number>(0.00);
    const [finalBalance, setFinalBalance] = useState<number>(0.00);
    const [transactions, setTransactions] = useState<Array<Transaction>>([]);
    const [fetchingTransactions, setFetchingTransactions] = useState(false);
    const [selectedYear, setSelectedYear] = useState<number>(actualYear);
    const [selectedMonth, setSelectedMonth] = useState<number>(actualMonth + 1); // +1 to set next month as default
    const selectedMonthName = monthNames[selectedMonth - 1]; // -1 because months are 0-indexed
    const [dropdownLabel, setDropdownLabel] = useState<string>(`${selectedMonthName}/${selectedYear}`);
    const [isAllTransactionsSelected, setIsAllTransactionsSelected] = useState(false);
    const transactionsTableRef = useRef<HTMLTableElement>(null)
    
    const changeSelectedDate = (year: number, month: number) => {
        setSelectedYear(year);
        setSelectedMonth(month);
    }

    const months = getMonths(changeSelectedDate, selectedYear, selectedMonth);
    
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
        resetDataCards();
        getTransactions();
        setDropdownLabel(`${selectedMonthName}/${selectedYear}`);
    }, [selectedYear, selectedMonth])

    useEffect(() => {
        // TODO: Create action - Update all transactions to payed
    }, [isAllTransactionsSelected])

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

    const resetDataCards = () => {
        setTotalExpenses(0.00);
        setTotalRevenue(0.00);
        setFinalBalance(0.00);
    }

    return (
        <HomePageContext.Provider value={{
            transactionsTableRef: transactionsTableRef
        }}>
            <div className="relative h-full flex flex-col pb-4">
                <div className="flex items-center gap-x-4 mb-4">
                    <Dropdown
                        label={dropdownLabel}
                        icon={<Calendar className="text-primary-600" size={18}/>}
                        items={months}
                    />
                    <div className="flex items-center gap-2 ms-auto">
                        <Link href="/transactions/add">
                            <Button color="primary" text="Adicionar Transação" icon={<CirclePlus width={18} height={18}/>}/>
                        </Link>
                    </div>
                </div>
                <div className="bg-white border-0 shadow-md h-full overflow-auto rounded-b-lg mb-4 scrollable-content">
                    <TransactionsTable transactions={transactions} isLoading={fetchingTransactions} isAllTransactionsSelected={isAllTransactionsSelected} setIsAllTransactionsSelected={setIsAllTransactionsSelected} ref={transactionsTableRef}/>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="basis-1/3 lg:basis-1/4 grow">
                        <DataCard title="Despesas" value={`${totalExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`} icon={<BanknoteArrowDown/>} iconClassNames="bg-red-100 text-red-800"/>
                    </div>
                    <div className="basis-1/3 lg:basis-1/4 grow">
                        <DataCard title="Receita" value={`${totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`} icon={<BanknoteArrowUp/>} iconClassNames="bg-green-100 text-green-800"/>
                    </div>
                    <div className="basis-1/3 lg:basis-1/4 grow">
                        <DataCard title="Saldo Final" value={`${finalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`} icon={<PiggyBank/>} iconClassNames="bg-secondary-50 text-secondary-400"/>
                    </div>
                </div>
            </div>
        </HomePageContext.Provider>
    );
}

export default HomePage;