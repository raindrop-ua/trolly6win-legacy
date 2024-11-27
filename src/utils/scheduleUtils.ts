import useScheduleStore from '@/store/scheduleStore'

export type TimeSchedule = string[]

export type DayType = 'Auto' | 'Weekdays' | 'Weekend'
export type StopType = 'Pridniprovsk' | 'Museum' | 'Hospital'
export type FilterType = 'all' | 'upcoming'

export type ScheduleForDayType = {
	weekDay: TimeSchedule
	weekEnd: TimeSchedule
}

export type ScheduleData = {
	[stopName: string]: ScheduleForDayType
}

export const isWeekend = (): boolean => {
	const today = getCurrentTime()
	const dayOfWeek = today.getDay()

	return dayOfWeek === 0 || dayOfWeek === 6
}

export const getCurrentTime = (): Date => {
	const { currentTime } = useScheduleStore.getState()
	if (!currentTime) {
		throw new Error('Current time is not initialized yet')
	}
	return new Date(currentTime)
}

export const getTimeDifference = (scheduledTime: string): number => {
	const currentTime = getCurrentTime()
	const [hours, minutes] = scheduledTime.split(':').map(Number)

	if (!currentTime) {
		return 0
	}

	// Создаем локальную дату на основе времени текущего дня
	const scheduledDate = new Date(
		currentTime.getFullYear(),
		currentTime.getMonth(),
		currentTime.getDate(),
		hours,
		minutes,
	)

	console.log(scheduledDate)

	// Разница в минутах
	return (scheduledDate.getTime() - currentTime.getTime()) / 60000
}
