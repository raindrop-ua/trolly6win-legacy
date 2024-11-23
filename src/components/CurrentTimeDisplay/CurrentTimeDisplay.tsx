import React from 'react'
import { formatInTimeZone } from 'date-fns-tz'
import { Clock } from 'lucide-react'
import styles from './CurrentTimeDisplay.module.scss'

type CurrentTimeDisplayProps = {
	currentTime: Date
}

const CurrentTimeDisplay: React.FC<CurrentTimeDisplayProps> = ({ currentTime }) => {
	const formattedTime = formatInTimeZone(currentTime, 'Europe/Kyiv', 'HH:mm')
	return (
		<span className={styles.Badge} role='text' aria-label={`Current time is ${formattedTime}`}>
			<Clock size={15} />
			<span>Current time: {formattedTime}</span>
		</span>
	)
}

export default CurrentTimeDisplay
