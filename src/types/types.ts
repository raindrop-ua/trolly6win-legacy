export interface Stop {
	id: string
	internalName: string
	name: string
	directions: IDirection[]
	isDefault: boolean
	sortIndex: number
	createdAt: string
	updatedAt: string
}

export interface SortPayload {
	id: string
	sortIndex: number
}

export interface ISchedule {
	id: string
	departureTime: string
	typeOfDay: string
}

export interface IDirection {
	id: string
	direction: string
	schedules: ISchedule[]
}

export interface IStopCardProps {
	itemData: {
		id: string
		name: string
		directions?: IDirection[]
		isDefault?: boolean
	}
	isSelected?: boolean
}

export enum Status {
	Past = 'past',
	VerySoon = 'verysoon',
	Soon = 'soon',
	Upcoming = 'upcoming',
	UpcomingLater = 'upcominglater',
	Cancelled = 'canceled',
}

export interface DepartureTimeItem {
	time: string
	status: Status
}

export type DayType = 'weekday' | 'weekend'
export type DirectionType = 'forward' | 'backward'
export type StopType = 'pridniprovsk' | 'museum' | 'hospital'
export type FilterType = 'all' | 'upcoming'

export type Direction = {
	direction: 'forward' | 'backward'
	departures: {
		weekday: DepartureTimeItem[]
		weekend: DepartureTimeItem[]
		holiday: DepartureTimeItem[]
	}
}

export type ScheduleData = {
	currentTime: string
	currentDay: 'weekday' | 'weekend' | 'holiday'
	stops: Stop[]
}
