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

	const closestDeparture = dayDepartures?.filter(
		(item: DepartureTimeItem) => item.status !== 'past',
	)

	const closestDepartureStatus = closestDeparture?.[0].status || ''
	const closestDepartureTime = closestDeparture?.[0].time || ''
	console.log(closestDeparture && closestDeparture[0].status)

	return (
		<div
			className={classNames(styles.CurrentTime)}
			role='text'
			aria-label={`Current time is ${scheduleData.currentTime}, closest departure is ${formatTime(closestDepartureTime)}`}
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
						[styles.UpcomingLater]:
							closestDepartureStatus === Status.UpcomingLater,
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
