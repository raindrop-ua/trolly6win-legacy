'use client'

import React, { useCallback } from 'react'
import styles from './ScheduleList.module.scss'
import { DayType, DirectionType, IStop } from '@/types/types'
import useScheduleStore from '@/store/scheduleStore'
import SelectButtons from '../SelectButtons'
import TimeList from '../TimeList'
import CurrentTimeDisplay from '../CurrentTimeDisplay'
import TimeListFilter from '../TimeListFilter'
import {
	LuCalendarFold,
	LuMapPinCheckInside,
	LuMilestone,
} from 'react-icons/lu'
import TrolleybusAnimated from '@/components/TrolleybusAnimated'
import classNames from 'classnames'
import { TbBusStop } from 'react-icons/tb'

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

	const setDirectionTypeHandler = useCallback(
		(option: string) => setDirectionType(option as DirectionType),
		[setDirectionType],
	)

	const setSelectedStopHandler = useCallback(
		(option: string) => setSelectedStop(option),
		[setSelectedStop],
	)

	const selectedStopFullName =
		scheduleData?.stops.find(
			(item: IStop) => item.internalName === selectedStop,
		)?.name || ''

	const availableStopsNames =
		scheduleData?.configuration.available.stops.map(
			(item: IStop) => item.name,
		) || []

	const availableStopsInternalNames =
		scheduleData?.configuration.available.stops.map(
			(item: IStop) => item.internalName,
		) || []

	const availableDirectionsInternalNames =
		scheduleData?.configuration.available.directions.map(
			(item: IStop) => item.internalName,
		) || []

	const availableDirectionsNames =
		scheduleData?.configuration.available.directions.map(
			(item: IStop) => item.name,
		) || []

	const availableDayTypesInternalNames =
		scheduleData?.configuration.available.days.map(
			(item: IStop) => item.internalName,
		) || []

	const availableDayTypesNames =
		scheduleData?.configuration.available.days.map(
			(item: IStop) => item.name,
		) || []

	// const availableDirectionsForStop =
	// 	scheduleData?.configuration.available.stops.find(
	// 		(item: Stop) => item.internalName === selectedStop,
	// 	)?.directions || []

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
					icon={<LuCalendarFold size={20} />}
				/>
				<SelectButtons
					className={styles.Direction}
					label={'Direction'}
					options={availableDirectionsInternalNames}
					labels={availableDirectionsNames}
					selectedOption={directionType || ''}
					setSelectedOption={setDirectionTypeHandler}
					icon={<LuMilestone size={20} />}
				/>
				<SelectButtons
					className={styles.Stops}
					label={'Trolleybus stop'}
					options={availableStopsInternalNames}
					labels={availableStopsNames}
					selectedOption={selectedStop || ''}
					setSelectedOption={setSelectedStopHandler}
					icon={<TbBusStop size={22} />}
				/>
			</div>
			<h3 className={styles.CaptionStartPoint}>
				<div className={styles.StopName}>
					<LuMapPinCheckInside size={32} />
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
