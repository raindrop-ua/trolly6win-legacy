'use client'

import React, { useCallback, useEffect } from 'react'
import { DayType, DirectionType, Stop, StopType } from '@/types/types'
import useScheduleStore from '@/store/scheduleStore'
import SelectButtons from '@/components/SelectButtons'
import TimeList from '@/components/TimeList'
import CurrentTimeDisplay from '@/components/CurrentTimeDisplay'
import TimeListFilter from '@/components/TimeListFilter'
import { MapPinCheckInside } from 'lucide-react'
import TrolleybusAnimated from '@/components/TrolleybusAnimated'
import styles from './ScheduleList.module.scss'

const capitalizeString = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

const ScheduleList: React.FC = () => {
	const { scheduleData } = useScheduleStore()
	const { setDayType, setSelectedStop, setDirectionType } = useScheduleStore()
	const dayType = useScheduleStore((state) => state.dayType)
	const directionType = useScheduleStore((state) => state.directionType)
	const selectedStop = useScheduleStore((state) => state.selectedStop)

	const setDayTypeHandler = useCallback(
		(option: string) => setDayType(option as DayType),
		[setDayType],
	)

	console.log(scheduleData)

	const setDirectionTypeHandler = useCallback(
		(option: string) => setDirectionType(option as DirectionType),
		[setDirectionType],
	)

	const setSelectedStopHandler = useCallback(
		(option: string) => setSelectedStop(option as StopType),
		[setSelectedStop],
	)

	const selectedStopFullName =
		scheduleData?.stops.find((item: Stop) => item.internalName === selectedStop)
			?.name || capitalizeString(selectedStop)

	const availableStopsNames =
		scheduleData?.configuration.availableStops.map((item: Stop) => item.name) ||
		[]

	const availableStopsInternalNames =
		scheduleData?.configuration.availableStops.map(
			(item: Stop) => item.internalName,
		) || []

	const availableDirectionsInternalNames =
		scheduleData?.configuration.availableDirections.map(
			(item: Stop) => item.internalName,
		) || []

	const availableDirectionsNames =
		scheduleData?.configuration.availableDirections.map(
			(item: Stop) => item.name,
		) || []

	const availableDayTypesInternalNames =
		scheduleData?.configuration.availableDays.map(
			(item: Stop) => item.internalName,
		) || []

	const availableDayTypesNames =
		scheduleData?.configuration.availableDays.map((item: Stop) => item.name) ||
		[]

	return (
		<div>
			<div className={styles.ControlsBlock}>
				<SelectButtons
					label={'Schedule for'}
					options={availableDayTypesInternalNames}
					labels={availableDayTypesNames}
					selectedOption={dayType}
					setSelectedOption={setDayTypeHandler}
				/>
				<SelectButtons
					label={'Direction'}
					options={availableDirectionsInternalNames}
					labels={availableDirectionsNames}
					selectedOption={directionType}
					setSelectedOption={setDirectionTypeHandler}
				/>
			</div>
			<div className={styles.ControlsBlock}>
				<SelectButtons
					label={'Trolleybus stops'}
					options={availableStopsInternalNames}
					labels={availableStopsNames}
					selectedOption={selectedStop}
					setSelectedOption={setSelectedStopHandler}
				/>
			</div>
			<h3 className={styles.CaptionStartPoint}>
				<div>
					<MapPinCheckInside />
					<strong>{selectedStopFullName}</strong>
				</div>
				{scheduleData && <CurrentTimeDisplay />}
			</h3>
			<TimeListFilter />
			{scheduleData ? <TimeList /> : <TrolleybusAnimated />}
		</div>
	)
}

ScheduleList.displayName = 'ScheduleList'

export default ScheduleList
