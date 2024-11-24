import React from 'react'
import useScheduleStore from '@/store/scheduleStore'
import { ListFilter } from 'lucide-react'
import styles from './TimeListFilter.module.scss'

const TimeListFilter = () => {
	const { filter, setFilter } = useScheduleStore()

	return (
		<div className={styles.TimeListFilter}>
			<ListFilter />

			<ul className={styles.Items}>
				<li className={styles.Item}>
					<button
						className={`${styles.Button} ${
							filter === 'all' ? styles.Active : ''
						}`}
						onClick={() => setFilter('all')}
					>
						<span className={styles.Caption}>Show all</span>
					</button>
				</li>
				<li className={styles.Item}>
					<button
						className={`${styles.Button} ${
							filter === 'upcoming' ? styles.Active : ''
						}`}
						onClick={() => setFilter('upcoming')}
					>
						<span className={styles.Caption}>Show only upcoming</span>
					</button>
				</li>
			</ul>
		</div>
	)
}

TimeListFilter.displayName = 'TimeListFilter'

export default TimeListFilter
