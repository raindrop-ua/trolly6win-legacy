import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import useScheduleStore from '@/store/scheduleStore'
import styles from './CurrentTimeDisplay.module.scss'
import {
	DayType,
	IDepartureTimeItem,
	IDirection,
	IStatus,
	IStop,
} from '@/types/types'
import classNames from 'classnames'
import { formatTime } from '@/utils/helpers'
import TrolleybusIcon from '@/components/TrolleybusIcon'
import ClockIcon from '../ClockIcon'

const CurrentTimeDisplay: React.FC = () => {
	const { scheduleData } = useScheduleStore()
	const dayType = useScheduleStore((state) => state.dayType)
	const directionType = useScheduleStore((state) => state.directionType)
	const selectedStop = useScheduleStore((state) => state.selectedStop)

	if (!scheduleData) {
		return <div className={styles.CurrentTime}>Loading...</div>
	}

	const stop = scheduleData.stops.find(
		(item: IStop) => item.internalName === selectedStop,
	)
	const direction = stop?.directions.find(
		(item: IDirection) => item.direction === directionType,
	)
	const dayDepartures = direction?.departures[dayType || DayType.Weekday]
	const closestDeparture = dayDepartures?.find(
		(item: IDepartureTimeItem) => item.status !== IStatus.Past,
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
				<ClockIcon
					time={formatTime(scheduleData.currentTime)}
					size={28}
					aria-hidden='true'
				/>
				<span>{formatTime(scheduleData.currentTime)}</span>
			</div>
			<LuArrowRight size={24} aria-hidden='true' />
			<div className={styles.CurrentTimeBlock}>
				<TrolleybusIcon
					className={classNames(styles.TrolleybusIcon, {
						[styles.Soon]: closestDepartureStatus === IStatus.Soon,
						[styles.VerySoon]: closestDepartureStatus === IStatus.VerySoon,
						[styles.Upcoming]: closestDepartureStatus === IStatus.Upcoming,
						[styles.UpcomingLater]:
							closestDepartureStatus === IStatus.UpcomingLater,
						[styles.Canceled]: closestDepartureStatus === IStatus.Canceled,
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
