'use client'

import React, { useCallback } from 'react'
import { DayType, DirectionType, Stop, StopType } from '@/types/types'
import useScheduleStore from '@/store/scheduleStore'
import SelectButtons from '@/components/SelectButtons'
import TimeList from '@/components/TimeList'
import CurrentTimeDisplay from '@/components/CurrentTimeDisplay'
import TimeListFilter from '@/components/TimeListFilter'
import { MapPinCheckInside } from 'lucide-react'
import TrolleybusAnimated from '@/components/TrolleybusAnimated'
import styles from './ScheduleList.module.scss'
import classNames from 'classnames'
import useToastStore from '@/store/toastStore'

const capitalizeString = (str: string | null): string => {
	if (str === null) return ''
	return str.charAt(0).toUpperCase() + str.slice(1)
}

const ScheduleList: React.FC = () => {
	const { addToast } = useToastStore()
	const { scheduleData } = useScheduleStore()
	const { setDayType, setSelectedStop, setDirectionType } = useScheduleStore()
	const dayType = useScheduleStore((state) => state.dayType)
	const directionType = useScheduleStore((state) => state.directionType)
	const selectedStop = useScheduleStore((state) => state.selectedStop)

	const setDayTypeHandler = useCallback(
		(option: string) => setDayType(option as DayType),
		[setDayType],
	)

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
		scheduleData?.configuration.available.stops.map(
			(item: Stop) => item.name,
		) || []

	const availableStopsInternalNames =
		scheduleData?.configuration.available.stops.map(
			(item: Stop) => item.internalName,
		) || []

	const availableDirectionsInternalNames =
		scheduleData?.configuration.available.directions.map(
			(item: Stop) => item.internalName,
		) || []

	const availableDirectionsNames =
		scheduleData?.configuration.available.directions.map(
			(item: Stop) => item.name,
		) || []

	const availableDayTypesInternalNames =
		scheduleData?.configuration.available.days.map(
			(item: Stop) => item.internalName,
		) || []

	const availableDayTypesNames =
		scheduleData?.configuration.available.days.map((item: Stop) => item.name) ||
		[]

	const availableDirectionsForStop =
		scheduleData?.configuration.available.stops.find(
			(item: Stop) => item.internalName === selectedStop,
		)?.directions || []

	if (availableDirectionsForStop.length === 1) {
		// addToast({
		// 	message: availableDirectionsForStop[0],
		// 	type: 'info',
		// 	duration: 3000,
		// })
	}

	return (
		<div>
			<div className={classNames(styles.ControlsBlock)}>
				<SelectButtons
					className={styles.Schedule}
					label={'Schedule for'}
					options={availableDayTypesInternalNames}
					labels={availableDayTypesNames}
					selectedOption={dayType || ''}
					setSelectedOption={setDayTypeHandler}
				/>
				<SelectButtons
					className={styles.Direction}
					label={'Direction'}
					options={availableDirectionsInternalNames}
					labels={availableDirectionsNames}
					selectedOption={directionType || ''}
					setSelectedOption={setDirectionTypeHandler}
				/>
				<SelectButtons
					className={styles.Stops}
					label={'Trolleybus stops'}
					options={availableStopsInternalNames}
					labels={availableStopsNames}
					selectedOption={selectedStop || ''}
					setSelectedOption={setSelectedStopHandler}
				/>
			</div>
			<h3 className={styles.CaptionStartPoint}>
				<div>
					<MapPinCheckInside size={32} />
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
