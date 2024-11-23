'use client'

import React, { useEffect } from 'react'
import { getTimeDifference, isWeekend } from '@/utils/scheduleUtils'
import scheduleData from '@/data/scheduleData'
import SelectButtons from '@/components/SelectButtons/SelectButtons'
import TimeList from '@/components/TimeList/TimeList'
import CurrentTimeDisplay from '@/components/CurrentTimeDisplay/CurrentTimeDisplay'
import styles from './ScheduleList.module.scss'
import useScheduleStore from '@/store/scheduleStore'
import { MapPinCheckInside } from 'lucide-react'

const ScheduleList: React.FC = () => {
	const { dayType, selectedStop, currentTime, setDayType, setSelectedStop, updateCurrentTime } =
		useScheduleStore()

	useEffect(() => {
		const interval = setInterval(() => {
			updateCurrentTime()
		}, 10e3)
		return () => clearInterval(interval)
	}, [updateCurrentTime])

	const getTodaysSchedule = () => {
		const isAutoWeekend = isWeekend()
		const isWeekendDay = dayType === 'Weekend' || (dayType === 'Auto' && isAutoWeekend)
		const scheduleTimes = isWeekendDay
			? scheduleData[selectedStop.toLowerCase() as keyof typeof scheduleData].weekEnd
			: scheduleData[selectedStop.toLowerCase() as keyof typeof scheduleData].weekDay

		return scheduleTimes.map((time) => ({
			time,
			diff: getTimeDifference(time, currentTime)
		}))
	}

	return (
		<div>
			<SelectButtons
				label='Schedule for'
				options={['Auto', 'Weekdays', 'Weekend']}
				selectedOption={dayType}
				setSelectedOption={setDayType as (option: string) => void}
			/>
			<SelectButtons
				label='Start point'
				options={['Pridniprovsk', 'Museum']}
				selectedOption={selectedStop}
				setSelectedOption={setSelectedStop as (option: string) => void}
			/>
			<h3 className={styles.CaptionStartPoint}>
				<div>
					<MapPinCheckInside />
					<strong>{selectedStop}</strong>
				</div>
				<CurrentTimeDisplay currentTime={currentTime} />
			</h3>
			<TimeList scheduleTimes={getTodaysSchedule()} />
		</div>
	)
}

export default ScheduleList
