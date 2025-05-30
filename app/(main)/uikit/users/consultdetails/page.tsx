'use client';
import React, { useEffect, useState } from 'react';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import axios from 'axios';

const apiUsers = process.env.NEXT_PUBLIC_USERS_API_URL;

interface User {
    id: number;
    login: string;
    clave: string;
    sts: string;
    tipo: string;
}

const ConsultDetails = () => {
    const [data, setData] = useState<User[] | null>(null);

    const mockData: User[] = [
        { id: 1, login: 'admin', clave: '1234', sts: 'activo', tipo: 'admin' },
        { id: 2, login: 'johndoe', clave: 'abcd', sts: 'inactivo', tipo: 'usuario' },
        { id: 3, login: 'janedoe', clave: 'pass', sts: 'activo', tipo: 'moderador' },
        { id: 4, login: 'maria', clave: 'qwerty', sts: 'activo', tipo: 'admin' },
        { id: 5, login: 'carlos', clave: 'zxcv', sts: 'inactivo', tipo: 'usuario' },
        { id: 6, login: 'laura', clave: '9876', sts: 'activo', tipo: 'usuario' },
        { id: 6, login: 'laura', clave: '9876', sts: 'activo', tipo: 'usuario' }
    ];

    

    const DataviewGridItem = ({ user }: { user: User }) => {
        return (
            <div className="col-12 md:col-6 lg:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" />
                            <span className="font-semibold">{user.login}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center text-center mb-3">
                        <div className="text-2xl font-bold">{user.tipo}</div>
                        <div className="mb-3">{user.sts}</div>
                        <Rating value={4} readOnly cancel={false} />
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">ID: {user.id}</span>
                        <Button icon="pi pi-user" />
                    </div>
                </div>
            </div>
        );
    };

    const handleConsultClick = async () => {
        try {
            const response = await axios.get(`${apiUsers}`, {
                headers: {
                    'x-api-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiVVNFUjEiLCJ0IjoiYWRtaW4iLCJpYXQiOjE3NDg2MTA5MjAsImV4cCI6MTc0ODYyMTcyMH0.10BdNrGDdSintEBtDYWht2S_kz65GaUlyxS8mcCKy2w'
                    // 'Content-Type': 'application/json' just use in post or update sent the information in JSON
                }
            });

            console.log(response.data);
            setData(response.data)
        } catch (error) {
            console.log("Error binging datas")
        }
    };

    return (
        <>
            {/* <div className="grid">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Default</h5>
                        <div className="flex flex-wrap gap-2">
                            <Button label="Consult"></Button>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="grid justify-content-center">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Consult Details Users</h5>
                        <div className="flex justify-content-center flex-wrap gap-2">
                            <Button label="Consult " onClick={handleConsultClick} />
                        </div>
                    </div>
                </div>
            </div>

            {/* <Header /> */}
            <div className="card">
                <h5>DataView</h5>
                <div className="grid">{data ? data.map((user) => <DataviewGridItem key={user.id} user={user} />) : <p>Cargando usuarios...</p>}</div>
            </div>
        </>
    );
};

export default ConsultDetails;
