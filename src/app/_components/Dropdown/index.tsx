'use client';

import { ChevronDown } from "lucide-react";
import { ScriptProps } from "next/script";
import React, { JSX, MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

interface DropdownProps {
    icon?: ReactNode,
    label: string,
    items: Array<DropdownMenuItemProps> | Array<DropdownGroup>
}

export interface DropdownGroup {
    title: string,
    items: Array<DropdownMenuItemProps>
}

export interface DropdownMenuItemProps {
    label: string,
    action?: (event: MouseEvent) => void,
    href?: string,
}

export interface DropdownMenuProps {
    children: ReactNode,
    isClosed: boolean,
    ref: React.Ref<HTMLDivElement> | null,
}

export interface DropdownButtonProps {
    ref: React.Ref<HTMLButtonElement> | null,
    children: ReactNode,
    action: (event?: MouseEvent<HTMLButtonElement>) => void,
}

const Dropdown = (props: DropdownProps) => {
    const { icon, label, items } = props;
    const [isClosed, setIsClosed] = useState(true);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuItems: Array<JSX.Element> = [];

    //TODO: Refactor and use useCallback hook
    useEffect(() => {
        function closeDropdownWithOutClick (this: Document, event: globalThis.MouseEvent) {
            if (
                (buttonRef.current && (event.target === buttonRef.current || buttonRef.current.contains(event.target as Node))) ||
                (menuRef.current && menuRef.current.contains(event.target as Node))
            ) {
                return;
            }
            setIsClosed(true);
        };
    
        document.addEventListener('click', closeDropdownWithOutClick);
    
        return () => {
          document.removeEventListener('click', closeDropdownWithOutClick);
        };
      }, []);
    
    //TODO: Maybe will be better change "items"/"currentItems" to "content"
    for (const item in items) {
        if ('title' in items[item] && 'items' in items[item]) {
            const currentItem = items[item] as DropdownGroup;

            menuItems.push(
                <DropdownTitle key={currentItem.title}>{currentItem.title}</DropdownTitle>
            );

            if ('items' in currentItem) {
                const currentOptions = currentItem.items;
                for (const option in currentOptions) {
                    menuItems.push(
                        <DropdownMenuItem key={crypto.randomUUID()} label={currentOptions[option].label} action={currentOptions[option].action}/>
                    );
                }
            }
        } else {
            const currentItem = items[item] as DropdownMenuItemProps;

            menuItems.push(
                <DropdownMenuItem key={crypto.randomUUID()} label={currentItem.label} action={currentItem.action}/>
            );
        }

    }

    const closeOnButtonClick = () => {
        setIsClosed(!isClosed);
    }

    return (
        <div className="relative">
            <DropdownButton action={closeOnButtonClick} ref={buttonRef}>
                {icon}
                <div className="px-2 pe-1.5">{label}</div>
            </DropdownButton>
            {/* TODO: mapear os items através de um objeto */}
            <DropdownMenu isClosed={isClosed} ref={menuRef}>
                {menuItems}
            </DropdownMenu>
        </div>
    );
};

const DropdownButton = (props: DropdownButtonProps) => {
    const { children, action } = props;

    return (
        <button className="flex items-center p-3 py-2 h-[38] appearance-none border rounded-lg border-gray-300 bg-none hover:border-gray-400 focus-visible:outline-0 transition" onClick={action} ref={props.ref}>
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

    if (!isClosed) {
        menuProps.className = menuProps.className.replace("hidden", "block");
    }

    return (
        isClosed ?
        <div data-closed {...menuProps} ref={props.ref}>
            <div style={{visibility: "hidden"}}>
                {children}
            </div>
        </div>
        :
        <div {...menuProps} ref={props.ref}>
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