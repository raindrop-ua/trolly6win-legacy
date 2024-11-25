'use client'

import React, { useCallback, useEffect, useMemo } from 'react'
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
import { MapPinCheckInside } from 'lucide-react'
import TimeListFilter from '@/components/TimeListFilter'
import styles from './ScheduleList.module.scss'

const UPDATE_INTERVAL = 15_000

const ScheduleList: React.FC = () => {
	const { setDayType, setSelectedStop, updateCurrentTime } = useScheduleStore()
	const dayType = useScheduleStore((state) => state.dayType)
	const selectedStop = useScheduleStore((state) => state.selectedStop)
	const currentTime = useScheduleStore((state) => state.currentTime)

	useEffect(() => {
		const interval = setInterval(() => {
			updateCurrentTime()
		}, UPDATE_INTERVAL)
		return () => clearInterval(interval)
	}, [updateCurrentTime])

	// eslint-disable-next-line react-hooks/exhaustive-deps
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

	// eslint-disable-next-line react/display-name
	const SelectSchedule = React.memo(() => (
		<SelectButtons
			label={'Schedule for'}
			options={['Auto', 'Weekdays', 'Weekend']}
			selectedOption={dayType}
			setSelectedOption={setDayTypeHandler}
		/>
	))

	// eslint-disable-next-line react/display-name
	const SelectStartStop = React.memo(() => (
		<SelectButtons
			label={'Start point'}
			options={['Pridniprovsk', 'Hospital', 'Museum']}
			selectedOption={selectedStop}
			setSelectedOption={setSelectedStopHandler}
		/>
	))

	const todaysSchedule = useMemo(() => getTodaysSchedule(), [getTodaysSchedule])

	return (
		<div>
			<div className={styles.ControlsBlock}>
				<SelectSchedule />
				<SelectStartStop />
			</div>
			<h3 className={styles.CaptionStartPoint}>
				<div>
					<MapPinCheckInside />
					<strong>{selectedStop}</strong>
				</div>
				<CurrentTimeDisplay currentTime={currentTime} />
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
