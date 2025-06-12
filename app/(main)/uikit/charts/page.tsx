'use client';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';
import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import type { ChartDataState, ChartOptionsState } from '@/types';
import { TokenContext } from '../../context/TokenContext';
import axios from 'axios';
import { headers } from 'next/dist/client/components/headers';

const apiCars = process.env.NEXT_PUBLIC_CARS;

type statesdb = {
    id: number;
    file_name: string;
    state: number;
};

const ChartDemo = () => {
    const [options, setOptions] = useState<ChartOptionsState>({});
    const [data, setChartData] = useState<ChartDataState>({});

    const [array, setArray] = useState<statesdb[]>([]);

    const { layoutConfig } = useContext(LayoutContext);
    const { keyAccess } = useContext(TokenContext); // Trae el token

    useEffect(() => {
        console.log('the aray is .....');
        console.log(array);
    }, [array]);

    useEffect(() => {
        if (!keyAccess || keyAccess.trim() === '') return;

        const fetchData = async () => {
            const response = await axios.get(`${apiCars}getstates`, {
                headers: {
                    'x-api-token': keyAccess
                }
            });

            setArray(response.data.state as statesdb[]);
        };

        fetchData();
    }, [keyAccess]);

    // useEffect(() => {
    //     const documentStyle = getComputedStyle(document.documentElement);
    //     const textColor = documentStyle.getPropertyValue('--text-color') || '#495057';
    //     const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#6c757d';
    //     const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dfe7ef';

    //     const lineData: ChartData = {
    //         labels: ['1', '2', '3'],
    //         datasets: [
    //             {
    //                 label: 'First Carro1.pdf',
    //                 data: [80],
    //                 fill: false,
    //                 backgroundColor: documentStyle.getPropertyValue('--primary-500') || '#6366f1',
    //                 borderColor: documentStyle.getPropertyValue('--primary-500') || '#6366f1',
    //                 tension: 0.4
    //             },
    //             {
    //                 label: 'Second Dataset',
    //                 data: [28, 48, 40],
    //                 fill: false,
    //                 backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
    //                 borderColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
    //                 tension: 0.4
    //             },
    //             {
    //                 label: 'Carro2.txt',
    //                 data: [10, 10],
    //                 fill: false,
    //                 backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
    //                 borderColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
    //                 tension: 0.4
    //             },
    //             {
    //                 label: 'Carro2.txt',
    //                 data: [70, 70],
    //                 fill: false,
    //                 backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
    //                 borderColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
    //                 tension: 0.4
    //             }
    //         ]
    //     };

    //     const lineOptions: ChartOptions = {
    //         plugins: {
    //             legend: {
    //                 labels: {
    //                     color: textColor
    //                 }
    //             }
    //         },
    //         scales: {
    //             x: {
    //                 ticks: {
    //                     color: textColorSecondary
    //                 },
    //                 grid: {
    //                     color: surfaceBorder
    //                 },
    //                 border: {
    //                     display: false
    //                 }
    //             },
    //             y: {
    //                 ticks: {
    //                     color: textColorSecondary
    //                 },
    //                 grid: {
    //                     color: surfaceBorder
    //                 },
    //                 border: {
    //                     display: false
    //                 }
    //             }
    //         }
    //     };

    //     setOptions({
    //         lineOptions
    //     });
    //     setChartData({
    //         lineData
    //     });
    // }, [layoutConfig]);

    const generarGrafico = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#495057';
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#6c757d';
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dfe7ef';

        const lineData: ChartData = {
            labels: ['1', '2', '3'],
            datasets: [
                {
                    label: 'First Carro1.pdf',
                    data: [80],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500') || '#6366f1',
                    borderColor: documentStyle.getPropertyValue('--primary-500') || '#6366f1',
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
                    borderColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
                    tension: 0.4
                },
                {
                    label: 'Carro2.txt',
                    data: [10, 10],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
                    borderColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
                    tension: 0.4
                },
                {
                    label: 'Carro2.txt',
                    data: [70, 70],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
                    borderColor: documentStyle.getPropertyValue('--primary-200') || '#bcbdf9',
                    tension: 0.4
                }
            ]
        };

        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    },
                    border: {
                        display: false
                    }
                }
            }
        };

        setOptions({ lineOptions });
        setChartData({ lineData });
    };

    return (
        <>
            <div className='col-6 xl:col-6'>
                <button onClick={generarGrafico} className="p-button p-component p-button-primary mb-3">
                    Generar gráfico
                </button>
            </div>
            <div className="grid p-fluid">
                <div className="col-12 xl:col-12">
                    <div className="card">
                        <h5>Linear Chart</h5>

                        <Chart type="line" data={data.lineData} options={options.lineOptions}></Chart>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChartDemo;
