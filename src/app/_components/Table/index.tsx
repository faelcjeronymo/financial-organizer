import React from "react";

interface ChildrenProps {
    children: React.ReactNode
}

const Table = () => {
    return (
        <table className="appearance-none w-full text-gray-800">
            <thead>
                <TableRow>
                    <TableHead>
                        <TableLineSelection />
                    </TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data de vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Forma de Pagamento</TableHead>
                </TableRow>
            </thead>
            <tbody>
                <TableRow>
                    <TableData>
                        <TableLineSelection/>
                    </TableData>
                    <TableData>Compra Débito</TableData>
                    <TableData>R$ 200,00</TableData>
                    <TableData>01/01/2025</TableData>
                    <TableData>
                        <span>Pago</span>
                    </TableData>
                    <TableData>
                        <div>
                            <i>{/*Icone*/}</i>
                            <div>Débito</div>
                        </div>
                    </TableData>
                </TableRow>
                <TableRow>
                    <TableData>
                        <TableLineSelection/>
                    </TableData>
                    <TableData>Compra Crédito</TableData>
                    <TableData>R$ 259,90 - 1/18</TableData>
                    <TableData>
                        <span>Pendente</span>
                    </TableData>
                    <TableData>
                        <div>
                            <i>{/*Icone*/}</i>
                            <div>Crédito</div>
                        </div>
                    </TableData>
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

const TableLineSelection = () => {
    return(
        <>
        </>
    );
}

export default Table;