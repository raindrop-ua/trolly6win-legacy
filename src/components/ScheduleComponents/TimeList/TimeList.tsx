import React from 'react'
import useScheduleStore from '@/store/scheduleStore'
import styles from './TimeList.module.scss'
import { DepartureTimeItem, Direction, Status, Stop } from '@/types/types'
import ScheduleNote from '../ScheduleNote'
import { formatTime } from '@/utils/helpers'
import { LuHeart } from 'react-icons/lu'
import classNames from 'classnames'

const getTimeClass = (departureTimeItem: DepartureTimeItem) => {
	const { status } = departureTimeItem
	const statusColorMap = {
		past: styles.Past,
		verysoon: styles.VerySoon,
		soon: styles.Soon,
		upcoming: styles.Upcoming,
		upcominglater: styles.UpcomingLater,
		canceled: styles.Cancelled,
	}
	return statusColorMap[status as Status] || ''
}

const TimeList: React.FC = () => {
	const { scheduleData } = useScheduleStore()
	const { filter } = useScheduleStore()
	const dayType = useScheduleStore((state) => state.dayType)
	const directionType = useScheduleStore((state) => state.directionType)
	const selectedStop = useScheduleStore((state) => state.selectedStop)

	const scheduleSelected =
		(dayType &&
			scheduleData?.stops
				.find((item: Stop) => item.internalName === selectedStop)
				?.directions.find((item: Direction) => item.direction === directionType)
				?.departures[dayType]?.filter((item: DepartureTimeItem) => {
					return !(filter === 'upcoming' && item.status === 'past')
				})) ||
		[]

	if (!scheduleSelected?.length) {
		return (
			<ScheduleNote isAlert>
				There is no schedule available for this selection.
			</ScheduleNote>
		)
	}

	return (
		<>
			<ul className={styles.TimeItems}>
				{scheduleSelected.map((item: DepartureTimeItem, index: number) => {
					const isFavorite = false
					return (
						<li
							key={index}
							className={classNames(styles.TimeItem, getTimeClass(item))}
						>
							<span>{formatTime(item.time)}</span>
							{isFavorite && (
								<span className={styles.Favorite}>
									<LuHeart size={32} strokeWidth={1} />
								</span>
							)}
						</li>
					)
				})}
			</ul>
		</>
	)
}

TimeList.displayName = 'TimeList'

export default React.memo(TimeList)
