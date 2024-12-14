import React, { FC } from 'react'
import styles from './StopCard.module.scss'
import { ArrowUpDown } from 'lucide-react'
import classNames from 'classnames'
import { IStopCardProps } from '@/types/types'

const StopCard: FC<IStopCardProps> = ({ itemData, isSelected }) => {
	const { id, name } = itemData
	return (
		<div
			className={classNames(styles.StopCard, { [styles.Selected]: isSelected })}
			data-id={id}
		>
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
