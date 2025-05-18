import React from "react";

interface BgTextType {
    success: string;
    error: string;
    warning: string;
    info: string;
}

const BgText = (props: {children: React.ReactNode, type: keyof BgTextType}) => {
    const type: BgTextType = {
        success: "bg-green-100 text-green-800",
        error: "bg-red-100 text-red-800",
        warning: "bg-yellow-100 text-yellow-800",
        info: "bg-sky-100 text-sky-800",
    }
    
    return(
        <div className={`inline-flex items-center px-2 py-0.5 rounded-xl text-xs ${type[props.type]}`}>
            {props.children}
        </div>
    );
};

export default BgText;