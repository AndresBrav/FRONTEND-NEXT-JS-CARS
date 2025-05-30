'use client';

import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
// import { TokenProvider } from '@/context/TokenProvider'; // importa aquí tu TokenProvider
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { TokenProvider } from './(main)/context/TokenProvider';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet" />
            </head>
            <body>
                <PrimeReactProvider>
                    <TokenProvider>
                        {' '}
                        {/* 👉 you wrap here*/}
                        <LayoutProvider>{children}</LayoutProvider>
                    </TokenProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
