import React from 'react'
import { Clock } from 'lucide-react'
import useScheduleStore from '@/store/scheduleStore'
import styles from './CurrentTimeDisplay.module.scss'

const CurrentTimeDisplay: React.FC = () => {
	const { scheduleData } = useScheduleStore()

	if (!scheduleData) {
		return <div className={styles.CurrentTime}>Loading...</div>
	}

	return (
		<div
			className={styles.CurrentTime}
			role='text'
			aria-label={`Current time is ${scheduleData.currentTime}`}
		>
			<Clock aria-hidden='true' />
			<span>{scheduleData.currentTime}</span>
		</div>
	)
}

CurrentTimeDisplay.displayName = 'CurrentTimeDisplay'

export default React.memo(CurrentTimeDisplay)
