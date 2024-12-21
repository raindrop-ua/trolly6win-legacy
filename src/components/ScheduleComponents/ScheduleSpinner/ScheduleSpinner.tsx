import React from 'react'
import styles from './ScheduleSpinner.module.scss'

const ScheduleSpinner: React.FC = () => {
	return (
		<div className={styles.ScheduleSpinnerWrapper}>
			<div className={styles.Spinner}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

ScheduleSpinner.displayName = 'ScheduleSpinner'

export default React.memo(ScheduleSpinner)
