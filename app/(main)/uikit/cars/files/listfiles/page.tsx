'use client';

import { TokenContext } from '@/app/(main)/context/TokenContext';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useContext, useState } from 'react';
const apiCars = process.env.NEXT_PUBLIC_CARS;

const ListFiles = () => {
    const { keyAccess, setKeyAccess } = useContext(TokenContext); /* we bring the context */

    // const [data, setData] = useState<string[] | null>(null);
    const [data, setData] = useState<{ name: string }[]>([]);

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

    const handleSaveList = async() => {
        try {
            console.log("we are going to save the file ")
        } catch (error) {
            
        }
    }

    
    return (
        <>
            <div className="grid ">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>List Files</h5>
                        <div className="flex justify-content-center flex-wrap gap-2">
                            <Button label="List " onClick={handleConsultClick} />
                        </div>
                    </div>
                </div>

                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Save List Files</h5>
                        <div className="flex justify-content-center flex-wrap gap-2">
                            <Button label="Save List " onClick={handleSaveList} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Files</h5>
                    <DataTable value={data} rows={10} paginator responsiveLayout="scroll">
                        <Column field="name" header="Name" sortable style={{ width: '35%' }} />
                    </DataTable>
                </div>
            </div>
        </>
    );
};

export default ListFiles;
