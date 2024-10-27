import React from 'react';
import styles from './TimeList.module.scss';

type ScheduleTime = {
    time: string;
    diff: number;
};

type TimeListProps = {
    scheduleTimes: ScheduleTime[];
};

const TimeList: React.FC<TimeListProps> = ({ scheduleTimes }) => (
    <ul className={styles.timeItems}>
        {scheduleTimes.map(({ time, diff }, index) => (
            <li key={index} className={`${styles.timeItem} ${getTimeClass(diff)}`}>
                <span>{time}</span>
            </li>
        ))}
    </ul>
);

const getTimeClass = (diff: number) => {
    if (diff < 0) return styles.past;
    if (diff <= 5) return styles.verySoon;
    if (diff <= 28) return styles.soon;
    if (diff <= 58) return styles.upcoming;

    return styles.upcomingLater;
};

export default TimeList;
