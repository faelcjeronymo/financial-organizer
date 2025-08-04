interface ContentProps {
    children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
    return (
        <main className="pt-[5.125rem] h-full max-h-full bg-[#fafdff] px-4">
            {children}
        </main>
    );
}

export default Content;