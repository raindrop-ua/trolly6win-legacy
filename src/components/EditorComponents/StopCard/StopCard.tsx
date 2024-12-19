import React, { FC } from 'react'
import styles from './StopCard.module.scss'
import { ArrowUpDown, Star } from 'lucide-react'
import classNames from 'classnames'
import { IStopCardProps } from '@/types/types'

const StopCard: FC<IStopCardProps> = ({ itemData, isSelected }) => {
	const { id, name, isPublished, isDefault } = itemData

	return (
		<div
			className={classNames(styles.StopCard, {
				[styles.Selected]: isSelected,
				[styles.Unpublished]: !isPublished,
			})}
			data-id={id}
		>
			<div className={styles.Information}>
				<h3>
					{name}
					{isDefault && (
						<span>
							<Star size={18} />
						</span>
					)}
				</h3>
			</div>
			<div className={styles.Icon}>
				<ArrowUpDown />
			</div>
		</div>
	)
}

export default StopCard
