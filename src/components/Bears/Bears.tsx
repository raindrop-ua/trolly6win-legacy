'use client'

import useStore from '@/lib/useStore';
import { FC } from 'react';

const Bears: FC = () => {
    const { count } = useStore();

    return (
        <div>
            <h3>Count: {count}</h3>
        </div>
    );
};

export default Bears;