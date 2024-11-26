import { create } from 'zustand'
import { DayType, StopType, FilterType } from '@/utils/scheduleUtils'

interface ScheduleState {
	dayType: DayType
	selectedStop: StopType
	currentTime: Date
	filter: FilterType
	setDayType: (dayType: DayType) => void
	setSelectedStop: (stop: StopType) => void
	updateCurrentTime: () => void
	setFilter: (filter: FilterType) => void
	initializeTimeUpdates: () => void
	clearTimeUpdates: () => void
}

const UPDATE_INTERVAL = 15_000
let timeUpdateInterval: NodeJS.Timeout | null = null

const useScheduleStore = create<ScheduleState>((set) => ({
	dayType: 'Auto',
	selectedStop: 'Pridniprovsk',
	currentTime: new Date(),
	filter: 'all',
	setDayType: (dayType) => set(() => ({ dayType })),
	setSelectedStop: (stop) => set(() => ({ selectedStop: stop })),
	updateCurrentTime: () => set(() => ({ currentTime: new Date() })),
	setFilter: (filter) => set(() => ({ filter })),
	initializeTimeUpdates: () => {
		if (!timeUpdateInterval) {
			timeUpdateInterval = setInterval(() => {
				set({ currentTime: new Date() })
			}, UPDATE_INTERVAL)
		}
	},
	clearTimeUpdates: () => {
		if (timeUpdateInterval) {
			clearInterval(timeUpdateInterval)
			timeUpdateInterval = null
		}
	},
}))

export default useScheduleStore
