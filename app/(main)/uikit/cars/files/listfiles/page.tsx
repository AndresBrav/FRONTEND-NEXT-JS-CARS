'use client';

import { TokenContext } from '@/app/(main)/context/TokenContext';
import axios from 'axios';
import { Button } from 'primereact/button';
import React, { useContext, useState } from 'react';
const apiCars = process.env.NEXT_PUBLIC_CARS;

const ListFiles = () => {
    const { keyAccess, setKeyAccess } = useContext(TokenContext); /* we bring the context */

    const [data, setData] = useState<string[] | null>(null);

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
            setData(response.data.files);
        } catch (error) {}
    };

    const DataviewGridItem = ({ filename }: { filename: string }) => {
        return (
            <div className="col-12 md:col-6 lg:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                        <div className="flex align-items-center">{/* <i className="pi pi-tag mr-2" /> */}</div>
                    </div>
                    <div className="flex flex-column align-items-center text-center mb-3">
                        <div className="text-2xl font-bold">{filename}</div>
                        {/* <Rating value={4} readOnly cancel={false} /> */}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        {/* <Button icon="pi pi-user" /> */}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="grid justify-content-center">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>List Files</h5>
                        <div className="flex justify-content-center flex-wrap gap-2">
                            <Button label="List " onClick={handleConsultClick} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h5>DataView</h5>
                <div className="grid">
                    {data ? data.map((i, j) => <DataviewGridItem key={j} filename={i} />) : <p>Cargando Archivos...</p>}
                </div>
            </div>
        </>
    );
};

export default ListFiles;
