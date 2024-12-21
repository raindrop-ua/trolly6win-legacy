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
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='1em'
							height='1em'
							fill='currentColor'
							viewBox='0 0 256 256'
							className=''
						>
							<path d='M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z'></path>
						</svg>
						Don’t worry, if you miss this one, life’s full of second chances!
					</div>
					<div>
						<ThemeSwitcher />
					</div>
				</div>
				<div className={styles.Header}>
					<div className={styles.HeaderBackground}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 137 19'
							preserveAspectRatio='xMidYMid meet'
							fill='none'
						>
							<path
								fill='currentColor'
								d='M112.8 19v-7.8h-2.6V8.4l2.6-.4 3.7-.7V19h-3.7ZM108.3 19a5 5 0 0 0-1.7-3.5 16 16 0 0 0-4.7-2.7 430.9 430.9 0 0 1-3.4-1.6 4 4 0 0 1-1.2-1 2 2 0 0 1-.4-1.2c0-1.2.7-2 2.2-2.7 1.4-.7 3.1-1 5.1-1h2.2V2l-2.2-.1c-3.2 0-5.9.7-8 2-2.2 1.4-3.3 3.3-3.3 5.5 0 2.7 2 4.8 6 6.4a15.8 15.8 0 0 1 2 .8 11.5 11.5 0 0 1 1.8.8l.6.5.6.5.3.6h4.1ZM85 19c2-3.5 3-6.7 3-9.6a9 9 0 0 0 0-1.7l-3.8.6.1 1.2c0 1.5-.3 3.1-.9 5-.5 1.6-1.2 3.1-2.1 4.5H85ZM75.6 19 72 8h4l3.4 11h-3.8ZM66.6 19V2l-3.7.7V19h3.7ZM55.8 19V2l-3.7.7V19h3.7ZM48.6 19c.2-.8.2-1.7.2-2.6 0-2.5-.7-4.7-2.3-6.5A8 8 0 0 0 40 7.3c-2.8 0-5 1-6.6 3A11.3 11.3 0 0 0 31 19H35l-.1-1.6a8 8 0 0 1 1.3-5c.9-1.1 2.2-1.7 4-1.7 1.6 0 2.9.6 3.7 1.7a6.8 6.8 0 0 1 1.3 4.2c0 1 0 1.7-.2 2.4h3.7ZM23.5 19v-6.3c1.8-1.3 4-2 6.7-2V7.4c-2.5 0-4.9.7-7 2l-2.4-1.5h-1V19h3.7ZM12 19V6h6.5l.7-3.3H.9V6H8V19H12ZM131.7 19l-1.4-2 6.4-7.6-2.6-2.2-5.7 7L124 8h-4.3l6.1 8.7-2 2.3h8ZM113 5.5l.5-5 4 .4-.9 4-3.6.6Z'
							/>
						</svg>
					</div>
					<div className={styles.HeaderGeometry}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 137 60'
							preserveAspectRatio='xMidYMid meet'
							fill='none'
						>
							<path
								stroke='currentColor'
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
