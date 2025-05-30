'use client';

import { useEffect, useState, ReactNode } from 'react';
import { TokenContext } from './TokenContext';

interface Props {
    children: ReactNode;
}

export function TokenProvider({ children }: Props) {
    const [keyAccess, setKeyAccess] = useState<string>('');

    // Cargar desde localStorage si existe
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setKeyAccess(savedToken);
        }
    }, []);

    // Guardar en localStorage cada vez que cambia
    useEffect(() => {
        if (keyAccess) {
            localStorage.setItem('token', keyAccess);
        }
    }, [keyAccess]);

    return <TokenContext.Provider value={{ keyAccess, setKeyAccess }}>{children}</TokenContext.Provider>;
}
