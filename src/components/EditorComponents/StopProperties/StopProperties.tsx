'use client'

import React, { useEffect, useState } from 'react'
import styles from './StopProperties.module.scss'
import useEditorStore from '@/store/editorStore'
import { Stop } from '@/services/stopsService'
import { fetchStop } from '@/services/stopService'

const StopProperties: React.FC<{}> = (props) => {
	const { selectedStop } = useEditorStore()
	const [item, setItem] = useState<Stop>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadStop = async () => {
			try {
				setLoading(true)
				const stops = await fetchStop(selectedStop)
				setItem(stop)
			} catch (err: any) {
				setError(err.message || 'Failed to load stops')
			} finally {
				setLoading(false)
			}
		}

		selectedStop && loadStop()
	}, [selectedStop])

	return (
		<div className={styles.StopProperties}>Stop Properties {selectedStop}</div>
	)
}

export default StopProperties
