'use client';

import React, { useEffect, useState } from 'react';
import scheduleData from '@/data/scheduleData';
import { getTimeDifference, isWeekend, DayType, StopType } from '@/utils/scheduleUtils';
import styles from './ScheduleList.module.scss';

const ScheduleList: React.FC = () => {
    const [dayType, setDayType] = useState<DayType>('Auto');
    const [selectedStop, setSelectedStop] = useState<StopType>('Pridniprovsk');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 30000);

        return () => clearInterval(interval);
    }, []);

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
        if (diff <= 5) return styles.verySoon;
        if (diff <= 28) return styles.soon;
        if (diff <= 58) return styles.upcoming;

        return styles.upcomingLater;
    };

    const formattedCurrentTime = currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    return (
        <div>
            <h2 className={styles.caption}>Schedule for: </h2>
            <div>
                <button className={`${styles.button} ${dayType === 'Auto' ? `${styles.active}` : ''}`} onClick={() => setDayType('Auto')}>Auto</button>
                <button className={`${styles.button} ${dayType === 'Weekdays' ? `${styles.active}` : ''}`} onClick={() => setDayType('Weekdays')}>Weekdays</button>
                <button className={`${styles.button} ${dayType === 'Weekend' ? `${styles.active}` : ''}`} onClick={() => setDayType('Weekend')}>Weekend</button>
            </div>

            <h2 className={styles.caption}>Start point:</h2>
            <div>
                <button className={`${styles.button} ${selectedStop === 'Pridniprovsk' ? `${styles.active}` : ''}`} onClick={() => setSelectedStop('Pridniprovsk')}>Pridniprovsk</button>
                <button className={`${styles.button} ${selectedStop === 'Museum' ? `${styles.active}` : ''}`} onClick={() => setSelectedStop('Museum')}>Museum</button>
            </div>

            <h2 className={styles.caption}>
                <strong>{selectedStop}</strong>
                <span className={styles.badge}>(Current time: {formattedCurrentTime})</span>
            </h2>
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