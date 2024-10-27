'use client';

import React, {useMemo, useState} from 'react';
import scheduleData from '../../data/scheduleData';
import {getTimeDifference, isWeekend} from '@/utils/scheduleUtils';
import styles from './ScheduleList.module.scss';

type DayType = 'Auto' | 'Weekdays' | 'Weekend';
type StopType = 'Pridniprovsk' | 'Museum';

const ScheduleList: React.FC = () => {
    const [dayType, setDayType] = useState<DayType>('Auto');
    const [selectedStop, setSelectedStop] = useState<StopType>('Pridniprovsk');

    const currentTime = useMemo(() => new Date(), []);

    const getTodaysSchedule = () => {
        const isAutoWeekend = isWeekend();
        const isWeekendDay = dayType === 'Weekend' || (dayType === 'Auto' && isAutoWeekend);
        const scheduleTimes = isWeekendDay
            ? scheduleData[selectedStop.toLowerCase() as keyof typeof scheduleData].weekEnd
            : scheduleData[selectedStop.toLowerCase() as keyof typeof scheduleData].weekDay;

        return scheduleTimes.map(time => ({
            time,
            diff: getTimeDifference(time, currentTime)
        }));
    };
    const getTimeClass = (diff: number) => {
        if (diff < 0) return styles.past;
        if (diff <= 15) return styles.verySoon;
        if (diff <= 30) return styles.soon;
        return styles.upcoming;
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
                {getTodaysSchedule().map(({time, diff}, index) => (
                    <li key={index} className={`${styles.timeItem} ${getTimeClass(diff)}`}>
                        <span>{time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScheduleList;