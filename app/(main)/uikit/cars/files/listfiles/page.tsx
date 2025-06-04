'use client';

import { TokenContext } from '@/app/(main)/context/TokenContext';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useContext, useRef, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Extension } from 'typescript';

const apiCars = process.env.NEXT_PUBLIC_CARS;

type File = {
    tipoGuardado: string;
    id?: string;
    nombreArchivo?: string;
    TipoTransferencia?: string;
    host?: string;
    user?: string;
    password?: string;
    b64data?: string;
    extension?: string;
};

const ListFiles = () => {
    const { keyAccess, setKeyAccess } = useContext(TokenContext); /* we bring the context */

    // const [data, setData] = useState<string[] | null>(null);
    const [data, setData] = useState<{ name: string }[]>([]);

    const [productDialog, setProductDialog] = useState<boolean>(false);
    const [oneDialog, setOneDialog] = useState<boolean>(false);
    const [id, setId] = useState<string>('');

    const [tipoGuardado, setTipoGuardado] = useState<string>('');
    const toast = useRef<Toast>(null);

    // upload server ftp
    const [serverdialog, setServerdialog] = useState<boolean>(false);
    const [nombreArchivo, setNombreArchivo] = useState<string>('');
    const [TipoTransferencia, setTipoTransferencia] = useState<string>('binary');
    const [host, setHost] = useState<string>('127.0.0.1');
    const [user, setUser] = useState<string>('ftpuser');
    const [password, setPassword] = useState<string>('123');

    // return Base 64
    const [b64dialog, setB64dialog] = useState<boolean>(false);
    const [b64data, setb64data] = useState<string>('');
    //Convert B64 to file
    const [extension, setExtension] = useState('pdf');
    const [convert6b4dialog, setConvert6b4dialog] = useState<boolean>(false);

    const handleSaveListCars = async () => {
        try {
            if (!tipoGuardado.trim()) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Field is required',
                    detail: 'Please, write "pdf" or "txt"',
                    life: 4000
                });
                return;
            }

            console.log('we arrive here');
            const response = await axios.post(
                `${apiCars}savePdf/list/`,
                { tipoGuardado },
                {
                    headers: {
                        'x-api-token': keyAccess
                    }
                }
            );

            console.log(response);
            toast.current?.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'List Car Saved',
                life: 4000
            });

            setTipoGuardado('');
            setProductDialog(false); /* we close the modal */
        } catch (error) {}
        // console.log('Función: Save List Cars');
    };

    const handleSaveOneCar = async () => {
        try {
            // console.log('Function: Save One Car');
            // console.log(id);
            // console.log(tipoGuardado);

            if (!tipoGuardado.trim()) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Field is required',
                    detail: 'Please, write "pdf" or "txt"',
                    life: 4000
                });
                return;
            }

            if (!id.trim()) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Field is required',
                    detail: 'Please, write car ID',
                    life: 4000
                });
                return;
            }

            const response = await axios.post(
                `${apiCars}saveOnePdf/list/${id}`,
                { tipoGuardado },
                {
                    headers: {
                        'x-api-token': keyAccess
                    }
                }
            );

            // console.log(response);
            setOneDialog(false);
            setId('');
            setTipoGuardado('');
            toast.current?.show({
                severity: 'success',
                summary: 'Successful',
                detail: ' Car Saved',
                life: 4000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'An error occurred',
                life: 4000
            });
        }
    };

    const handleUploadFTP = async () => {
        // console.log('Función: Upload FTP');
        try {
            const response = await axios.post(
                `${apiCars}uploadListServer`,
                {
                    nombreArchivo,
                    TipoTransferencia,
                    host,
                    user,
                    password
                },
                {
                    headers: {
                        'x-api-token': keyAccess,
                        'Content-Type': 'application/json'
                    }
                }
            );
            toast.current?.show({
                severity: 'success',
                summary: 'Successful',
                detail: ' Car was uploaded FTP',
                life: 4000
            });

            setNombreArchivo('');
            setServerdialog(false);
            // console.log(response)
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Car was not uploaded',
                life: 4000
            });
        }
    };

    const handleGenerateB64 = async () => {
        try {
            const response = await axios.post(
                `${apiCars}returnBase64File`,
                { nombreArchivo },
                {
                    headers: {
                        'x-api-token': keyAccess
                    }
                }
            );
            console.log(response);
            setb64data(response.data.base64);

            // setB64dialog(false); /* close the modal */
            toast.current?.show({
                severity: 'success',
                summary: 'Successful',
                detail: ' B64 was generated',
                life: 8000
            });

            setNombreArchivo('');
        } catch (error) {}
    };

    const handleConvertB64ToFile = async () => {
        try {
            const response = await axios.post(
                `${apiCars}ConvertBase64toFile`,
                { base64Data: b64data, nombreArchivo, extension },
                {
                    headers: {
                        'x-api-token': keyAccess
                    }
                }
            );
            console.log(response);
            toast.current?.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'file was converted',
                life: 4000
            });
            setConvert6b4dialog(false); /* we close the modal */
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Car was not converted',
                life: 4000
            });
        }
    };

    // Array de opciones para el SplitButton
    const toolbarItems = [
        {
            label: 'Save List Cars',
            command: () => {
                setProductDialog(true); /* we activate the modal */
            }
        },
        {
            label: 'Save One Car',
            command: () => {
                setOneDialog(true);
            }
        },
        {
            label: 'Upload FTP',
            command: () => {
                setServerdialog(true);
            }
        },
        {
            label: 'Generate B64',
            command: () => {
                setB64dialog(true);
            }
        },
        {
            label: 'Convert B64 to File',
            command: () => {
                setConvert6b4dialog(true);
            }
        }
    ];

    const handleConsultClick = async () => {
        try {
            console.log('we list the files');
            const response = await axios.get(`${apiCars}listFiles`, {
                headers: {
                    'x-api-token': keyAccess
                    // 'Content-Type': 'application/json' just use in post or update sent the information in JSON
                }
            });
            console.log(response);
            // setData(response.data.files);
            setData(response.data.files.map((name: string) => ({ name })));
        } catch (error) {}
    };

    const handleSaveList = async () => {
        try {
            console.log('we are going to save the file ');
        } catch (error) {}
    };

    // returning tsx

    const toolbarRightTemplate = (
        <SplitButton label="Options" model={toolbarItems} menuStyle={{ width: '12rem' }}></SplitButton>
    );

    const hideDialog = () => {
        setProductDialog(false);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof File) => {
        let val: string = e.target.value;

        if (name === 'id') {
            setId(val);
        }
        if (name === 'tipoGuardado') {
            setTipoGuardado(val);
        }
        if (name === 'nombreArchivo') {
            setNombreArchivo(val);
        }
        if (name === 'TipoTransferencia') {
            setTipoTransferencia(val);
        }
        if (name === 'host') {
            setHost(val);
        }
        if (name === 'user') {
            setUser(val);
        }
        if (name === 'password') {
            setPassword(val);
        }

        if (name === 'extension') {
            setExtension(val);
        }
    };

    return (
        <>
            <Toast ref={toast} /> {/* <- references at toast */}
            <div className="grid ">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>List Files</h5>
                        <div className="flex justify-content-center flex-wrap gap-2">
                            <Button label="List " onClick={handleConsultClick} />
                        </div>
                    </div>
                </div>

                {/* list files */}
                <div className="col-12 xl:col-6">
                    <div className="card">
                        <h5>Options Files</h5>
                        <Toolbar start={toolbarRightTemplate}></Toolbar>
                    </div>
                </div>
            </div>
            <div className="grid">
                <div className="col-12 xl:col-6">
                    <div className="card">
                        <h5>Files</h5>
                        <DataTable value={data} rows={10} paginator responsiveLayout="scroll">
                            <Column field="name" header="Name" sortable style={{ width: '35%' }} />
                        </DataTable>
                    </div>
                </div>
            </div>
            <Dialog
                visible={productDialog}
                style={{ width: '450px' }}
                header="File Details"
                modal
                className="p-fluid"
                onHide={hideDialog}
                footer={
                    <>
                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={handleSaveListCars}
                        />
                    </>
                }
            >
                <div className="field">
                    <label htmlFor="tipoGuardado">Tipo de Guardado</label>
                    <InputText
                        id="tipoGuardado"
                        value={tipoGuardado}
                        onChange={(e) => onInputChange(e, 'tipoGuardado')}
                        placeholder="Write pdf or txt"
                        required
                        autoFocus
                    />
                </div>
            </Dialog>
            {/* save one file dialog */}
            <Dialog
                visible={oneDialog}
                style={{ width: '450px' }}
                header="Save file"
                modal
                className="p-fluid"
                onHide={() => {
                    setOneDialog(false);
                }}
                footer={
                    <>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => {
                                setOneDialog(false);
                            }}
                        />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={handleSaveOneCar}
                        />
                    </>
                }
            >
                <div className="field">
                    <label htmlFor="id">ID car</label>
                    <InputText
                        id="id"
                        value={id}
                        onChange={(e) => onInputChange(e, 'id')}
                        placeholder="type the id of the car to be saved"
                        required
                        autoFocus
                    />
                </div>
                <div className="field">
                    <label htmlFor="tipoGuardado">Tipo de Guardado</label>
                    <InputText
                        id="tipoGuardado"
                        value={tipoGuardado}
                        onChange={(e) => onInputChange(e, 'tipoGuardado')}
                        placeholder="Write pdf or txt"
                        required
                        autoFocus
                    />
                </div>
            </Dialog>
            {/* upload to server ftp*/}
            <Dialog
                visible={serverdialog}
                style={{ width: '450px' }}
                header="Upload file FTP"
                modal
                className="p-fluid"
                onHide={() => {
                    setServerdialog(false);
                }}
                footer={
                    <>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => {
                                setServerdialog(false);
                            }}
                        />
                        <Button
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={handleUploadFTP}
                        />
                    </>
                }
            >
                <div className="field">
                    <label htmlFor="id">Name file</label>
                    <InputText
                        id="nombreArchivo"
                        value={nombreArchivo}
                        onChange={(e) => onInputChange(e, 'nombreArchivo')}
                        placeholder="type the name of the file"
                        required
                        autoFocus
                    />
                </div>
                <div className="field">
                    <label htmlFor="TipoTransferencia">Tipe of Transfer</label>
                    <InputText
                        id="TipoTransferencia"
                        value={TipoTransferencia}
                        onChange={(e) => onInputChange(e, 'TipoTransferencia')}
                        placeholder="Write binary or text"
                        required
                        autoFocus
                    />
                </div>
                <div className="field">
                    <label htmlFor="host">Host</label>
                    <InputText
                        id="host"
                        value={host}
                        onChange={(e) => onInputChange(e, 'host')}
                        placeholder="Write the host"
                        required
                        autoFocus
                    />
                </div>
                <div className="field">
                    <label htmlFor="user">User</label>
                    <InputText
                        id="user"
                        value={user}
                        onChange={(e) => onInputChange(e, 'user')}
                        placeholder="Write the user"
                        required
                        autoFocus
                    />
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <InputText
                        id="password"
                        value={password}
                        onChange={(e) => onInputChange(e, 'password')}
                        placeholder="Write the password"
                        required
                        autoFocus
                    />
                </div>
            </Dialog>
            <Dialog
                visible={b64dialog}
                style={{ width: '450px' }}
                header="return Base 64"
                modal
                className="p-fluid"
                onHide={() => {
                    setB64dialog(false);
                }}
                footer={
                    <>
                        <Button
                            label="Close"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => {
                                setB64dialog(false);
                            }}
                        />
                        <Button
                            label="Acept"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={handleGenerateB64}
                        />
                    </>
                }
            >
                <div className="field">
                    <label htmlFor="nombreArchivo">file name</label>
                    <InputText
                        id="nombreArchivo"
                        value={nombreArchivo}
                        onChange={(e) => onInputChange(e, 'nombreArchivo')}
                        placeholder="Write the file name"
                        required
                        autoFocus
                    />
                </div>
                <div className="field">
                    <label htmlFor="b64data">Base 64</label>
                    <InputTextarea
                        id="b64data"
                        value={b64data}
                        // onChange={(e) => onInputChange(e, 'b64data')}
                        placeholder="The code B64 is"
                        required
                        autoFocus
                        rows={5}
                        cols={30}
                    />
                </div>
            </Dialog>
            <Dialog
                visible={convert6b4dialog}
                style={{ width: '450px' }}
                header="return Base 64"
                modal
                className="p-fluid"
                onHide={() => {
                    setConvert6b4dialog(false);
                }}
                footer={
                    <>
                        <Button
                            label="Close"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => {
                                setConvert6b4dialog(false);
                            }}
                        />
                        <Button
                            label="Acept"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={handleConvertB64ToFile}
                        />
                    </>
                }
            >
                <div className="field">
                    <label htmlFor="b64data">Base 64</label>
                    <InputTextarea
                        id="b64data"
                        value={b64data}
                        // onChange={(e) => onInputChange(e, 'b64data')}
                        onChange={(e) => setb64data(e.target.value)}
                        placeholder="The code B64 is"
                        required
                        autoFocus
                        rows={5}
                        cols={30}
                    />
                </div>
                <div className="field">
                    <label htmlFor="nombreArchivo">file name</label>
                    <InputText
                        id="nombreArchivo"
                        value={nombreArchivo}
                        onChange={(e) => onInputChange(e, 'nombreArchivo')}
                        placeholder="Write the file name"
                        required
                        autoFocus
                    />
                </div>

                <div className="field">
                    <label htmlFor="extension">Extension</label>
                    <InputText
                        id="extension"
                        value={extension}
                        onChange={(e) => onInputChange(e, 'extension')}
                        placeholder="Write the extension pdf or txt"
                        required
                        autoFocus
                    />
                </div>
            </Dialog>
        </>
    );
};

export default ListFiles;
