'use client';
import React, { useState, useContext, useRef, useCallback } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios, { AxiosResponse } from 'axios';
import useAuthRedirect from '@/app/(main)/hooks/useAuthRedirect';
import { TokenContext } from '@/app/(main)/context/TokenContext';
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';

const apiUsers = process.env.NEXT_PUBLIC_USERS;

const UpdateUser = () => {
    useAuthRedirect();

    const toast = useRef<Toast>(null);
    const { keyAccess } = useContext(TokenContext);

    const [login, setLogin] = useState('');
    const [clave, setClave] = useState('');
    const [sts, setSts] = useState('');
    const [tipo, setTipo] = useState('');
    const [msg, setMsg] = useState('');
    const [number, setnumber] = useState('');

    // Esta función ahora se ejecutará SOLO si el usuario acepta
    const handleSubmit = async () => {
        console.log(login);
        console.log(clave);
        console.log(sts);
        try {
            const response: AxiosResponse = await axios.put(
                `${apiUsers}update/${number}`,
                { login, clave, sts, tipo },
                {
                    headers: {
                        'x-api-token': keyAccess,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.msg) {
                setLogin('');
                setClave('');
                setSts('');
                setTipo('');
                setMsg(response.data.msg);
            }

            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'User updated',
                life: 3000
            });
        } catch (error) {
            console.error('Error updating user:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Could not update user',
                life: 3000
            });
        }
    };

    const accept = () => {
        handleSubmit(); // Solo se ejecuta si el usuario acepta
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

    const handlegetUser = async () => {
        try {
            const response = await axios.get(`${apiUsers}getUsers/${number}`, {
                headers: {
                    'x-api-token': keyAccess
                    // 'Content-Type': 'application/json' just use in post or update sent the information in JSON
                }
            });
            // console.log(response)
            if (response.data.login) {
                setLogin(response.data.login as string);
                setClave(response.data.clave as string);
                setSts(response.data.sts as string);
                setTipo(response.data.tipo as string);
            }
        } catch (error) {
            console.log('Error bringing user ', error);
        }
    };

    return (
        <>
            <div className="grid p-fluid input-demo">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Enter the user ID</h5>
                        <span className="p-float-label">
                            <InputText
                                id="number"
                                type="text"
                                value={number}
                                onChange={(e) => setnumber(e.target.value)}
                            />
                            <label htmlFor="number">ID USER</label>
                        </span>
                    </div>
                </div>
                {/* consult user details if exists or not */}
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Consult Detail User</h5>
                        <div className="flex justify-content-center flex-wrap gap-2">
                            <Button onClick={handlegetUser} label="Consult " />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="col-12 md:col-6">
                    <div className="card p-fluid">
                        <h5>Update User</h5>

                        <div className="field">
                            <label htmlFor="login">Login</label>
                            <InputText id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                        </div>

                        <div className="field">
                            <label htmlFor="clave">Clave</label>
                            <InputText
                                id="clave"
                                type="password"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="sts">Sts</label>
                            <InputText id="sts" value={sts} onChange={(e) => setSts(e.target.value)} />
                        </div>

                        <div className="field">
                            <label htmlFor="tipo">Tipo</label>
                            <InputText id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                        </div>

                        <div className="flex justify-content-center flex-wrap gap-2">
                            <Toast ref={toast} />
                            <ConfirmPopup />
                            <Button onClick={confirm} icon="pi pi-check" label="Confirm" type="button" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateUser;
