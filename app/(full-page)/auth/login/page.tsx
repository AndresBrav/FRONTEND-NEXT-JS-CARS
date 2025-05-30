/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import axios, { AxiosResponse } from 'axios';
import { TokenContext } from '@/app/(main)/context/TokenContext';

const apilogin = process.env.NEXT_PUBLIC_AUTH_USERS;

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const [login, setlogin] = useState<string>('');
    const [clave, setClave] = useState<string>('');
    const { keyAccess, setKeyAccess } = useContext(TokenContext);

    const router = useRouter();
    const containerClassName = classNames(
        'surface-ground flex align-items-center justify-content-center overflow-hidden',
        { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
    );

    const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setlogin(e.target.value);
    };

    const handleClave = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClave(e.target.value);
    };

    const handleStart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response: AxiosResponse = await axios.post(
                `${apilogin}`,
                { login, clave },
                { headers: { 'Content-Type': 'application/json' } }
            );

            setKeyAccess(response.data.result.token);
            console.log(response.data.result.token);
            // router.push('/');
        } catch (error) {
            console.log("Error bringing datas")
        }
    };

    useEffect(() => {
        if (keyAccess) { //  Use token from context
            router.push('/');
        }
    },[keyAccess])

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img
                    src={`/layout/images/car-${
                        layoutConfig.colorScheme === 'light' ? 'dark' : 'white'
                    }.svg`}
                    alt="Sakai logo"
                    className="mb-5 w-3rem  flex-shrink-0"
                />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.6rem',
                        background:
                            'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    {/* <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}> */}
                    {/* <div className="surface-card py-8 px-5 sm:px-8 w-20rem  sm:w-30rem" style={{ borderRadius: '53px' }}> */}
                    <div
                        className="surface-card p-4 sm:p-6 w-20rem sm:w-25rem"
                        style={{ borderRadius: '30px' }}
                    >
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">
                                Welcome
                            </div>
                            <span className="text-600 font-medium">
                                Sign in to continue
                            </span>
                        </div>

                        <div>
                            <label
                                htmlFor="email1"
                                className="block text-900 text-xl font-medium mb-2"
                            >
                                login
                            </label>
                            {/* <InputText id="email1" type="text" placeholder="login address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} /> */}
                            <InputText
                                value={login}
                                id="email1"
                                type="text"
                                placeholder="login address"
                                className="w-full mb-4"
                                style={{ padding: '1rem' }}
                                onChange={handleLogin}
                            />

                            <label
                                htmlFor="password1"
                                className="block text-900 font-medium text-xl mb-2"
                            >
                                clave
                            </label>
                            <Password
                                inputId="password1"
                                value={clave}
                                onChange={handleClave}
                                placeholder="Password"
                                toggleMask
                                className="w-full mb-5"
                                inputClassName="w-full p-3 md:w-30rem"
                            ></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox
                                        inputId="rememberme1"
                                        checked={checked}
                                        onChange={(e) =>
                                            setChecked(e.checked ?? false)
                                        }
                                        className="mr-2"
                                    ></Checkbox>
                                    <label htmlFor="rememberme1">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <Button
                                label="Sign In"
                                className="w-full p-3 text-xl"
                                onClick={handleStart}
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
