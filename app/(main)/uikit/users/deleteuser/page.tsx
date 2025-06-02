'use client';

import { TokenContext } from '@/app/(main)/context/TokenContext';
import useAuthRedirect from '@/app/(main)/hooks/useAuthRedirect';
import { useParams } from 'next/navigation';
import { Button } from 'primereact/button';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { useContext, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';

const apiUsers = process.env.NEXT_PUBLIC_USERS;

interface User {
    id: number;
    login: string;
    clave: string;
    sts: string;
    tipo: string;
}

const DeleteUser = () => {
    useAuthRedirect(); /* redirect to login  */
    const toast = useRef<Toast>(null);
    const [data, setData] = useState<User | null>(null);
    const params = useParams();
    const id = params?.id; // puede ser string o string[]

    const [number, setNumber] = useState<string>('');
    const [msg, setMsg] = useState<string>('');

    const { keyAccess, setKeyAccess } = useContext(TokenContext); /* we bring the context */

    const handleConsultClick = async () => {
        try {
            const response = await axios.get(`${apiUsers}getUsers/${number}`, {
                headers: {
                    'x-api-token': keyAccess
                    // 'Content-Type': 'application/json' just use in post or update sent the information in JSON
                }
            });

            // console.log(response.data);
            // setData(response.data);

            if (response.data.msg) {
                setMsg(response.data.msg);
                console.log(response.data);
                setData(null);
            } else {
                console.log(response.data);
                setMsg(''); /* update message */
                setData(response.data);
            }
        } catch (error) {
            console.log('Error binging datas');
        }
    };

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

    const handleDelete = async () => {
        try {
            console.log('user was deleted');
            const response = await axios.delete(`${apiUsers}delUsers/${number}`, {
                headers: {
                    'x-api-token': keyAccess
                }
            });

            console.log(response)

            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: response.data.msg,
                life: 4000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Could not delete user',
                life: 4000
            });
        }
    };

    const accept = () => {
        handleDelete(); // Solo se ejecuta si el usuario acepta
    };

    const reject = () => {
        toast.current?.show({
            severity: 'warn',
            summary: 'Cancelled',
            detail: 'You rejected the action',
            life: 3000
        });
    };

    const confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };

    return (
        <>
            {/* <div>Detalles del usuario con ID: {id}</div> */}

            <div className="grid p-fluid input-demo">
                <div className="col-6 md:col-3">
                    <div className="card">
                        <h5>Enter the user ID</h5>
                        <span className="p-float-label">
                            <InputText
                                id="iduser"
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                            <label htmlFor="iduser">ID USER</label>
                        </span>
                    </div>
                </div>
                <div className="col-6 md:col-3">
                    <div className="card">
                        <h5>Consult Detail One User</h5>
                        <div className="flex justify-content-center flex-wrap gap-2">
                            <Button label="Consult " onClick={handleConsultClick} />
                        </div>
                        <br />
                        <div className="flex justify-content-center flex-wrap gap-2">
                            <Toast ref={toast} />
                            <ConfirmPopup />
                            <Button onClick={confirm} label="Delete" rounded severity="danger" />
                        </div>
                    </div>
                </div>
            </div>

            <br />

            <div className="flex flex-column align-items-center justify-content-center">
                {msg && (
                    <div
                        className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
                        style={{ borderRadius: '53px' }}
                    >
                        <span className="text-blue-500 font-bold text-3xl">404</span>
                        <h1 className="text-900 font-bold text-5xl mb-2">User Not Found</h1>
                        <div className="text-600 mb-5">{msg}</div>
                    </div>
                )}
            </div>

            <div className="card">
                {data && (
                    <div>
                        <h5>DataView</h5>
                        <div className="grid">
                            {data ? <DataviewGridItem key={data.id} user={data} /> : <p>Cargando usuarios...</p>}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DeleteUser;
