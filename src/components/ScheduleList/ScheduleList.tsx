'use client'

import React, { useCallback, useEffect } from 'react'
import {
	DayType,
	getTimeDifference,
	isWeekend,
	StopType,
} from '@/utils/scheduleUtils'
import scheduleData from '@/data/scheduleData'
import useScheduleStore from '@/store/scheduleStore'
import SelectButtons from '@/components/SelectButtons'
import TimeList from '@/components/TimeList'
import CurrentTimeDisplay from '@/components/CurrentTimeDisplay'
import TimeListFilter from '@/components/TimeListFilter'
import { MapPinCheckInside } from 'lucide-react'
import styles from './ScheduleList.module.scss'

const ScheduleList: React.FC = () => {
	const { initializeTimeUpdates, clearTimeUpdates } = useScheduleStore()
	const { setDayType, setSelectedStop } = useScheduleStore()
	const dayType = useScheduleStore((state) => state.dayType)
	const selectedStop = useScheduleStore((state) => state.selectedStop)
	const currentTime = useScheduleStore((state) => state.currentTime)

	useEffect(() => {
		initializeTimeUpdates()
		return () => clearTimeUpdates()
	}, [initializeTimeUpdates, clearTimeUpdates])

	const getTodaysSchedule = () => {
		const isAutoWeekend = isWeekend()
		const isWeekendDay =
			dayType === 'Weekend' || (dayType === 'Auto' && isAutoWeekend)
		const scheduleTimes = isWeekendDay
			? scheduleData[selectedStop.toLowerCase() as keyof typeof scheduleData]
					.weekEnd
			: scheduleData[selectedStop.toLowerCase() as keyof typeof scheduleData]
					.weekDay

		return scheduleTimes.map((time) => ({
			time,
			diff: getTimeDifference(time, currentTime),
		}))
	}

	const setDayTypeHandler = useCallback(
		(option: string) => setDayType(option as DayType),
		[setDayType],
	)

	const setSelectedStopHandler = useCallback(
		(option: string) => setSelectedStop(option as StopType),
		[setSelectedStop],
	)

	const todaysSchedule = getTodaysSchedule()

	return (
		<div>
			<div className={styles.ControlsBlock}>
				<SelectButtons
					label={'Schedule for'}
					options={['Auto', 'Weekdays', 'Weekend']}
					selectedOption={dayType}
					setSelectedOption={setDayTypeHandler}
				/>
				<SelectButtons
					label={'Start point'}
					options={['Pridniprovsk', 'Hospital', 'Museum']}
					selectedOption={selectedStop}
					setSelectedOption={setSelectedStopHandler}
				/>
			</div>
			<h3 className={styles.CaptionStartPoint}>
				<div>
					<MapPinCheckInside />
					<strong>{selectedStop}</strong>
				</div>
				<CurrentTimeDisplay />
			</h3>
			{todaysSchedule.length > 0 ? (
				<>
					<TimeListFilter />
					<TimeList scheduleTimes={todaysSchedule} />
				</>
			) : (
				<p>Schedule not available.</p>
			)}
		</div>
	)
}

ScheduleList.displayName = 'ScheduleList'

export default ScheduleList
