import React from "react";

interface ButtonProps {
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    text?: string,
    icon?: React.ReactNode,
    type?: "button" | "submit" | "reset",
    color?: "primary" | "secondary",
    onlyIcon?: boolean
}

const Button = (props: ButtonProps) => {
    const { className, onClick, text, icon, type = "button", color, onlyIcon = false } = props;

    let buttonColor = "";

    switch (color) {
        case "primary":
            buttonColor = "bg-primary-500 text-white hover:bg-primary-600";
            break;
        case "secondary":
            buttonColor = "bg-secondary-500 text-white hover:bg-secondary-600";
            break;
        default:
            buttonColor = "bg-gray-200 text-neutral-700 hover:bg-gray-600";
    }
    
    return (
        <button className={`flex justify-center items-center ms-auto border-0 rounded-lg px-4 py-1.5 h-[38] cursor-pointer transition-colors shadow ${buttonColor} ${className || ""}`.trim()} onClick={onClick} type={type}>
            {icon && <span className="me-0.5">{icon}</span>}
            {!onlyIcon && text && <span className="leading-4">{text}</span>}
        </button>
    );
}

export default Button;