'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { TokenContext } from '@/app/(main)/context/TokenContext';
import useAuthRedirect from '@/app/(main)/hooks/useAuthRedirect';
import { InputNumber } from 'primereact/inputnumber';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { setSourceMapRange } from 'typescript';

const apiCars = process.env.NEXT_PUBLIC_CARS;

type Product = {
    id?: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
};

const CarsCrud = () => {
    useAuthRedirect(); // Redirige si no hay sesión
    const { keyAccess } = useContext(TokenContext); // Trae el token

    const [products, setProducts] = useState<Product[]>([]);
    const [productDialog, setProductDialog] = useState(false);
    const [productDialogUpdate, setProductDialogUpdate] = useState(false);
    const [product, setProduct] = useState<Product>({ id: '', nombre: '', descripcion: '', precio: 0, stock: 0 });
    const [submitted, setSubmitted] = useState(false);

    const [counterCars, setCounterCars] = useState(0);

    const [id, setId] = useState<string | undefined>('second');
    const [nombre, setNombre] = useState<string | undefined>('');
    const [descripcion, setDescripcion] = useState<string | undefined>('');
    const [precio, setPrecio] = useState<number | undefined>(0);
    const [stock, setStock] = useState<number | undefined>(0);
    const toast = useRef<Toast>(null);
    const [update, setUpdate] = useState<boolean>(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    useEffect(() => {
        if (!keyAccess || keyAccess.trim() === '') return;

        const fetchData = async () => {
            console.log('🔐 Token usado:', keyAccess);
            try {
                const response = await axios.get(`${apiCars}`, {
                    headers: {
                        'x-api-token': keyAccess
                    }
                });
                console.log('✅ Datos recibidos:', response);
                setProducts(response.data);
            } catch (error) {
                console.error('❌ Error al traer datos', error);
            }
        };

        fetchData();
    }, [keyAccess, counterCars]);

    const openNew = () => {
        setProduct({ id: '', nombre: '', descripcion: '', precio: 0, stock: 0 });
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const saveProduct = async () => {
        try {
            console.log(update);
            if (update) {
                console.log('we are going to update');

                const response = await axios.put(
                    `${apiCars}updateCar/${id}`,
                    { nombre, descripcion, precio, stock },
                    {
                        headers: {
                            'x-api-token': keyAccess,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setCounterCars((prev) => prev + 1);
                console.log(response);
                setProductDialog(false); /* this close the window */

                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Car Updated',
                    life: 3000
                });

                setUpdate(false);
            } else {
                setNombre('');
                setDescripcion('');
                setPrecio(0);
                setStock(0);

                console.log('product was saved');

                const response = await axios.post(
                    `${apiCars}addCar/`,
                    { nombre, descripcion, precio, stock },
                    {
                        headers: {
                            'x-api-token': keyAccess,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log(response);
                // setCounterCars((i) => i + 1);
                setCounterCars(counterCars + 1);

                setSubmitted(true);
                setProductDialog(false); /* this close the window */

                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Car Created',
                    life: 3000
                });
            }
        } catch (error) {}
    };

    const editProduct = (rowData: Product) => {
        console.log('we are going to bring the product');
        const { id, nombre, descripcion, precio, stock } = rowData;
        console.log(id, nombre, descripcion, precio, stock);
        setId(id);
        setNombre(nombre);
        setDescripcion(descripcion);
        setPrecio(precio);
        setStock(stock);

        setProductDialog(true);
        setUpdate(true); /* we update de button  */
    };

    const deleteProduct = (rowData: Product) => {
        console.log('we are going to delete the car');
        console.log(rowData);
        setId(rowData.id);
        setDeleteProductDialog(true);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof Product) => {
        let val: string = e.target.value;

        if (name === 'nombre') {
            setNombre(val);
        }
        if (name === 'descripcion') {
            setDescripcion(val);
        }
    };

    const onInputChangeNumber = (e: InputNumberValueChangeEvent, name: keyof Product) => {
        let val = e.value ?? 0;

        if (name === 'precio') {
            setPrecio(val);
        }
        if (name === 'stock') {
            setStock(val);
        }
    };

    const leftToolbarTemplate = () => <Button label="New" icon="pi pi-plus" className="mr-2" onClick={openNew} />;

    const actionBodyTemplate = (rowData: Product) => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success p-button-sm"
                onClick={() => editProduct(rowData)}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-sm"
                onClick={() => deleteProduct(rowData)}
            />
        </div>
    );

    const handleDeleteCar = async () => {
        try {
            const response = await axios.delete(`${apiCars}delCar/${id}`, {
                headers: {
                    'x-api-token': keyAccess
                }
            });
            setCounterCars((prev) => prev + 1);
            console.log(response);
            setDeleteProductDialog(false);
            toast.current?.show({
                severity: 'error',
                summary: 'Successful',
                detail: 'Car Deleted',
                life: 3000
            });
        } catch (error) {
            console.log('Error deleting car');
        }
    };

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={() => setDeleteProductDialog(false)} />
            <Button label="Yes" icon="pi pi-check" text onClick={handleDeleteCar} />
        </>
    );

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    return (
        <div className="card">
            <Toast ref={toast} /> {/* <- references at toast */}
            <Toolbar className="mb-4" left={leftToolbarTemplate} />
            <DataTable value={products} paginator rows={5} responsiveLayout="scroll">
                <Column field="id" header="ID" />
                <Column field="nombre" header="Name" />
                <Column field="descripcion" header="Description" />
                <Column field="stock" header="Stock" />
                <Column header="Acctions" body={actionBodyTemplate} />
                {/* <Column header="some" body={actionBodyTemplate} /> */}
            </DataTable>
            <Dialog
                visible={productDialog}
                style={{ width: '450px' }}
                header="Details of Cars"
                modal
                className="p-fluid"
                onHide={hideDialog}
                footer={
                    <>
                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
                    </>
                }
            >
                <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <InputText
                        id="nombre"
                        value={nombre}
                        onChange={(e) => onInputChange(e, 'nombre')}
                        required
                        autoFocus
                    />
                </div>

                <div className="field">
                    <label htmlFor="descripcion">Descripción</label>
                    <InputText id="descripcion" value={descripcion} onChange={(e) => onInputChange(e, 'descripcion')} />
                </div>

                <div className="field">
                    <label htmlFor="precio">Precio</label>
                    <InputNumber
                        id="precio"
                        value={precio}
                        onValueChange={(e) => onInputChangeNumber(e, 'precio')}
                        useGrouping={true} // opcional: evita comas en números grandes
                    />
                </div>

                <div className="field">
                    <label htmlFor="stock">Stock</label>
                    <InputNumber
                        id="stock"
                        value={stock}
                        onValueChange={(e) => onInputChangeNumber(e, 'stock')}
                        useGrouping={false} // opcional: evita comas en números grandes
                    />
                </div>
            </Dialog>
            <Dialog
                visible={deleteProductDialog}
                style={{ width: '450px' }}
                header="Confirm"
                modal
                footer={deleteProductDialogFooter}
                onHide={hideDeleteProductDialog}
            >
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to delete?</span>
                </div>
            </Dialog>
        </div>
    );
};

export default CarsCrud;
