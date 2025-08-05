const Container = (props: { children: React.ReactNode, classNames?: string }) => {
    return (
        <div className={`max-w-7xl mx-auto h-full ${props.classNames}`.trim()}>
            {props.children}
        </div>
    )
}

export default Container;