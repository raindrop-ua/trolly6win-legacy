'use client'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import React, { useEffect, useState } from 'react'
import styles from './StopsList.module.scss'
import StopCard from '@/components/EditorComponents/StopCard'
import useToastStore from '@/store/toastStore'
import { fetchStops, updateStopsOrder } from '@/services/stopsService'
import useEditorStore from '@/store/editorStore'
import EditorButton from '@/components/EditorComponents/EditorButton'
import { Plus } from 'lucide-react'
import classNames from 'classnames'
import { Stop } from '@/types/types'
import { useEditorModalStore } from '@/store/editorModalStore'

const StopsList = () => {
	const { addToast } = useToastStore()
	const { selectedStop, setSelectedStop } = useEditorStore()
	const [items, setItems] = useState<Stop[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const openModal = useEditorModalStore((state) => state.openModal)
	const closeModal = useEditorModalStore((state) => state.closeModal)

	useEffect(() => {
		const loadStops = async () => {
			try {
				setLoading(true)
				const stops = await fetchStops()
				stops && setItems(stops.sort((a, b) => a.sortIndex - b.sortIndex))
			} catch (err: any) {
				setError(err.message || 'Failed to load stops')
			} finally {
				setLoading(false)
			}
		}

		loadStops()
	}, [])

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

	const handleOnDragEnd = async (result: any) => {
		if (!result.destination) return

		const reorderedItems = Array.from(items)
		const [removed] = reorderedItems.splice(result.source.index, 1)
		reorderedItems.splice(result.destination.index, 0, removed)

		setItems(reorderedItems)

		const sortPayload = reorderedItems.map((item, index) => ({
			id: item.id,
			sortIndex: (index + 1) * 10,
		}))

		try {
			await updateStopsOrder(sortPayload)
			addToast({
				message: 'New stops order has been saved.',
				type: 'success',
				duration: 3000,
			})
		} catch (err: any) {
			addToast({
				message: 'Failed to save the new order.',
				type: 'error',
				duration: 3000,
			})
			console.error(err)
		}

		setItems(reorderedItems)
	}

	const handleStopItemClick = (item: Stop) => {
		setSelectedStop(item.id)
	}

	if (loading) return <p>Loading stops...</p>
	if (error) return <p className={styles.ErrorMessage}>{error}</p>

	return (
		<div className={styles.StopsListWrapper}>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId='list'>
					{(provided) => (
						<ul
							{...provided.droppableProps}
							ref={provided.innerRef}
							className={styles.StopsList}
						>
							{items.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{(provided) => (
										<li
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className={classNames(styles.Item)}
											style={{
												...provided.draggableProps.style,
											}}
											onClick={() => handleStopItemClick(item)}
										>
											<StopCard
												itemData={item}
												isSelected={item.id === selectedStop}
											/>
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
			<div className={styles.Controls}>
				<EditorButton onClick={handleClick}>
					<span>Add new stop</span>
					<Plus></Plus>
				</EditorButton>
			</div>
		</div>
	)
}

export default StopsList
