import { create } from 'zustand'

interface IntervalManagerState {
	initializeDataUpdate: () => void
	clearDataUpdates: () => void
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const UPDATE_INTERVAL = 30_000
let timeUpdateInterval: NodeJS.Timeout | null = null

const useIntervalManager = create<IntervalManagerState>(() => {
	const fetchScheduleData = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/schedule`, {
				cache: 'no-store',
			})
			if (response.ok) {
				const data = await response.json()
				const { default: useScheduleStore } = await import('./scheduleStore')
				useScheduleStore.getState().setScheduleData(data)
			}
		} catch (error) {
			console.error('Error fetching schedule data:', error)
		}
	}

	const initializeDataUpdate = () => {
		if (!timeUpdateInterval) {
			timeUpdateInterval = setInterval(fetchScheduleData, UPDATE_INTERVAL)
			fetchScheduleData()
		}
	}

	const clearDataUpdates = () => {
		if (timeUpdateInterval) {
			clearInterval(timeUpdateInterval)
			timeUpdateInterval = null
		}
	}

	return {
		initializeDataUpdate,
		clearDataUpdates,
	}
})

export default useIntervalManager
