
import { BanknoteArrowDown, BanknoteArrowUpIcon, CircleAlert, CircleCheck, CreditCard } from "lucide-react";
import BgText from "../BgText";
import { TableData, TableLineSelect, TableRow } from "../TransactionsTable";
import React from "react";

export enum PaymentType {
    DEBIT = 1,
    CREDIT = 2
}

export enum TransactionType {
    EXPENSE = 1,
    REVENUE = 2
}

interface TransactionProps {
    description: string;
    type: TransactionType;
    payment_type?: PaymentType;
    value: number;
    isPayed?: boolean;
    dueDate?: Date;
    currentInstallment?: number;
    totalInstallments?: number;
}

const Transaction = (props: TransactionProps) => {
    let installments: React.ReactNode = null;

    if (props.payment_type === PaymentType.CREDIT && (props.totalInstallments !== undefined && props.currentInstallment !== undefined)) {
        installments = (
            <div className="text-xs uppercase text-neutral-500 opacity-90">
                {`Parcela ${props.currentInstallment} de ${props.totalInstallments}`}
            </div>
        );
    }
    
    return (
        <>
            <TableRow className="w-full border-0 border-b-2 border-b-gray-100">
                <TableData className="w-[2%] max-w-full">
                    <TransactionTypeBadge type={props.type} payment_type={props.payment_type ?? PaymentType.DEBIT}/>
                </TableData>
                <TableData className="w-[12%] max-w-full">
                    <div className="flex flex-col items-start">
                        <div className="me-1">{props.description}</div>
                    </div>
                </TableData>
                <TableData className="w-[12%] max-w-full">
                    <div className="flex flex-col">
                        <span className={`${props.type === TransactionType.REVENUE ? 'text-green-700' : 'text-red-700'}`}>
                            {props.type === TransactionType.REVENUE ? '+' : '-'} {props.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                        {installments}
                    </div>
                </TableData>
                <TableData className="w-[12%] max-w-full">
                    {props.isPayed ? 
                        <BgText type="success">
                            <span className="uppercase text-xs">Pago</span>
                            <CircleCheck className="ms-1" size={16}/>
                        </BgText> 
                    : props.isPayed === false ? 
                        <BgText type="warning">
                            <span className="uppercase text-xs">Pendente</span>
                            <CircleAlert className="ms-1" size={16}/>
                        </BgText> 
                    : '-'}
                </TableData>
                <TableData className="w-[12%] max-w-full">{props.dueDate !== undefined ?props.dueDate.toLocaleDateString('pt-BR') : '-'}</TableData>
                <TableData className="w-[1%] max-w-full">
                    <TableLineSelect />
                </TableData>
            </TableRow>
        </>
    );
}

const TransactionTypeBadge = (props: {type: TransactionType, payment_type: PaymentType}) => {
    const paymentTypeIcon: React.ReactNode = props.payment_type == PaymentType.DEBIT ? <BanknoteArrowDown size={16}/> : <CreditCard size={16}/>;
    const revenueIcon: React.ReactNode = <BanknoteArrowUpIcon size={16}/>;
    
    return (
        <BgText icon={props.type === TransactionType.REVENUE ? revenueIcon : paymentTypeIcon} className="bg-gray-200 text-gray-600">
            {props.type === TransactionType.REVENUE ? "Receita" : (props.payment_type === PaymentType.DEBIT ? "Débito" : "Crédito")}
        </BgText>
    );
}

export default Transaction;