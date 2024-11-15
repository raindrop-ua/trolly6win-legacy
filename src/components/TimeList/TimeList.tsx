import React from 'react'
import styles from './TimeList.module.scss'

type ScheduleTime = {
	time: string
	diff: number
}

type TimeListProps = {
	scheduleTimes: ScheduleTime[]
}

const TimeList: React.FC<TimeListProps> = ({ scheduleTimes }) => (
	<ul className={styles.TimeItems}>
		{scheduleTimes.map(({ time, diff }, index) => (
			<li key={index} className={`${styles.TimeItem} ${getTimeClass(diff)}`}>
				<span>{time}</span>
			</li>
		))}
	</ul>
)

const getTimeClass = (diff: number) => {
	if (diff < 0) return styles.Past
	if (diff <= 5) return styles.VerySoon
	if (diff <= 28) return styles.Soon
	if (diff <= 58) return styles.Upcoming

	return styles.UpcomingLater
}

export default TimeList
