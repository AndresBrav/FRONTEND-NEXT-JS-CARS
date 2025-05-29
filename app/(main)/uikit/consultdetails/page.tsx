'use client';
import React, { useEffect, useState } from 'react';

interface User {
    id: number;
    login: string;
    clave: string;
    sts: string;
    tipo: string;
}

const ConsultDetails = () => {
    const [data, setData] = useState<User[] | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:4000/users/getUsers/', {
                    method: 'GET',
                    headers: {
                        'x-api-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiVVNFUjEiLCJ0IjoiYWRtaW4iLCJpYXQiOjE3NDg1NDE4MzQsImV4cCI6MTc0ODU1MjYzNH0.Rvdtul8jw2kdiym8r15V_BqK8eELYJcHHiW6DzEMfHA',
                        'Content-Type': 'application/json'
                    }
                });

                const jsonData: User[] = await response.json();
                console.log('Datos reales:', jsonData); // <- aquí verás los datos
                setData(jsonData);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <div>we are going to consult Details</div>
            <div>
                <h1>Datos desde API</h1>
                {data ? (
                    <ul>
                        {data.map((user) => (
                            <li key={user.id}>
                                {user.login} - {user.clave}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Cargando usuarios...</p>
                )}
            </div>
        </>
    );
};

export default ConsultDetails;
