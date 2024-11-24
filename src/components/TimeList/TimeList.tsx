import React from 'react'
import useScheduleStore from '@/store/scheduleStore'
import styles from './TimeList.module.scss'

type ScheduleTime = {
	time: string
	diff: number
}

type TimeListProps = {
	scheduleTimes: ScheduleTime[]
}

const getTimeClass = (diff: number) => {
	if (diff < 0) return styles.Past
	if (diff <= 5) return styles.VerySoon
	if (diff <= 28) return styles.Soon
	if (diff <= 58) return styles.Upcoming

	return styles.UpcomingLater
}

const TimeList: React.FC<TimeListProps> = ({ scheduleTimes }) => {
	const { filter } = useScheduleStore()

	return (
		<ul className={styles.TimeItems}>
			{scheduleTimes.map(({ time, diff }, index) => {
				if (filter === 'upcoming' && diff <= 0) return null

				return (
					<li
						key={index}
						className={`${styles.TimeItem} ${getTimeClass(diff)}`}
					>
						<span>{time}</span>
					</li>
				)
			})}
		</ul>
	)
}

TimeList.displayName = 'TimeList'

export default TimeList
