'use client'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useState } from 'react'
import styles from './StopsList.module.scss'
import StopCard from '@/components/EditorComponents/StopCard/StopCard'
import useToastStore from '@/store/toastStore'

const StopsList = () => {
	const { addToast } = useToastStore()
	const [items, setItems] = useState([
		{ id: '1', title: 'Pridniprovsk', direction: 'Forward' },
		{ id: '2', title: 'Rotorna', direction: 'Forward / Backward' },
		{ id: '3', title: 'Museum', direction: 'Backward' },
	])

	const handleOnDragEnd = (result: any) => {
		if (!result.destination) return

		const reorderedItems = Array.from(items)
		const [removed] = reorderedItems.splice(result.source.index, 1)
		reorderedItems.splice(result.destination.index, 0, removed)

		setTimeout(() => {
			addToast({
				message: 'Order has been saved.',
				type: 'info',
				duration: 3000,
			})
		}, 1000)

		setItems(reorderedItems)
	}

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
							{items.map(({ id, title, direction }, index) => (
								<Draggable key={id} draggableId={id} index={index}>
									{(provided) => (
										<li
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className={styles.Item}
											style={{
												...provided.draggableProps.style,
											}}
											onClick={() => {
												console.log('yo', id)
											}}
										>
											<StopCard id={id} title={title} direction={direction} />
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
