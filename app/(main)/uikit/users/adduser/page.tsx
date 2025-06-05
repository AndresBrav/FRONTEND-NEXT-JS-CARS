'use client';
import React, { useState, useContext, FormEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios, { AxiosResponse } from 'axios';
import useAuthRedirect from '@/app/(main)/hooks/useAuthRedirect';
import { TokenContext } from '@/app/(main)/context/TokenContext';
import { log } from 'console';
const apiUsers = process.env.NEXT_PUBLIC_USERS;

const AddUser = () => {
    useAuthRedirect();
    const [login, setLogin] = useState<string>('');
    const [clave, setClave] = useState<string>('');
    const [sts, setSts] = useState<string>('');
    const [tipo, setTipo] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const { keyAccess, setKeyAccess } = useContext(TokenContext); /* we bring the context */

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita el refresco del formulario
        console.log(login);
        console.log(clave);
        try {
            const response: AxiosResponse = await axios.post(
                `${apiUsers}addUser/`,
                {
                    login,
                    clave,
                    sts,
                    tipo
                },
                {
                    headers: {
                        'x-api-token': keyAccess,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response);
            
            if(response.data.msg){
                setLogin("")
                setClave("")
                setSts("")
                setTipo("")
                setMsg(response.data.msg as string);
            }


            // console.log('User added successfully:', response.data);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Add User</h5>

                        <div className="field">
                            <label htmlFor="login">Login</label>
                            <InputText
                                id="login"
                                type="text"
                                placeholder="Write a login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="clave">Clave</label>
                            <InputText
                                id="clave"
                                type="password"
                                placeholder="Write a clave"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="sts">Sts</label>
                            <InputText
                                id="sts"
                                type="text"
                                placeholder="Write a sts"
                                value={sts}
                                onChange={(e) => setSts(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="tipo">Tipo</label>
                            <InputText
                                id="tipo"
                                type="text"
                                placeholder="Write a tipo"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-content-center flex-wrap gap-2">
                            <Button type="submit" label="Submit" />
                        </div>
                    </form>
                </div>
            </div>
            {msg && (
                <div className="col-12 md:col-6" style={{ borderRadius: '53px' }}>
                    <div className="card">
                        <span className="text-blue-500 font-bold text-3xl">403</span>
                        <h1 className="text-900 font-bold text-5xl mb-2">{msg}</h1>
                        {/* <div className="text-600 mb-5">hola</div> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddUser;
