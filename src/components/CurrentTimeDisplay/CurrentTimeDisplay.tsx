import React from 'react'
import { formatInTimeZone } from 'date-fns-tz'
import styles from './CurrentTimeDisplay.module.scss'

type CurrentTimeDisplayProps = {
	currentTime: Date
}

const CurrentTimeDisplay: React.FC<CurrentTimeDisplayProps> = ({ currentTime }) => {
	const formattedTime = formatInTimeZone(currentTime, 'Europe/Kyiv', 'HH:mm')
	return (
		<span className={styles.Badge} role='text' aria-label={`Current time is ${formattedTime}`}>
			Current time: {formattedTime}
		</span>
	)
}

export default CurrentTimeDisplay
