import React, { FC } from 'react'
import styles from './StopCard.module.scss'
import { ArrowUpDown, Check } from 'lucide-react'

interface StopCardProps {
	itemData: {
		id: string
		name: string
		directions?: string
		isDefault?: boolean
	}
}

const StopCard: FC<StopCardProps> = ({ itemData }) => {
	const { id, name, directions, isDefault } = itemData
	return (
		<div className={styles.StopCard} data-id={id}>
			<div className={styles.Information}>
				<h3>{name}</h3>
			</div>
			<div>
				<ArrowUpDown />
			</div>
		</div>
	)
}

export default StopCard
