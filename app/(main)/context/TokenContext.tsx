'use client'; // necesario en Next.js App Router

import { createContext } from 'react';

interface TokenContextProps {
    keyAccess: string;
    setKeyAccess: (token: string) => void;
}

// contexto con valor inicial vacío
export const TokenContext = createContext<TokenContextProps>({
    keyAccess: '',
    setKeyAccess: () => {}
});
