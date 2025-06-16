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

'use client';
import { useMemo, useState } from 'react';

const MemoExample = () => {
    const [a, setA] = useState(5);
    const [b, setB] = useState(8);

    const result = useMemo(() => {
        console.log('🔁 Calculando a + b');
        return a + b;           /* Se vuelve a calcular solo si a o b cambian */
    }, [a,b]);

    return (
        <div>
            <p>a + b = {result}</p>
            <button onClick={() => setA((prev) => prev + 1)}>Incrementar a</button>
            <button onClick={() => setB((prev) => prev + 1)}>Incrementar b</button>
        </div>
    );
};

export default MemoExample
