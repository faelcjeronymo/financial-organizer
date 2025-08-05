import Container from "../Container";

const Header = () => {
    return (
        <header className="fixed w-full z-10 py-3 px-4 shadow-md bg-white">
            <Container>
                <div className="flex items-center justify-between">
                    <div className="bg-primary-500" style={{width: 42, height: 42, borderRadius: 8}}></div>
                </div>
            </Container>
        </header>
    );
}

export default Header;