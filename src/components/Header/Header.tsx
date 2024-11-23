import React from 'react'
import styles from './Header.module.scss'
import TrolleybusIcon from '@/components/TrolleybusIcon/TrolleybusIcon'
import Link from 'next/link'
import InlineNoWrap from '@/components/InlineNoWrap'

const Header: React.FC = () => {
	return (
		<div className={styles.Header}>
			<div className={styles.HeaderGeometry}>
				<svg xmlns='http://www.w3.org/2000/svg' width='137' height='60' fill='none'>
					<path stroke='#0075C9' strokeWidth='24' d='M17-8.7 68.3-60l51.3 51.3-51.3 51.3z' />
				</svg>
			</div>
			<div className={styles.HeaderImage}>
				<Link href={'/'}>
					<TrolleybusIcon />
				</Link>
			</div>
			<div className={styles.HeaderText}>
				<h1>
					Trolly<span>Six</span>
				</h1>
				<h2>
					Timetable for trolleybus route{' '}
					<InlineNoWrap>
						number <span>6</span> in
					</InlineNoWrap>{' '}
					the city of Dnipro.
				</h2>
			</div>
		</div>
	)
}

export default Header
