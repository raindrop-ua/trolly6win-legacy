import React, { FC } from 'react'
import styles from './StopCard.module.scss'
import { ArrowUpDown } from 'lucide-react'

interface StopCardProps {
	itemData: {
		id: string
		name: string
		directions?: string
		isDefault?: boolean
	}
}

const StopCard: FC<StopCardProps> = ({ itemData }) => {
	const { id, name } = itemData
	return (
		<div className={styles.StopCard} data-id={id}>
			<div className={styles.Information}>
				<h3>{name}</h3>
			</div>
			<div className={styles.Icon}>
				<ArrowUpDown />
			</div>
		</div>
	)
}

export default StopCard
