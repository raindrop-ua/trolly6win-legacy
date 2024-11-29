import { formatInTimeZone } from 'date-fns-tz'

export type TimeSchedule = string[]
export type TimestampSchedule = number[]

export type DayType = 'Auto' | 'Weekdays' | 'Weekend'
export type StopType = 'Pridniprovsk' | 'Museum' | 'Hospital'
export type FilterType = 'all' | 'upcoming'

export type ScheduleForDayType = {
	weekDay: TimeSchedule
	weekEnd: TimeSchedule
}

export type TimestampScheduleForDayType = {
	weekDay: TimestampSchedule
	weekEnd: TimestampSchedule
}

export type ScheduleData = {
	[stopName: string]: ScheduleForDayType
}

export const isWeekend = (): boolean => {
	const today = new Date()
	const dayOfWeek = today.getDay()

	return dayOfWeek === 0 || dayOfWeek === 6 // Sunday (0) и Saturday (6)
}

export const getTimeDifference = (
	scheduledTime: string,
	currentTime: Date,
	timezone: string = 'Europe/Kyiv',
): number => {
	const [hours, minutes] = scheduledTime.split(':').map(Number)
	const scheduledDate = new Date(
		currentTime.getFullYear(),
		currentTime.getMonth(),
		currentTime.getDate(),
		hours,
		minutes,
	)
	const formattedScheduledTime = formatInTimeZone(
		scheduledDate,
		timezone,
		'yyyy-MM-dd HH:mm:ss',
	)
	const formattedCurrentTime = formatInTimeZone(
		currentTime,
		timezone,
		'yyyy-MM-dd HH:mm:ss',
	)
	const dateScheduled = new Date(formattedScheduledTime)
	const dateCurrent = new Date(formattedCurrentTime)

	return (dateScheduled.getTime() - dateCurrent.getTime()) / 60000
}
