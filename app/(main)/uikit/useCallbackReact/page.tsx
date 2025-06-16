'use client';
import { useCallback, useState } from 'react';

const CallbackExample = () => {
    const [count, setCount] = useState(0);

    const handleClick = useCallback(() => {  /* la funcion no se vuelve a crear con useCallback */
        console.log('🧠 Función memorizada');
        setCount((prev) => prev + 1);
    }, []);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Incrementar</button>
        </div>
    );
};

export default CallbackExample;
