// 'use client';

// import { useMemo, useState } from 'react';

// const SimpleExample = () => {
//     const [number1, setNumber1] = useState(0);
//     const [number2, setNumber2] = useState(0);

//     // Usamos useMemo para memorizar la suma de number1 y number2
//     const sum = useMemo(() => {
//         console.log('Calculating sum...');
//         return number1 + number2;
//     }, [number1,number2]);

//     return (
//         <div>
//             <input type="number" value={number1} onChange={(e) => setNumber1(parseInt(e.target.value) || 0)} />
//             <input type="number" value={number2} onChange={(e) => setNumber2(parseInt(e.target.value) || 0)} />
//             <p>Sum: {sum}</p>
//         </div>
//     );
// };

// export default SimpleExample;

// 'use client';
// import { useMemo, useState } from 'react';

// const MemoExample = () => {
//     const [a, setA] = useState(5);
//     const [b, setB] = useState(8);

//     const result = useMemo(() => {
//         console.log('🔁 Calculando a + b');
//         return a + b;           /* Se vuelve a calcular solo si a o b cambian */
//     }, [a,b]);

//     return (
//         <div>
//             <p>a + b = {result}</p>
//             <button onClick={() => setA((prev) => prev + 1)}>Incrementar a</button>
//             <button onClick={() => setB((prev) => prev + 1)}>Incrementar b</button>
//         </div>
//     );
// };

// export default MemoExample

'use client'

import React, { useState, useMemo } from 'react';

// Simulamos una lista grande de usuarios
const generateUsers = () => {
    const users = [];
    for (let i = 0; i < 10000; i++) {
        users.push({ id: i, name: `Usuario ${i}` });
    }
    return users;
};

const UserList = () => {
    const [search, setSearch] = useState('');
    const users = useMemo(() => generateUsers(), []); // Solo se genera una vez

    // 💡 Esta es la parte costosa
    const filteredUsers = useMemo(() => {
        console.log('🔍 Filtrando usuarios...');
        return users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
    }, [search, users]);

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Lista de Usuarios</h2>
            <input
                type="text"
                placeholder="Buscar usuario..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <p>Mostrando {filteredUsers.length} usuarios</p>
            <ul>
                {filteredUsers.slice(0, 10).map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
