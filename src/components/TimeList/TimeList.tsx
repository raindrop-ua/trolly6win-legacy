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

enum TimeDiff {
	Past = 0,
	VerySoon = 5,
	Soon = 28,
	Upcoming = 58,
}

const getTimeClass = (diff: number) => {
	if (diff < TimeDiff.Past) return styles.Past
	if (diff <= TimeDiff.VerySoon) return styles.VerySoon
	if (diff <= TimeDiff.Soon) return styles.Soon
	if (diff <= TimeDiff.Upcoming) return styles.Upcoming

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

export default React.memo(TimeList)
