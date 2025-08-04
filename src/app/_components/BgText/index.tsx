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
    className?: string;
    rounded?: boolean;
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
        <div className={`inline-flex items-center px-2 py-1 ${props.rounded ? 'rounded-xl' : 'rounded-md'} text-sm ${props.type ? type[props.type] : type.default} ${props.className}`.trim()}>
            {props.children}
            {props.icon && <div className="ms-1">{props.icon}</div>}
        </div>
    );
};

export default BgText;