import React from 'react'
import useScheduleStore from '@/store/scheduleStore'
import { ListFilter } from 'lucide-react'
import styles from './TimeListFilter.module.scss'
import BaselineButton from '../BaselineButton'

const TimeListFilter = () => {
	const { filter, setFilter } = useScheduleStore()

	return (
		<div className={styles.TimeListFilter}>
			<ListFilter />
			<ul className={styles.Items}>
				<li className={styles.Item}>
					<BaselineButton
						label={'Show all'}
						value={'all'}
						isSelected={filter === 'all'}
						size={'small'}
						onClick={() => setFilter('all')}
					/>
				</li>
				<li className={styles.Item}>
					<BaselineButton
						label={'Show only upcoming'}
						value={'upcoming'}
						isSelected={filter === 'upcoming'}
						size={'small'}
						onClick={() => setFilter('upcoming')}
					/>
				</li>
			</ul>
		</div>
	)
}

TimeListFilter.displayName = 'TimeListFilter'

export default TimeListFilter
