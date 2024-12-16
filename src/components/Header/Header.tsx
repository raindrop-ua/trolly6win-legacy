import React from 'react'
import Link from 'next/link'
import TrolleybusIcon from '@/components/TrolleybusIcon'
import InlineNoWrap from '@/components/InlineNoWrap'
import styles from './Header.module.scss'

const Header: React.FC = () => {
	return (
		<div className={styles.Header}>
			<div className={styles.HeaderGeometry}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 137 60'
					preserveAspectRatio='xMidYMid meet'
					fill='none'
				>
					<path
						stroke='#FFFFFF'
						strokeWidth='24'
						d='M17-8.7 68.3-60l51.3 51.3-51.3 51.3z'
					/>
				</svg>
			</div>
			<div className={styles.HeaderWrapper}>
				<div className={styles.HeaderLogo}>
					<div className={styles.HeaderImage}>
						<Link href={'/'} aria-label={'Home page'}>
							<TrolleybusIcon />
						</Link>
					</div>
					<div className={styles.HeaderText}>
						<div className={styles.HeaderTitle}>
							<h1>
								Trolly<span>Six</span>
							</h1>
						</div>
						<h2>
							Timetable for trolleybus route{' '}
							<InlineNoWrap>
								number <span>6</span> in
							</InlineNoWrap>{' '}
							the city of Dnipro.
						</h2>
					</div>
				</div>
			</div>
		</div>
	)
}

Header.displayName = 'Header'

export default Header
