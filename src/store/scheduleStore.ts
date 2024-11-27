import { create } from 'zustand'
import { DayType, StopType, FilterType } from '@/utils/scheduleUtils'

interface ScheduleState {
	dayType: DayType
	selectedStop: StopType
	currentTime: Date
	filter: FilterType
	scheduleData: Record<string, any> | null
	setDayType: (dayType: DayType) => void
	setSelectedStop: (stop: StopType) => void
	updateCurrentTime: () => void
	setFilter: (filter: FilterType) => void
	initializeTimeUpdates: () => void
	clearTimeUpdates: () => void
	fetchScheduleData: (routeId: string) => Promise<void>
}

const UPDATE_INTERVAL = 15_000
let timeUpdateInterval: NodeJS.Timeout | null = null

const useScheduleStore = create<ScheduleState>((set) => ({
	dayType: 'Auto',
	selectedStop: 'Pridniprovsk',
	currentTime: new Date(),
	filter: 'all',
	scheduleData: null,
	setDayType: (dayType) => set(() => ({ dayType })),
	setSelectedStop: (stop) => set(() => ({ selectedStop: stop })),
	updateCurrentTime: () => set(() => ({ currentTime: new Date() })),
	setFilter: (filter) => set(() => ({ filter })),
	fetchScheduleData: async (routeId: string) => {
		try {
			const response = await fetch(`/api/route/${routeId}`)
			if (response.ok) {
				const data = await response.json()
				set(() => ({ scheduleData: data }))
			}
		} catch (error) {
			console.error('Error fetching schedule data:', error)
		}
	},
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
