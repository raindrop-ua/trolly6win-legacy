export interface IStop {
	id: string
	internalName: string
	name: string
	directions: IDirection[]
	isDefault: boolean
	isPublished: boolean
	sortIndex: number
	createdAt: string
	updatedAt: string
}

export interface IDeparture {
	id: string
	departureTime: string
	typeOfDay: string
	isPublished: boolean
}

export enum IStatus {
	Past = 'past',
	VerySoon = 'verysoon',
	Soon = 'soon',
	Upcoming = 'upcoming',
	UpcomingLater = 'upcominglater',
	Canceled = 'canceled',
}

export enum DayType {
	Weekday = 'weekday',
	Weekend = 'weekend',
	Holiday = 'holiday',
}

export enum DirectionType {
	Forward = 'forward',
	Backward = 'backward',
}

export enum FilterType {
	All = 'all',
	Upcoming = 'upcoming',
}

export interface IDepartureTimeItem {
	time: string
	status: IStatus
}

export type IDirection = {
	direction: DirectionType
	departures: {
		weekday: IDepartureTimeItem[]
		weekend: IDepartureTimeItem[]
		holiday: IDepartureTimeItem[]
	}
}

export type ScheduleData = {
	currentTime: string
	stops: IStop[]
	departures: IDeparture[]
	currentDay: DayType
	configuration: {
		available: {
			stops: IStop[]
			directions: IStop[]
			days: IStop[]
		}
	}
}
