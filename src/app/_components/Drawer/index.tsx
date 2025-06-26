'use client'

import { createPortal } from "react-dom"

const Drawer = () => {
    return (
        createPortal(
            (
            <div className="fixed z-10" aria-labelledby="drawer-title" role="dialog" aria-modal="true">
            </div>
            ),
            document.getElementsByName('body').item(0)
        )
    )
}

export default Drawer;