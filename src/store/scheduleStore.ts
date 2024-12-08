import { create } from 'zustand'
import { DayType, StopType, FilterType, DirectionType } from '@/types/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface ScheduleState {
	dayType: DayType | null
	directionType: DirectionType | null
	selectedStop: StopType | null
	filter: FilterType
	scheduleData: Record<string, any> | null
	loadDefaults: () => Promise<void>
	setDayType: (dayType: DayType) => void
	setDirectionType: (directionType: DirectionType) => void
	setSelectedStop: (stop: StopType) => void
	setFilter: (filter: FilterType) => void
	setScheduleData: (data: Record<string, any> | null) => void
}

const useScheduleStore = create<ScheduleState>((set) => ({
	dayType: null,
	directionType: null,
	selectedStop: null,
	filter: 'all',
	scheduleData: null,

	loadDefaults: async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/schedule/configuration`, {
				cache: 'no-store',
			})
			if (!response.ok) {
				throw new Error('Failed to load configuration')
			}

			const config = await response.json()
			const { default: defaults } = config

			set({
				dayType: defaults.day.internalName,
				directionType: defaults.direction.internalName,
				selectedStop: defaults.stop.internalName,
			})
		} catch (error) {
			console.error('Error loading defaults:', error)
		}
	},

	setDayType: (dayType) => set(() => ({ dayType })),
	setDirectionType: (directionType) => set(() => ({ directionType })),
	setSelectedStop: (stop) => set(() => ({ selectedStop: stop })),
	setFilter: (filter) => set(() => ({ filter })),
	setScheduleData: (data) => set(() => ({ scheduleData: data })),
}))

export default useScheduleStore
