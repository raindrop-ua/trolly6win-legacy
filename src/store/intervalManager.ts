import { create } from 'zustand'

interface IntervalManagerState {
	initializeDataUpdate: () => void
	clearDataUpdates: () => void
}

const UPDATE_INTERVAL = 15_000
let timeUpdateInterval: NodeJS.Timeout | null = null

const useIntervalManager = create<IntervalManagerState>(() => {
	const fetchScheduleData = async () => {
		try {
			const response = await fetch(`http://localhost:4000/v1/schedule`, {
				cache: 'no-store',
			})
			if (response.ok) {
				const data = await response.json()
				const useScheduleStore = require('./scheduleStore').default
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

	initializeDataUpdate()

	return {
		initializeDataUpdate,
		clearDataUpdates,
	}
})

export default useIntervalManager
