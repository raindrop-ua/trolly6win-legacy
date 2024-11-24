'use client'

import React, { useEffect } from 'react'
import { getTimeDifference, isWeekend } from '@/utils/scheduleUtils'
import scheduleData from '@/data/scheduleData'
import useScheduleStore from '@/store/scheduleStore'
import SelectButtons from '@/components/SelectButtons'
import TimeList from '@/components/TimeList'
import CurrentTimeDisplay from '@/components/CurrentTimeDisplay'
import { MapPinCheckInside } from 'lucide-react'
import styles from './ScheduleList.module.scss'
import TimeListFilter from '@/components/TimeListFilter'

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

	const SelectSchedule = () => (
		<SelectButtons
			label={'Schedule for'}
			options={['Auto', 'Weekdays', 'Weekend']}
			selectedOption={dayType}
			setSelectedOption={setDayType as (option: string) => void}
		/>
	)

	const SelectStartStop = () => (
		<SelectButtons
			label={'Start point'}
			options={['Pridniprovsk', 'Hospital', 'Museum']}
			selectedOption={selectedStop}
			setSelectedOption={setSelectedStop as (option: string) => void}
		/>
	)

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
			{getTodaysSchedule().length > 0 ? (
				<>
					<TimeListFilter />
					<TimeList scheduleTimes={getTodaysSchedule()} />
				</>
			) : (
				<p>Schedule not available.</p>
			)}
		</div>
	)
}

ScheduleList.displayName = 'ScheduleList'

export default ScheduleList
