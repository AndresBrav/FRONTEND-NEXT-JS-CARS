// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Rating } from 'primereact/rating';
// import { Button } from 'primereact/button';

// interface User {
//     id: number;
//     login: string;
//     clave: string;
//     sts: string;
//     tipo: string;
// }

// const ConsultDetails = () => {
//     const [data, setData] = useState<User[] | null>(null);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             // try {
//             //     const response = await fetch('http://localhost:4000/users/getUsers/', {
//             //         method: 'GET',
//             //         headers: {
//             //             'x-api-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiVVNFUjEiLCJ0IjoiYWRtaW4iLCJpYXQiOjE3NDg1NDE4MzQsImV4cCI6MTc0ODU1MjYzNH0.Rvdtul8jw2kdiym8r15V_BqK8eELYJcHHiW6DzEMfHA',
//             //             'Content-Type': 'application/json'
//             //         }
//             //     });
//             //     const jsonData: User[] = await response.json();
//             //     console.log('Datos reales:', jsonData); // <- aquí verás los datos
//             //     setData(jsonData);
//             // } catch (error) {
//             //     console.error('Error al obtener los usuarios:', error);
//             // }
//         };

//         fetchUsers();
//     }, []);

//     const Header = () => {
//         return (
//             <>
//                 <h1>this is another component</h1>
//             </>
//         );
//     };

//     const DataviewGridItem = () => {
//         return (
//             <div className="col-12 lg:col-4">
//                 <div className="card m-3 border-1 surface-border">
//                     <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
//                         <div className="flex align-items-center">
//                             <i className="pi pi-tag mr-2" />
//                             <span className="font-semibold">texto 1</span>
//                         </div>
//                         {/* <span className={`product-badge status-${data.inventoryStatus?.toLowerCase()}`}>{data.inventoryStatus}</span> */}
//                     </div>
//                     <div className="flex flex-column align-items-center text-center mb-3">
//                         {/* <img src={`/demo/images/product/${data.image}`} alt='nombre' className="w-9 shadow-2 my-3 mx-0" /> */}
//                         <div className="text-2xl font-bold">nombre</div>
//                         <div className="mb-3">description</div>
//                         <Rating value={4} readOnly cancel={false} />
//                     </div>
//                     <div className="flex align-items-center justify-content-between">
//                         <span className="text-2xl font-semibold">precio</span>
//                         {/* <Button icon="pi pi-shopping-cart" disabled={'OUTOFSTOCK'} /> */}
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <>
//             <div>we are going to consult Details</div>
//             <Header />
//             <div className="grid">
//                 <div className="col-12">
//                     <div className="card">
//                         <h5>DataView</h5>
//                         <DataviewGridItem />
//                         <DataviewGridItem />
//                         <DataviewGridItem />
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <h1>Datos desde API</h1>
//                 {/* {data ? (
//                     <ul>
//                         {data.map((user) => (
//                             <li key={user.id}>
//                                 {user.login} - {user.clave}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Cargando usuarios...</p>
//                 )} */}
//             </div>
//         </>
//     );
// };

// export default ConsultDetails;
'use client';
import React, { useEffect, useState } from 'react';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';

interface User {
    id: number;
    login: string;
    clave: string;
    sts: string;
    tipo: string;
}



const ConsultDetails = () => {
    const [data, setData] = useState<User[] | null>(null);


    const mockData: User[] = [
    { id: 1, login: 'admin', clave: '1234', sts: 'activo', tipo: 'admin' },
    { id: 2, login: 'johndoe', clave: 'abcd', sts: 'inactivo', tipo: 'usuario' },
    { id: 3, login: 'janedoe', clave: 'pass', sts: 'activo', tipo: 'moderador' },
    { id: 4, login: 'maria', clave: 'qwerty', sts: 'activo', tipo: 'admin' },
    { id: 5, login: 'carlos', clave: 'zxcv', sts: 'inactivo', tipo: 'usuario' },
    { id: 6, login: 'laura', clave: '9876', sts: 'activo', tipo: 'usuario' },
    { id: 6, login: 'laura', clave: '9876', sts: 'activo', tipo: 'usuario' }
];


    useEffect(() => {
        setData(mockData);
    }, []);

    const Header = () => <h1>this is another component</h1>;

    const DataviewGridItem = ({ user }: { user: User }) => {
        return (
            <div className="col-12 md:col-6 lg:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" />
                            <span className="font-semibold">{user.login}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center text-center mb-3">
                        <div className="text-2xl font-bold">{user.tipo}</div>
                        <div className="mb-3">{user.sts}</div>
                        <Rating value={4} readOnly cancel={false} />
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">ID: {user.id}</span>
                        <Button icon="pi pi-user" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div>we are going to consult Details</div>
            <Header />
            <div className="card">
                <h5>DataView</h5>
                <div className="grid">{data ? data.map((user) => <DataviewGridItem key={user.id} user={user} />) : <p>Cargando usuarios...</p>}</div>
            </div>
        </>
    );
};

export default ConsultDetails;
