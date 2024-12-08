import React, { FC } from 'react'
import styles from './StopCard.module.scss'
import { ArrowUpDown } from 'lucide-react'

interface StopCardProps {
	id: string
	title: string
	direction: string
}

const StopCard: FC<StopCardProps> = ({ id, title, direction }) => {
	return (
		<div className={styles.StopCard} data-id={id}>
			<div className={styles.Information}>
				<h3>{title}</h3>
				<div>
					<span>{direction}</span>
				</div>
			</div>
			<div>
				<ArrowUpDown />
			</div>
		</div>
	)
}

export default StopCard
