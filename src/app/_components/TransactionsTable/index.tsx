import React from "react";
import Transaction from "../Transaction";

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

const TransactionsTable = () => {
    return (
        <table className="appearance-none w-full text-gray-800 relative table-fixed border-collapse">
            <thead className="sticky top-0 bg-neutral-50 shadow shadow-neutral-20 w-full">
                <TableRow canHover={false}>
                    <TableHead>
                        <TableLineSelect selected={false}/>
                    </TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de vencimento</TableHead>
                </TableRow>
            </thead>
            <tbody className="block overflow-y-auto h-[calc(100vh-158px)]">
                <Transaction description="Violão" type={1} value={89.90} dueDate={new Date()} isPayed={false} payment_type={2} currentInstallment={3} totalInstallments={10}/>
                <Transaction description="Sorvete" type={1} value={3.00} isPayed={true} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
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

const TableData = (props: ChildrenProps) => {
    return(
        <td className="text-start p-4 pb-3 h-[68px] border-0 border-b-2 border-b-gray-200 w-full">
            <div className="flex">
                {props.children}
            </div>
        </td>
    );
}

const TableLineSelect = (props: {selected?: boolean}) => {
    const [selected, setSelected] = React.useState(props.selected || false);
    
    const handleSelect = () => {
        setSelected(!selected);
    }
    
    return(
        <>
            <div className="inline-flex items-center rounded-[16px] p-2 transition-colors duration-75 hover:bg-gray-100">
                <input type="checkbox" checked={selected} onChange={handleSelect} className={`appearance-none align-middle w-4.5 h-4.5 border-2 bg-white border-gray-300 rounded-[6px] cursor-pointer transition-colors checked:border-sky-600 checked:bg-blue-100 checked:bg-[url(/icons/check.svg)] checked:bg-center checked:bg-no-repeat checked:text-sky-600 focus:outline-sky-500`}/>
            </div>
        </>
    );
}
export default TransactionsTable;
export { TableRow, TableData, TableLineSelect };