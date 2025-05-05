'use client';

import { ChevronDown } from "lucide-react";
import { ScriptProps } from "next/script";
import { JSX, MouseEvent, ReactNode, useState } from "react";

interface DropdownProps {
    icon?: ReactNode,
    label: string,
    items: Array<DropdownMenuItemProps> | Array<DropdownGroup>
}

//TODO: Verificar se isso foi feito do jeito certo
export interface DropdownGroup {
    title: string,
    items: Array<DropdownMenuItemProps>
}

//TODO: Verificar se isso foi feito do jeito certo
export interface DropdownMenuItemProps {
    label: string,
    action?: (event: MouseEvent) => void,
    href?: string,
}

interface DropdownMenuProps {
    children: ReactNode,
    isClosed: boolean
}

interface DropdownButtonProps {
    children: ReactNode,
    action: () => void,
}

//TODO: Colocar uma opção de fechar outros dropdown que estão abertos na página caso eu abra um

const Dropdown = (props: DropdownProps) => {
    const { icon, label, items } = props;
    const [isClosed, setIsClosed] = useState(true);

    const menuItems: Array<JSX.Element> = [];
    
    //TODO: Refatorar esse "items"/"currentItems", talvez aqui seja melhor eu chamar de "content"
    for (const item in items) {
        if ('title' in items[item] && 'items' in items[item]) {
            const currentItem = items[item] as DropdownGroup;

            menuItems.push(
                <DropdownTitle>{currentItem.title}</DropdownTitle>
            );

            if ('items' in currentItem) {
                const currentOptions = currentItem.items;
                for (const option in currentOptions) {
                    menuItems.push(
                        <DropdownMenuItem key={currentOptions[option].label} label={currentOptions[option].label} action={currentOptions[option].action}/>
                    );
                }
            }
        } else {
            const currentItem = items[item] as DropdownMenuItemProps;

            menuItems.push(
                <DropdownMenuItem key={currentItem.label} label={currentItem.label} action={currentItem.action}/>
            );
        }

    }

    return (
        <div className="relative">
            <DropdownButton action={() => {setIsClosed(!isClosed);}}>
                {icon}
                <div className="px-2 pe-1.5">{label}</div>
            </DropdownButton>
            {/* TODO: mapear os items através de um objeto */}
            <DropdownMenu isClosed={isClosed}>
                {menuItems}
            </DropdownMenu>
        </div>
    );
};

const DropdownButton = (props: DropdownButtonProps) => {
    const { children, action } = props;

    return (
        <button className="flex items-center p-3 py-2 h-[38] appearance-none border rounded-lg border-gray-300 bg-none hover:border-gray-400 focus-visible:outline-0 transition" onClick={action}>
            {children}
            <ChevronDown className="text-gray-400" size={16} strokeWidth={2} style={{strokeWidth: 3}}/>
        </button>
    );
}

const DropdownMenu = (props: DropdownMenuProps) => {
    const { children, isClosed } = props;

    const menuProps = {
        "className": "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in",
    };

    return (
        isClosed ?
        <div data-closed {...menuProps}>
            {children}
        </div>
        :
        <div {...menuProps}>
            {children}
        </div>
    );
}

const DropdownMenuItem = (props: DropdownMenuItemProps) => {
    const { label, href = "#", action = undefined } = props;

    const itemStyle = "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden transition";

    return (
        <a href={href} onClick={action} className={itemStyle}>
            {label}
        </a>
    );
}

const DropdownTitle = (props: ScriptProps) => {
    const { children } = props;
    
    return (
        <>
            <h6 className="block px-4 py-2 text-sm text-gray-700 font-semibold">{children}</h6>
            <hr className="text-gray-100 mx-3"/>
        </>
    );
}

export default Dropdown;