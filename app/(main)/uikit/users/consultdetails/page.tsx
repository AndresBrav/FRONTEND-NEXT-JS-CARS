'use client';
import React, { useEffect, useState, useContext } from 'react';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import axios from 'axios';
import {} from 'react';
import { TokenContext } from '@/app/(main)/context/TokenContext';
import useAuthRedirect from '@/app/(main)/hooks/useAuthRedirect';
// import { TokenContext } from '@/context/TokenContext';
const apiUsers = process.env.NEXT_PUBLIC_USERS_API_URL;

interface User {
    id: number;
    login: string;
    clave: string;
    sts: string;
    tipo: string;
}

const ConsultDetails = () => {
    useAuthRedirect(); /* redirect to login  */
    const [data, setData] = useState<User[] | null>(null);
    const [msg, setMsg] = useState('');

    const { keyAccess, setKeyAccess } = useContext(TokenContext); /* we bring the context */

    const DataviewGridItem = ({ user }: { user: User }) => {
        return (
            <div className="col-12 md:col-6 lg:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                        <div className="flex align-items-center">
                            {/* <i className="pi pi-tag mr-2" /> */}
                            <span className="font-semibold"> login: {user.login}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center text-center mb-3">
                        <div className="text-2xl font-bold">tipo: {user.tipo}</div>
                        <div className="mb-3">sts: {user.sts}</div>
                        {/* <Rating value={4} readOnly cancel={false} /> */}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">ID: {user.id}</span>
                        {/* <Button icon="pi pi-user" /> */}
                    </div>
                </div>
            </div>
        );
    };

    const handleConsultClick = async () => {
        try {
            const response = await axios.get(`${apiUsers}`, {
                headers: {
                    'x-api-token': keyAccess
                    // 'Content-Type': 'application/json' just use in post or update sent the information in JSON
                }
            });

            console.log(response.data);
            setData(response.data);

            if (response.data === 'you do not have permissions to access users') {
                setMsg(response.data);
            }
        } catch (error) {
            console.log('Error binging datas');
        }
    };

    return (
        <>
            {/* <p>Token actual: {keyAccess}</p> */}
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
            {!msg && (
                <div className="card">
                    <h5>DataView</h5>
                    <div className="grid">
                        {data ? (
                            data.map((user) => <DataviewGridItem key={user.id} user={user} />)
                        ) : (
                            <p>Cargando usuarios...</p>
                        )}
                    </div>
                </div>
            )}
            {msg && (
                <div className="card">
                    <h1>{msg}</h1>
                </div>
            )}
        </>
    );
};

export default ConsultDetails;
