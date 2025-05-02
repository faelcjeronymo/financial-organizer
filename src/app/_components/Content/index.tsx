interface ContentProps {
    children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
    return (
        <main className="py-6">
            {children}
        </main>
    );
}

export default Content;