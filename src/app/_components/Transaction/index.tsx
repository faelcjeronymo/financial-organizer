
import { BanknoteArrowDown, BanknoteArrowUpIcon, CreditCard } from "lucide-react";
import BgText from "../BgText";
import { TableData, TableLineSelect, TableRow } from "../TransactionsTable";
import React from "react";

enum PaymentType {
    DEBIT = 1,
    CREDIT = 2
}

enum TransactionType {
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

//TODO: Show installments for credit expenses
const Transaction = (props: TransactionProps) => {
    const paymentTypeIcon: React.ReactNode = props.payment_type == PaymentType.DEBIT ? <BanknoteArrowDown size={14}/> : <CreditCard size={14}/>;
    const revenueIcon: React.ReactNode = <BanknoteArrowUpIcon size={14}/>;
    let installments: React.ReactNode = null;

    if (props.payment_type === PaymentType.CREDIT && (props.totalInstallments !== undefined && props.currentInstallment !== undefined)) {
        installments = (
            <div className="text-xs uppercase text-gray-500">
                {` Parcela ${props.currentInstallment} de ${props.totalInstallments}`}
            </div>
        );
    }
    
    return (
        <>
            <TableRow className="w-full">
                <TableData>
                    <TableLineSelect />
                </TableData>
                <TableData>
                    <div className="flex flex-col items-start">
                        <div className="me-1">{props.description}</div>
                        <BgText icon={props.type === TransactionType.REVENUE ? revenueIcon : paymentTypeIcon}>
                            {props.type === TransactionType.REVENUE ? "Receita" : (props.payment_type === PaymentType.DEBIT ? "Débito" : "Crédito")}
                        </BgText>
                    </div>
                </TableData>
                <TableData>
                    <div className="flex flex-col">
                        {props.value.toLocaleString('pr-BR', { style: 'currency', currency: 'BRL' })}
                        {installments}
                    </div>
                </TableData>
                <TableData>
                    {props.isPayed ? <BgText type="success">Pago</BgText> : props.isPayed === false ? <BgText type="error">Pendente</BgText> : '-'}
                </TableData>
                <TableData>{props.dueDate !== undefined ?props.dueDate.toLocaleDateString('pt-BR') : '-'}</TableData>
            </TableRow>
        </>
    );
}

export default Transaction;