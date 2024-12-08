'use client'

import { useEffect } from 'react'
import useIntervalManager from '@/store/intervalManager'
import useScheduleStore from '@/store/scheduleStore'

const IntervalInitializer = () => {
	const { initializeDataUpdate, clearDataUpdates } = useIntervalManager()
	const loadDefaults = useScheduleStore((state) => state.loadDefaults)

	useEffect(() => {
		let isMounted = true

		loadDefaults()
			.then(() => {
				if (isMounted) {
					initializeDataUpdate()
				}
			})
			.catch((error) => {
				console.error('Error loading defaults:', error)
			})

		return () => {
			isMounted = false
			clearDataUpdates()
		}
	}, [initializeDataUpdate, clearDataUpdates, loadDefaults])

	return null
}

export default IntervalInitializer
