import React from "react";
import BgText from "../BgText";

interface ChildrenProps {
    children: React.ReactNode
}

const Table = () => {
    return (
        <table className="appearance-none w-full text-gray-800">
            <thead>
                <TableRow>
                    <TableHead>
                        <TableLineSelect selected={false}/>
                    </TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Forma de Pagamento</TableHead>
                    <TableHead>Data de vencimento</TableHead>
                </TableRow>
            </thead>
            <tbody>
                <TableRow>
                    <TableData>
                        <TableLineSelect />
                    </TableData>
                    <TableData>
                        Restaurante Guanabara
                    </TableData>
                    <TableData>R$ 200,00</TableData>
                    <TableData>
                        <BgText type="success">Pago</BgText>
                    </TableData>
                    <TableData>
                        <div>
                            <i>{/*Icone*/}</i>
                            <div>Débito</div>
                        </div>
                    </TableData>
                    <TableData>01/01/2025</TableData>
                </TableRow>
                <TableRow>
                    <TableData>
                        <TableLineSelect />
                    </TableData>
                    <TableData>
                        Notebook Samsung
                    </TableData>
                    <TableData>R$ 259,90 - 1/18</TableData>
                    <TableData>
                        <BgText type="error">Pendente</BgText>
                    </TableData>
                    <TableData>
                        <div>
                            <i>{/*Icone*/}</i>
                            <div>Crédito</div>
                        </div>
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

const TableRow = (props: ChildrenProps) => {
    return(
        <tr className="border-b-2 border-b-gray-200">
            {props.children}
        </tr>
    );
}

const TableData = (props: ChildrenProps) => {
    return(
        <td className="text-start p-4 pb-3">
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
            <input type="checkbox" checked={selected} onChange={handleSelect} className={`appearance-none align-middle w-4.5 h-4.5 border-2 border-gray-300 rounded-[6px] checked:border-sky-600 checked:bg-blue-100 checked:bg-[url(/icons/check.svg)] checked:bg-center checked:bg-no-repeat checked:text-sky-600 focus:outline-sky-500`}/>
        </>
    );
}

export default Table;