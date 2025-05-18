import Content from './_components/Content';
import Header from './_components/Header';
import './globals.css';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={nunito.className}>
                <Header/>
                <Content>
                    {children}
                </Content>
            </body>
        </html>
    )
}