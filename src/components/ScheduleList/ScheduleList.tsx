'use client';

import React, { useState } from 'react';
import scheduleData from '../../data/scheduleData';
import { isWeekend } from '@/utils/scheduleUtils';
import styles from './ScheduleList.module.scss';

type DayType = 'Auto' | 'Weekdays' | 'Weekend';
type StopType = 'Pridniprovsk' | 'Museum';

const ScheduleList: React.FC = () => {
    const [dayType, setDayType] = useState<DayType>('Auto');
    const [selectedStop, setSelectedStop] = useState<StopType>('Pridniprovsk');

    const getTodaysSchedule = () => {
        const isAutoWeekend = isWeekend();
        const isWeekendDay = dayType === 'Weekend' || (dayType === 'Auto' && isAutoWeekend);
        return isWeekendDay
            ? scheduleData[selectedStop.toLowerCase() as keyof typeof scheduleData].weekEnd
            : scheduleData[selectedStop.toLowerCase() as keyof typeof scheduleData].weekDay;
    };

    return (
        <div>
            <h2 className={styles.caption}>Schedule for: </h2>
            <div>
                <button className={styles.button} onClick={() => setDayType('Auto')}>Auto</button>
                <button className={styles.button} onClick={() => setDayType('Weekdays')}>Weekdays</button>
                <button className={styles.button} onClick={() => setDayType('Weekend')}>Weekend</button>
            </div>

            <h2 className={styles.caption}>Start point:</h2>
            <div>
                <button className={styles.button} onClick={() => setSelectedStop('Pridniprovsk')}>Pridniprovsk</button>
                <button className={styles.button} onClick={() => setSelectedStop('Museum')}>Museum</button>
            </div>

            <h2 className={styles.caption}>{selectedStop}</h2>
            <ul className={styles.timeItems}>
                {getTodaysSchedule().map((time, index) => (
                    <li key={index} className={styles.timeItem}>
                        <span>{time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScheduleList;