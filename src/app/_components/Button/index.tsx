import React from "react";

interface ButtonProps {
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    text?: string,
    icon?: React.ReactNode,
    type?: "button" | "submit" | "reset",
    color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "light" | "dark",
    onlyIcon?: boolean,
    disabled?: boolean
}

const Button = (props: ButtonProps) => {
    const { className, onClick, text, icon, type = "button", color, onlyIcon = false, disabled = false } = props;

    let buttonColor = "";

    switch (color) {
        case "primary":
            buttonColor = "bg-primary-500 text-white hover:bg-primary-600";
            break;
        case "secondary":
            buttonColor = "bg-secondary-500 text-white hover:bg-secondary-600";
            break;
        case "success":
            buttonColor = "bg-green-600 text-white hover:bg-green-700";
            break;
        case "warning":
            buttonColor = "bg-yellow-500 text-white hover:bg-yellow-600";
            break;
        default:
            buttonColor = "bg-gray-200 text-neutral-700 hover:bg-gray-600";
    }

    if (disabled) {
        buttonColor = `${buttonColor} disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`;
    }
    
    return (
        <button className={`flex justify-center items-center ms-auto border-0 rounded-lg px-4 py-1.5 h-[38] cursor-pointer transition-colors shadow ${buttonColor} ${className || ""}`.trim()} onClick={onClick} type={type} disabled={disabled}>
            {icon && <span className={`${!onlyIcon ? "me-1.5" : ""}`.trim()}>{icon}</span>}
            {!onlyIcon && text && <span className="leading-4">{text}</span>}
        </button>
    );
}

export default Button;