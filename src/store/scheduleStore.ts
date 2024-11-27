import { create } from 'zustand'
import { DayType, StopType, FilterType } from '@/utils/scheduleUtils'

interface ScheduleState {
	dayType: DayType
	selectedStop: StopType
	currentTime: string | null
	filter: FilterType
	scheduleData: Record<string, any> | null
	setDayType: (dayType: DayType) => void
	setSelectedStop: (stop: StopType) => void
	setFilter: (filter: FilterType) => void
	initializeTimeUpdates: () => void
	clearTimeUpdates: () => void
	fetchScheduleData: (routeId: string) => Promise<void>
}

const UPDATE_INTERVAL = 15_000
let timeUpdateInterval: NodeJS.Timeout | null = null

const fetchServerTime = async (
	set: (state: Partial<ScheduleState>) => void,
) => {
	try {
		const response = await fetch('/api/time')
		if (response.ok) {
			const data = await response.json()
			set({ currentTime: new Date(data.timestamp).toISOString() })
		}
	} catch (error) {
		console.error('Error fetching server time:', error)
	}
}

const useScheduleStore = create<ScheduleState>((set) => ({
	dayType: 'Auto',
	selectedStop: 'Pridniprovsk',
	currentTime: null,
	filter: 'all',
	scheduleData: null,
	setDayType: (dayType) => set(() => ({ dayType })),
	setSelectedStop: (stop) => set(() => ({ selectedStop: stop })),
	setFilter: (filter) => set(() => ({ filter })),
	fetchScheduleData: async (routeId: string) => {
		try {
			const response = await fetch(`/api/route/${routeId}`, {
				cache: 'no-store',
			})
			if (response.ok) {
				const data = await response.json()
				set(() => ({ scheduleData: data }))
			}
		} catch (error) {
			console.error('Error fetching schedule data:', error)
		}
	},
	initializeTimeUpdates: async () => {
		if (!timeUpdateInterval) {
			await fetchServerTime(set)
			timeUpdateInterval = setInterval(() => {
				fetchServerTime(set)
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
