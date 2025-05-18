import React from "react";
import BgText from "../BgText";
import { BanknoteArrowDown, CreditCard } from "lucide-react";
import Transaction from "../Transaction";

interface ChildrenProps {
    children: React.ReactNode
}

interface TableRowProps extends ChildrenProps {
    canHover?: boolean;
}

const Table = () => {
    return (
        <table className="appearance-none w-full text-gray-800">
            <thead>
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
            <tbody>
                <Transaction description="Violão" type={1} value={89.90} dueDate={new Date()} isPayed={false} payment_type={2} currentInstallment={3} totalInstallments={10}/>
                <Transaction description="Sorvete" type={1} value={3.00} isPayed={true} payment_type={1}/>
                <Transaction description="Telecine" type={2} value={29.90} payment_type={1}/>
                <TableRow>
                    <TableData>
                        <TableLineSelect />
                    </TableData>
                    <TableData>
                        <div className="flex items-start">
                            <div className="me-1">Restaurante Guanabara</div>
                            <BgText icon={<BanknoteArrowDown size={14}/>}>
                                Débito
                            </BgText>
                        </div>
                    </TableData>
                    <TableData>R$ 200,00</TableData>
                    <TableData>
                        <BgText type="success">Pago</BgText>
                    </TableData>
                    <TableData>01/01/2025</TableData>
                </TableRow>
                <TableRow>
                    <TableData>
                        <TableLineSelect />
                    </TableData>
                    <TableData>
                        <div className="flex items-center">
                            <div className="me-1">Notebook Samsung</div>
                            <BgText icon={<CreditCard size={14}/>}>
                                Crédito
                            </BgText>
                        </div>
                    </TableData>
                    <TableData>R$ 259,90 - 1/18</TableData>
                    <TableData>
                        <BgText type="error">Pendente</BgText>
                    </TableData>
                    <TableData>01/01/2025</TableData>
                </TableRow>
            </tbody>
        </table>
    );
}

const TableHead = (props: ChildrenProps) => {
    return(
        <th className="text-start p-4 pb-3 text-gray-500 text-[13px] font-normal">
            {props.children}
        </th>
    );
}

const TableRow = (props: TableRowProps) => {
    const canHover = props.canHover === undefined ? true : props.canHover;
    
    return(
        <tr className={`border-b-2 border-b-gray-200 transition-all duration-75 ${canHover ? "hover:bg-gray-50" : ""}`.trim()}>
            {props.children}
        </tr>
    );
}

const TableData = (props: ChildrenProps) => {
    return(
        <td className="text-start p-4 pb-3 h-[68px]">
            {props.children}
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
export default Table;
export { TableRow, TableData, TableLineSelect };