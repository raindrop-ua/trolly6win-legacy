import styles from './DirectionBox.module.scss'
import React from 'react'
import { IDirection } from '@/types/types'
import { Plus } from 'lucide-react'
import EditorButton from '@/components/EditorComponents/EditorButton'
import WeekBox from '@/components/EditorComponents/WeekBox'
import EntityControls from '@/components/EditorComponents/EntityControls'

export interface DirectionBoxProps {
	direction: string
	directions: IDirection[]
}

const DirectionBox = ({ directions, direction }: DirectionBoxProps) => {
	const directionData = directions.find((dir) => dir.direction === direction)

	if (!directionData) {
		return (
			<div className={styles.Direction}>
				<EditorButton onClick={() => {}}>
					<span>{direction}</span>
					<Plus></Plus>
				</EditorButton>
			</div>
		)
	}

	return (
		<div key={directionData.id} className={styles.Direction}>
			<div className={styles.DirectionTitle}>
				<div>{directionData.direction}</div>
				<div>
					<EntityControls isPublished={true} />
				</div>
			</div>
			<WeekBox directionData={directionData} dayType={'weekday'} />
			<WeekBox directionData={directionData} dayType={'weekend'} />
		</div>
	)
}

export default DirectionBox
