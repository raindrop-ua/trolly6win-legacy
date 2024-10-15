'use client'

import useStore from '@/lib/useStore';
import { FC } from 'react';

const Grizzlies: FC = () => {
    const { increaseCount, decreaseCount, resetCount } = useStore();

    return (
        <div>
            <button onClick={increaseCount}>Increase</button>
            <button onClick={decreaseCount}>Increase</button>
            <button onClick={resetCount}>Reset</button>
        </div>
    );
};

export default Grizzlies;