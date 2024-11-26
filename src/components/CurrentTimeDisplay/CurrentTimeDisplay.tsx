import React from 'react'
import { formatInTimeZone } from 'date-fns-tz'
import { Clock } from 'lucide-react'
import styles from './CurrentTimeDisplay.module.scss'
import useScheduleStore from '@/store/scheduleStore'

const CurrentTimeDisplay: React.FC = () => {
	const currentTime = useScheduleStore((state) => state.currentTime)
	const formattedTime = formatInTimeZone(currentTime, 'Europe/Kyiv', 'HH:mm')
	return (
		<div
			className={styles.CurrentTime}
			role='text'
			aria-label={`Current time is ${formattedTime}`}
		>
			<Clock size={20} />
			<span>{formattedTime}</span>
		</div>
	)
}

CurrentTimeDisplay.displayName = 'CurrentTimeDisplay'

export default React.memo(CurrentTimeDisplay)
