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

const apiCars = process.env.NEXT_PUBLIC_CARS;

type File = {
    tipoGuardado: string;
    id?: string;
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

    const handleSaveListCars = async () => {
        try {
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

    const handleUploadFTP = () => {
        console.log('Función: Upload FTP');
    };

    const handleGenerateB64 = () => {
        console.log('Función: Generate B64');
    };

    const handleConvertB64ToFile = () => {
        console.log('Función: Convert B64 to File');
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
            command: handleUploadFTP
        },
        {
            label: 'Generate B64',
            command: handleGenerateB64
        },
        {
            label: 'Convert B64 to File',
            command: handleConvertB64ToFile
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
                header="Detalles del producto"
                modal
                className="p-fluid"
                onHide={hideDialog}
                footer={
                    <>
                        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                        <Button
                            label="Guardar"
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
                            label="Cancelar"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => {
                                setOneDialog(false);
                            }}
                        />
                        <Button
                            label="Guardar"
                            icon="pi pi-check"
                            className="p-button-text"
                            onClick={handleSaveOneCar}
                        />
                    </>
                }
            >
                <div className="field">
                    <label htmlFor="id">Tipo de Guardado</label>
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
        </>
    );
};

export default ListFiles;
