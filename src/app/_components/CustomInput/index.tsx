import React from "react";

const CustomInput = (props: {placeholder: string, icon?: React.ReactElement, type?: string}) => {
    const defaultAttributes = {
        type: props.type || "text",
        placeholder: props.placeholder,
        className: "appearance-none p-3 py-2 border rounded-lg shadow-sm bg-white border-gray-100 hover:border-gray-200 focus-visible:outline-0 transition h-[42] placeholder:text-gray-400"
    } as React.InputHTMLAttributes<HTMLInputElement>;
    
    // const inputClassNames = `appearence-none p-3 py-2 border rounded-lg shadow-sm bg-white border-gray-100 hover:border-gray-200 focus-visible:outline-0 transition h-[42] placeholder:text-gray-400`.trim()
    
    let input = null;
    
    input = (
        <input {...defaultAttributes}/>
    )
    
    if (React.isValidElement(props.icon)) {
        defaultAttributes.className += " ps-10";
        
        input = (
            <div className="relative">
                <input 
                    {...defaultAttributes}/>
                <div className="absolute top-1/2 start-3 -translate-y-1/2 text-primary-600">
                    {props.icon}
                </div>
            </div>
        )
    }
    
    return (
        <>
            {input}
        </>
    )
};

export default CustomInput;