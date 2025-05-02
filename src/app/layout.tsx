import Content from './_components/Content';
import Header from './_components/Header';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Header/>
                <Content>
                    {children}
                </Content>
            </body>
        </html>
    )
}