/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '@/types';
import { ChartData, ChartOptions } from 'chart.js';

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const [products, setProducts] = useState<Demo.Product[]>([]);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    return (
        // <div className="grid">
        //     <div className="col-12 lg:col-6 xl:col-3">
        //         <div className="card mb-0">
        //             <div className="flex justify-content-between mb-3">
        //                 <div>
        //                     <span className="block text-500 font-medium mb-3">Orders</span>
        //                     <div className="text-900 font-medium text-xl">152</div>
        //                 </div>
        //                 <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
        //                     <i className="pi pi-shopping-cart text-blue-500 text-xl" />
        //                 </div>
        //             </div>
        //             <span className="text-green-500 font-medium">24 new </span>
        //             <span className="text-500">since last visit</span>
        //         </div>
        //     </div>
        //     <div className="col-12 lg:col-6 xl:col-3">
        //         <div className="card mb-0">
        //             <div className="flex justify-content-between mb-3">
        //                 <div>
        //                     <span className="block text-500 font-medium mb-3">Revenue</span>
        //                     <div className="text-900 font-medium text-xl">$2.100</div>
        //                 </div>
        //                 <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
        //                     <i className="pi pi-map-marker text-orange-500 text-xl" />
        //                 </div>
        //             </div>
        //             <span className="text-green-500 font-medium">%52+ </span>
        //             <span className="text-500">since last week</span>
        //         </div>
        //     </div>
        //     <div className="col-12 lg:col-6 xl:col-3">
        //         <div className="card mb-0">
        //             <div className="flex justify-content-between mb-3">
        //                 <div>
        //                     <span className="block text-500 font-medium mb-3">Customers</span>
        //                     <div className="text-900 font-medium text-xl">28441</div>
        //                 </div>
        //                 <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
        //                     <i className="pi pi-inbox text-cyan-500 text-xl" />
        //                 </div>
        //             </div>
        //             <span className="text-green-500 font-medium">520 </span>
        //             <span className="text-500">newly registered</span>
        //         </div>
        //     </div>
        //     <div className="col-12 lg:col-6 xl:col-3">
        //         <div className="card mb-0">
        //             <div className="flex justify-content-between mb-3">
        //                 <div>
        //                     <span className="block text-500 font-medium mb-3">Comments</span>
        //                     <div className="text-900 font-medium text-xl">152 Unread</div>
        //                 </div>
        //                 <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
        //                     <i className="pi pi-comment text-purple-500 text-xl" />
        //                 </div>
        //             </div>
        //             <span className="text-green-500 font-medium">85 </span>
        //             <span className="text-500">responded</span>
        //         </div>
        //     </div>

        //     <div className="col-12 xl:col-6">
        //         <div className="card">
        //             <h5>Recent Sales</h5>
        //             <DataTable value={products} rows={5} paginator responsiveLayout="scroll">
        //                 <Column header="Image" body={(data) => <img className="shadow-2" src={`/demo/images/product/${data.image}`} alt={data.image} width="50" />} />
        //                 <Column field="name" header="Name" sortable style={{ width: '35%' }} />
        //                 <Column field="price" header="Price" sortable style={{ width: '35%' }} body={(data) => formatCurrency(data.price)} />
        //                 <Column
        //                     header="View"
        //                     style={{ width: '15%' }}
        //                     body={() => (
        //                         <>
        //                             <Button icon="pi pi-search" text />
        //                         </>
        //                     )}
        //                 />
        //             </DataTable>
        //         </div>
        //     </div>
        // </div>
        <>
            <div className="overflow-hidden">
                <div
                    className="bg-cover bg-no-repeat bg-center bg-primary border-round h-25rem w-full"
                    style={{
                        backgroundImage:
                            "url('https://img.freepik.com/free-photo/3d-car-with-vibrant-colors_23-2150796954.jpg?t=st=1748269885~exp=1748273485~hmac=ee769a71f4931eae65ce681061a195d255ea82ffa2319350fd47833ff25404c6&w=826')"
                    }}
                ></div>
            </div>
            {/* <div className="flex justify-content-center align-items-center flex-wrap">
                <h1 className="text-3xl text-primary">
                    Cars is a specialized vehicle-management platform that lets users efficiently oversee an entire car
                    inventory. Through an intuitive and secure interface, administrators can perform full CRUD
                    operations Create, Read, Update, and Delete on every vehicle record.
                </h1>
            </div>
             */}
            <div className="flex justify-content-center align-items-center flex-wrap text-center px-4">
                <div className="max-w-30rem">
                    <h1 className="text-3xl text-red-500 mb-3">Cars – Vehicle Management Platform</h1>
                    <p className="text-lg line-height-3">
                        Cars is a specialized vehicle-management platform that lets users efficiently oversee an entire
                        car inventory. Through an intuitive and secure interface, administrators can perform full CRUD
                        operations—Create, Read, Update, and Delete—on every vehicle record.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
