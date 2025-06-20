// 'use client';
// import { useCallback, useState } from 'react';

// const CallbackExample = () => {
//     const [count, setCount] = useState(0);

//     const handleClick = useCallback(() => {  /* la funcion no se vuelve a crear con useCallback */
//         console.log('🧠 Función memorizada');
//         setCount((prev) => prev + 1);
//     }, []);

//     return (
//         <div>
//             <p>Count: {count}</p>
//             <button onClick={handleClick}>Incrementar</button>
//         </div>
//     );
// };

// export default CallbackExample;

// 'use client';
// import { useCallback, useEffect, useState } from 'react';

// const CounterExample = () => {
//     const [counter, setCounter] = useState(0);

//     /* // Función memorizada que se ejecuta cuando cambia el contador
//     const showResult = useCallback(() => {
//         console.log('El contador cambió. Nuevo valor:', counter);
//     }, [counter]); */

//     // Esto causa que useEffect se dispare en cada render
//     const showResult = () => {
//         console.log('El contador cambió. Nuevo valor:', counter);
//     };

//     // Este efecto se ejecuta cada vez que cambia `counter`,
//     // y usa la versión memorizada de showResult
//     useEffect(() => {
//         showResult();
//     }, [showResult]);

//     return (
//         <>
//             <h1>Counter is</h1>
//             <button style={{ width: '50px', height: '50px' }} onClick={() => setCounter((prev) => prev + 1)}>
//                 +1
//             </button>
//             <h1>{counter}</h1>
//         </>
//     );
// };

// export default CounterExample;

// 'use client';
// import { useCallback, useEffect, useState } from 'react';

// const CounterExample = () => {
//     const [counter, setCounter] = useState(0);
//     const [other, setOther] = useState(false); // 👉 otro estado que no afecta a `counter`

//     // const showResult = () => {
//     //     console.log('Sin useCallback:', counter);
//     // };

//     const showResult = useCallback(() => {
//         console.log('Con useCallback:', counter);
//     }, [counter]);

//     useEffect(() => {
//         showResult();
//     }, [showResult]);

//     return (
//         <>
//             <h1>Counter is</h1>
//             <button onClick={() => setCounter((prev) => prev + 1)}>+1</button>
//             <button onClick={() => setOther((prev) => !prev)}>Forzar render</button>
//         </>
//     );
// };

// export default CounterExample;

// 'use client';
// import React, { useState, useCallback } from 'react';

// // Componente hijo que recibe una función por props
// const IncrementButton = React.memo(({ onIncrement }: { onIncrement: () => void }) => {
//     console.log('🔁 Render <IncrementButton>');
//     return <button onClick={onIncrement}>Incrementar</button>;
// });

// const Counter = () => {
//     const [count, setCount] = useState(0);
//     const [text, setText] = useState('');

//     // SIN useCallback → esta función se crea de nuevo en cada render, provocando que IncrementButton se re-renderice
//     const increment = useCallback(() => {
//         // console.log("render")
//         setCount((prev) => prev + 1);
//     }, []);

//     return (
//         <div>
//             <h2>Contador: {count}</h2>
//             <IncrementButton onIncrement={increment} />

//             <input
//                 type="text"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Texto para probar render"
//             />
//         </div>
//     );
// };

// export default Counter;

// 'use client';
// import { useCallback } from 'react';
// import React from 'react';

// const Child = React.memo(({ onClick }: { onClick: () => void }) => {
//     console.log('🔁 Render Child');
//     return <button onClick={onClick}>Click me</button>;
// });

// const Parent = () => {
//     // const handleClick = () => {
//     //     console.log('Click');
//     // };

//     const handleClick = useCallback(() => {
//         console.log('Click');
//     }, []); // ✅ la referencia se mantiene

//     return <Child onClick={handleClick} />; // ❌ handleClick es una nueva función en cada render
// };

// export default Parent;

'use client';
import { useCallback } from 'react';
import React from 'react';

const Child = ({ onClick }: { onClick: () => void }) => {
    console.log('🔁 Render Child');
    return <button onClick={onClick}>Click me</button>;
};

const Parent = () => {
    // const handleClick = useCallback(() => {
    //     console.log('Click');
    // }, []);

    const handleClick = () => {
        console.log('Click');
    };

    return <Child onClick={handleClick} />;
    
};

export default Parent;
