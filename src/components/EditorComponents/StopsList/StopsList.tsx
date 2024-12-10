'use client'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import styles from './StopsList.module.scss'
import StopCard from '@/components/EditorComponents/StopCard'
import useToastStore from '@/store/toastStore'
import { fetchStops, Stop, updateStopsOrder } from '@/services/stopsService'
import useEditorStore from '@/store/editorStore'

const StopsList = () => {
	const { addToast } = useToastStore()
	const { setSelectedStop } = useEditorStore()
	const [items, setItems] = useState<Stop[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadStops = async () => {
			try {
				setLoading(true)
				const stops = await fetchStops()
				setItems(stops.sort((a, b) => a.sortIndex - b.sortIndex))
			} catch (err: any) {
				setError(err.message || 'Failed to load stops')
			} finally {
				setLoading(false)
			}
		}

		loadStops()
	}, [])

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
				message: 'Order has been saved.',
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
											className={styles.Item}
											style={{
												...provided.draggableProps.style,
											}}
											onClick={() => handleStopItemClick(item)}
										>
											<StopCard itemData={item} />
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}

export default StopsList
