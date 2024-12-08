'use client'

import { useEffect } from 'react'
import useIntervalManager from '@/store/intervalManager'

const IntervalInitializer = () => {
	const { initializeDataUpdate, clearDataUpdates } = useIntervalManager()

	useEffect(() => {
		initializeDataUpdate()

		return () => {
			clearDataUpdates()
		}
	}, [initializeDataUpdate, clearDataUpdates])

	return null
}

export default IntervalInitializer
