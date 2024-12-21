import React from 'react'
import { ArrowRight, Clock } from 'lucide-react'
import useScheduleStore from '@/store/scheduleStore'
import styles from './CurrentTimeDisplay.module.scss'
import TrolleybusIcon from '@/components/TrolleybusIcon'
import { DepartureTimeItem, IDirection, Status, Stop } from '@/types/types'
import classNames from 'classnames'
import { formatTime } from '@/utils/helpers'

const CurrentTimeDisplay: React.FC = () => {
	const { scheduleData } = useScheduleStore()
	const dayType = useScheduleStore((state) => state.dayType)
	const directionType = useScheduleStore((state) => state.directionType)
	const selectedStop = useScheduleStore((state) => state.selectedStop)

	if (!scheduleData) {
		return <div className={styles.CurrentTime}>Loading...</div>
	}

	const stop = scheduleData.stops.find(
		(item: Stop) => item.internalName === selectedStop,
	)
	const direction = stop?.directions.find(
		(item: IDirection) => item.direction === directionType,
	)
	const dayDepartures = direction?.departures[dayType || 'weekday']
	const closestDeparture = dayDepartures?.find(
		(item: DepartureTimeItem) => item.status !== Status.Past,
	)

	const closestDepartureStatus = closestDeparture?.status || ''
	const closestDepartureTime = closestDeparture?.time || '—'

	return (
		<div
			className={classNames(styles.CurrentTime)}
			role='text'
			aria-label={`Current time is ${scheduleData.currentTime}${closestDepartureStatus && `, closest departure is ${formatTime(closestDepartureTime)}`}`}
		>
			<div className={styles.CurrentTimeBlock}>
				<Clock size={24} aria-hidden='true' />
				<span>{formatTime(scheduleData.currentTime)}</span>
			</div>
			<ArrowRight size={24} aria-hidden='true' />
			<div className={styles.CurrentTimeBlock}>
				<TrolleybusIcon
					className={classNames(styles.TrolleybusIcon, {
						[styles.Soon]: closestDepartureStatus === Status.Soon,
						[styles.VerySoon]: closestDepartureStatus === Status.VerySoon,
						[styles.Upcoming]: closestDepartureStatus === Status.Upcoming,
					})}
					aria-hidden='true'
				/>
				<span>{formatTime(closestDepartureTime)}</span>
			</div>
		</div>
	)
}

CurrentTimeDisplay.displayName = 'CurrentTimeDisplay'

export default React.memo(CurrentTimeDisplay)
