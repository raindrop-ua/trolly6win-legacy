import React from 'react'
import { format } from 'date-fns'
import { Clock } from 'lucide-react'
import useScheduleStore from '@/store/scheduleStore'
import styles from './CurrentTimeDisplay.module.scss'

const CurrentTimeDisplay: React.FC = () => {
	const currentTime = useScheduleStore((state) => state.currentTime)

	if (!currentTime) {
		return <div className={styles.CurrentTime}>Loading...</div>
	}

	const formattedTime = format(currentTime, 'HH:mm')

	return (
		<div
			className={styles.CurrentTime}
			role='text'
			aria-label={`Current time is ${formattedTime}`}
		>
			<Clock aria-hidden='true' />
			<span>{formattedTime}</span>
		</div>
	)
}

CurrentTimeDisplay.displayName = 'CurrentTimeDisplay'

export default React.memo(CurrentTimeDisplay)
