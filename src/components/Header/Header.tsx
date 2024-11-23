import React from 'react'
import styles from './Header.module.scss'
import TrolleybusIcon from '@/components/TrolleybusIcon/TrolleybusIcon'

const Header: React.FC = () => {
	return (
		<div className={styles.Header}>
			<div className={styles.HeaderImage}>
				<TrolleybusIcon />
			</div>
			<div className={styles.HeaderText}>
				<h1>
					Trolly<span>Six</span>
				</h1>
				<h2>
					Timetable for trolleybus route number <span>6</span> in the city of Dnipro.
				</h2>
			</div>
		</div>
	)
}

export default Header
