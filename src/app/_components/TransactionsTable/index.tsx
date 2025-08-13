'use client';

import React, { ChangeEvent, Dispatch, RefObject, SetStateAction, useContext, useEffect } from "react";
import Transaction from "../Transaction";
import { HomePageContext, HomePageContextType } from "../../page";

interface ChildrenProps {
    children: React.ReactNode
}

interface TableRowProps extends ChildrenProps {
    className?: string;
    canHover?: boolean;
}

interface TableHeadProps extends ChildrenProps {
    className?: string;
}

interface TableDataProps extends ChildrenProps {
    className?: string;
}

export interface Transaction {
    id: number;
    description: string;
    type: number; // 1 for expense, 2 for income
    value: number;
    dueDate?: Date;
    isPayed?: boolean;
    payment_type?: number; // 1 for cash, 2 for card, etc.
    currentInstallment?: number;
    totalInstallments?: number;
}

interface TransactionsTableProps {
    transactions: Array<Transaction>;
    isLoading?: boolean;
    isAllTransactionsSelected?: boolean;
    setIsAllTransactionsSelected: Dispatch<SetStateAction<boolean>>;
    ref: RefObject<HTMLTableElement | null> | null
}

// TODO: Render transactions from database
// TODO: Transactions needs to be rendered from a object with a map function
const TransactionsTable = (props: TransactionsTableProps) => {
    const { transactions, isLoading, isAllTransactionsSelected, setIsAllTransactionsSelected } = props;
    
    const renderedTransactions = transactions.map((transaction) => {
        return (
            <Transaction key={transaction.id} description={transaction.description} type={transaction.type} value={transaction.value} dueDate={transaction.dueDate} isPayed={transaction.isPayed} payment_type={transaction.payment_type} currentInstallment={transaction.currentInstallment} totalInstallments={transaction.totalInstallments} isSelected={isAllTransactionsSelected}/>
        );
    });

    return (
        <table className="appearance-none w-full text-gray-800 relative table-fixed border-collapse rounded-b-lg">
            <thead className="sticky top-0 bg-primary-500 w-full block rounded-t-lg">
                <TableRow canHover={false}>
                    <TableHead className="w-[6%] max-w-full text-white">Tipo</TableHead>
                    <TableHead className="w-[12%] max-w-full text-white">Descrição</TableHead>
                    <TableHead className="w-[12%] max-w-full text-white">Valor</TableHead>
                    <TableHead className="w-[12%] max-w-full text-white">Status</TableHead>
                    <TableHead className="w-[12%] max-w-full text-white">Data de vencimento</TableHead>
                    <TableHead className="w-[1%] max-w-full">
                        <TableLineSelect checked={isAllTransactionsSelected} onChange={() => {
                            setIsAllTransactionsSelected(!isAllTransactionsSelected)
                        }} />
                    </TableHead>
                </TableRow>
            </thead>
            <tbody className="block overflow-x-auto">
                {isLoading ? 
                    <TableRow><TableData>Carregando...</TableData></TableRow>
                    : renderedTransactions}
            </tbody>
        </table>
    );
}

const TableHead = (props: TableHeadProps) => {
    return(
        <th className={`text-start p-4 pb-3 text-gray-500 text-[13px] font-normal ${props.className !== undefined ? props.className : ''}`.trim()}>
            {props.children}
        </th>
    );
}

const TableRow = (props: TableRowProps) => {
    const canHover = props.canHover === undefined ? true : props.canHover;
    
    return(
        <tr className={`transition-all duration-75 ${props.className} ${canHover ? "hover:bg-gray-50" : ""}`.trim()}>
            {props.children}
        </tr>
    );
}

const TableData = (props: TableDataProps) => {
    return(
        <td className={`text-start p-4 h-[68px] ${props.className}`.trim()}>
            <div className="flex">
                {props.children}
            </div>
        </td>
    );
}

const TableLineSelect = (props: {checked?: boolean, className?: string, onChange?: (event: ChangeEvent<HTMLInputElement>) => void}) => {
    const [checked, setChecked] = React.useState(false);
    const homeContext: HomePageContextType = useContext(HomePageContext);

    useEffect(() => {
        if (props.checked !== undefined) {
            setChecked(props.checked);
        }
    }, [props.checked]);

    useEffect(() => {
        homeContext.setIsStatusButtonDisabled!(true)
    }, [props.checked, checked]);
    
    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(!checked);
        if (props.onChange) {
            props.onChange(e);
        }
    }
    
    return(
        <>
            <div className="inline-flex items-center rounded-[16px] p-2 transition-colors duration-75 hover:bg-primary-50">
                <input type="checkbox" checked={checked} onChange={handleSelect} className={`appearance-none align-middle w-4.5 h-4.5 border-2 bg-white border-primary-500 rounded-[6px] cursor-pointer transition-colors checked:border-primary-600 checked:bg-primary-50 checked:bg-[url(/icons/check.svg)] checked:bg-center checked:bg-no-repeat checked:text-primary-600 focus:outline-primary-500 ${props.className}`.trim()}/>
            </div>
        </>
    );
}
export default TransactionsTable;
export { TableRow, TableData, TableLineSelect };