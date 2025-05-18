import React from "react";

interface BgTextType {
    success: string;
    error: string;
    warning: string;
    info: string;
    default: string;
}

interface BgTextProps {
    children: React.ReactNode;
    type?: keyof BgTextType;
    icon?: React.ReactNode;
}

const BgText = (props: BgTextProps) => {
    const type: BgTextType = {
        success: "bg-green-100 text-green-800",
        error: "bg-red-100 text-red-800",
        warning: "bg-yellow-100 text-yellow-800",
        info: "bg-sky-100 text-sky-800",
        default: "bg-gray-100 text-gray-800",
    }
    
    return(
        <div className={`inline-flex items-center px-2 py-0.5 rounded-xl text-xs ${props.type ? type[props.type] : type.default}`}>
            {props.icon && <div className="me-1">{props.icon}</div>}
            {props.children}
        </div>
    );
};

export default BgText;