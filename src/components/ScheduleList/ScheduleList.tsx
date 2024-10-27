'use client';

import React, { useEffect, useState } from 'react';
import { getTimeDifference, isWeekend, DayType, StopType } from '@/utils/scheduleUtils';
import scheduleData from '@/data/scheduleData';
import SelectButtons from '@/components/SelectButtons/SelectButtons';
import TimeList from '@/components/TimeList/TimeList';
import CurrentTimeDisplay from '@/components/CurrentTimeDisplay/CurrentTimeDisplay';
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

    return (
        <div>
            <SelectButtons
                label="Schedule for"
                options={['Auto', 'Weekdays', 'Weekend']}
                selectedOption={dayType}
                setSelectedOption={setDayType as (option: string) => void}
            />
            <SelectButtons
                label="Start point"
                options={['Pridniprovsk', 'Museum']}
                selectedOption={selectedStop}
                setSelectedOption={setSelectedStop as (option: string) => void}
            />
            <h3 className={styles.captionStartPoint}>
                <strong>{selectedStop}</strong>
                <CurrentTimeDisplay currentTime={currentTime} />
            </h3>
            <TimeList scheduleTimes={getTodaysSchedule()} />
        </div>
    );
};

export default ScheduleList;
