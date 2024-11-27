'use client'

import React, { useCallback, useEffect } from 'react'
import {
	DayType,
	getTimeDifference,
	isWeekend,
	StopType,
} from '@/utils/scheduleUtils'
import useScheduleStore from '@/store/scheduleStore'
import SelectButtons from '@/components/SelectButtons'
import TimeList from '@/components/TimeList'
import CurrentTimeDisplay from '@/components/CurrentTimeDisplay'
import TimeListFilter from '@/components/TimeListFilter'
import { MapPinCheckInside } from 'lucide-react'
import styles from './ScheduleList.module.scss'
import Spinner from '@/components/Spinner'

const ScheduleList: React.FC = () => {
	const { fetchScheduleData, scheduleData } = useScheduleStore()
	const { initializeTimeUpdates, clearTimeUpdates } = useScheduleStore()
	const { setDayType, setSelectedStop } = useScheduleStore()
	const dayType = useScheduleStore((state) => state.dayType)
	const selectedStop = useScheduleStore((state) => state.selectedStop)
	const currentTime = useScheduleStore((state) => state.currentTime)

	useEffect(() => {
		fetchScheduleData('6')
	}, [fetchScheduleData])

	useEffect(() => {
		initializeTimeUpdates()
		return () => clearTimeUpdates()
	}, [initializeTimeUpdates, clearTimeUpdates])

	const getTodaysSchedule = () => {
		if (!scheduleData) return []

		const isAutoWeekend = isWeekend()
		const isWeekendDay =
			dayType === 'Weekend' || (dayType === 'Auto' && isAutoWeekend)
		const scheduleTimes = isWeekendDay
			? scheduleData[selectedStop.toLowerCase() as keyof typeof scheduleData]
					.weekEnd
			: scheduleData[selectedStop.toLowerCase() as keyof typeof scheduleData]
					.weekDay

		return scheduleTimes.map((time: string) => ({
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
				{scheduleData && <CurrentTimeDisplay />}
			</h3>
			<TimeListFilter />
			{scheduleData ? (
				<TimeList scheduleTimes={getTodaysSchedule()} />
			) : (
				<Spinner />
			)}
		</div>
	)
}

ScheduleList.displayName = 'ScheduleList'

export default ScheduleList
