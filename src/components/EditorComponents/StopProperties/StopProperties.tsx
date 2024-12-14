'use client'

import React, { useEffect, useState } from 'react'
import styles from './StopProperties.module.scss'
import useEditorStore from '@/store/editorStore'
import { fetchStop } from '@/services/stopService'
import { formatToDateTime } from '@/utils/helpers'
import useToastStore from '@/store/toastStore'
import EditorButton from '@/components/EditorComponents/EditorButton'
import { Plus } from 'lucide-react'
import { useEditorModalStore } from '@/store/editorModalStore'
import { IDirection, Stop } from '@/types/types'
import DirectionBox from '@/components/EditorComponents/DirectionBox'

const StopProperties: React.FC<{}> = () => {
	const { addToast } = useToastStore()
	const { selectedStop } = useEditorStore()

	const openModal = useEditorModalStore((state) => state.openModal)
	const closeModal = useEditorModalStore((state) => state.closeModal)

	const [item, setItem] = useState<Stop>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadStop = async () => {
			try {
				setLoading(true)
				const stop = await fetchStop(selectedStop)
				stop && setItem(stop)
			} catch (err: any) {
				setError(err.message || 'Failed to load stops')
			} finally {
				setLoading(false)
			}
		}

		selectedStop && loadStop()
	}, [selectedStop])

	const handleClick = async () => {
		const handleOnSubmit = (e: any) => {
			e.preventDefault()
			const formData = new FormData(e.target as HTMLFormElement)
			const data = Object.fromEntries(formData.entries())
			closeModal(data)
		}
		const result = await openModal(
			<form onSubmit={handleOnSubmit}>
				<label>
					Name:
					<input name='name' type='text' required />
				</label>
				<button type='submit'>Submit</button>
			</form>,
			<div>Add direction</div>,
		)

		console.log('Data from modal:', result)
	}

	if (!item) {
		return (
			<div className={styles.StopProperties}>
				<p>Please select a trolleybus stop from the list.</p>
				<p>
					You can also drag and drop items to rearrange the order of stops
					according to the route sequence.
				</p>
			</div>
		)
	}

	return (
		<div className={styles.StopProperties}>
			<h3>{item?.name}</h3>
			<div className={styles.InternalName}>{item?.internalName}</div>
			<div className={styles.LastUpdate}>
				Last update{' '}
				{item?.updatedAt && (
					<span>
						<span>{formatToDateTime(item?.updatedAt)}</span>
					</span>
				)}
			</div>
			<div className={styles.Directions}>
				<DirectionBox directions={item.directions} direction={'forward'} />
				<DirectionBox directions={item.directions} direction={'backward'} />
			</div>
		</div>
	)
}

export default StopProperties
