interface ContentProps {
    children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
    return (
        <main className="py-4">
            {children}
        </main>
    );
}

export default Content;