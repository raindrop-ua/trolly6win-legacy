import React from 'react'
import Link from 'next/link'
import TrolleybusIcon from '../TrolleybusIcon'
import InlineNoWrap from '@/components/InlineNoWrap'
import styles from './Header.module.scss'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import UserBox from '@/components/UserBox'
import SectionWrapper from '@/components/SectionWrapper'

const Header: React.FC = () => {
	return (
		<div className={styles.HeaderWrapper}>
			<SectionWrapper as={'header'} useSection={false}>
				<div className={styles.HeaderTop}>
					<div>
						Don’t worry, if you miss this one, life’s full of second chances!
					</div>
					<div>
						<ThemeSwitcher />
					</div>
				</div>
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
					<div className={styles.HeaderInnerWrapper}>
						<div className={styles.HeaderLogo}>
							<div className={styles.HeaderImage}>
								<Link href={'/'} aria-label={'Home page'}>
									<TrolleybusIcon />
								</Link>
							</div>
							<div className={styles.HeaderText}>
								<div className={styles.HeaderTitle}>
									<p className={styles.Title}>
										Trolly<span className={styles.Note}>Six</span>
									</p>
								</div>
								<p className={styles.Subtitle}>
									Timetable for trolleybus route{' '}
									<InlineNoWrap>number 6 in</InlineNoWrap> the city of Dnipro.
								</p>
							</div>
						</div>
						<div>
							<UserBox />
						</div>
					</div>
				</div>
			</SectionWrapper>
		</div>
	)
}

Header.displayName = 'Header'

export default Header
