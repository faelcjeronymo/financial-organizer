'use client'

import React from "react";

interface DrawerProps {
    children: React.ReactNode
}

const Drawer = (props: DrawerProps) => {
    const { children } = props;
    
    return (
        <div className="fixed z-10" aria-labelledby="drawer-title" role="dialog" aria-modal="true">
            {children}
        </div>
    )
}

export default Drawer;