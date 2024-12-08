import { create } from 'zustand'
import { DayType, StopType, FilterType, DirectionType } from '@/types/types'

interface ScheduleState {
	dayType: DayType
	directionType: DirectionType
	selectedStop: StopType
	currentTime: Date
	filter: FilterType
	scheduleData: Record<string, any> | null
	setDayType: (dayType: DayType) => void
	setDirectionType: (directionType: DirectionType) => void
	setSelectedStop: (stop: StopType) => void
	setFilter: (filter: FilterType) => void
	setScheduleData: (data: Record<string, any> | null) => void
	setCurrentTime: (time: Date) => void
}

const useScheduleStore = create<ScheduleState>((set) => ({
	dayType: 'weekday',
	directionType: 'forward',
	selectedStop: 'pridniprovsk',
	currentTime: new Date(),
	filter: 'all',
	scheduleData: null,
	setDayType: (dayType) => set(() => ({ dayType })),
	setDirectionType: (directionType) => set(() => ({ directionType })),
	setSelectedStop: (stop) => set(() => ({ selectedStop: stop })),
	setFilter: (filter) => set(() => ({ filter })),
	setScheduleData: (data) => set(() => ({ scheduleData: data })),
	setCurrentTime: (time) => set(() => ({ currentTime: time })),
}))

export default useScheduleStore
