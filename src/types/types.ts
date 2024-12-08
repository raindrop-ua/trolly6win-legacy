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

export type Stop = {
	name: string
	internalName: string
	directions: Direction[]
}

export type ScheduleData = {
	currentTime: string
	currentDay: 'weekday' | 'weekend' | 'holiday'
	stops: Stop[]
}
