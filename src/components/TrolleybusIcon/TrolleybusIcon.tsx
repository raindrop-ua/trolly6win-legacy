import { FC } from 'react'
import styles from './TrolleybusIcon.module.scss'
import classNames from 'classnames'

interface TrolleybusIconProps {
	className?: string
}

const TrolleybusIcon: FC<TrolleybusIconProps> = ({ className }) => {
	return (
		<div className={classNames(className, styles.TrolleybusIcon)}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 56 84'
				preserveAspectRatio='xMidYMid meet'
			>
				<path fill='#FFFFFF' d='M7.1 76h8.2v7H7v-7ZM40.7 76H49v7h-8.2v-7Z' />
				<path
					fill='#FFFFFF'
					fillRule='evenodd'
					d='M1 22h54v55H1V22Zm8.2 9h37.6v23H9.2V31Zm11.2 31h-6.2v6h6.2v-6Zm21.4 0h-6.2v6h6.2v-6Z'
					clipRule='evenodd'
				/>
				<path
					fill='#FFFFFF'
					d='m21.4 1-7.2 19H23L30 1h-8.6ZM38.7 1l-7.1 19h8.6l7.2-19h-8.7Z'
				/>
			</svg>
		</div>
	)
}

TrolleybusIcon.displayName = 'TrolleybusIcon'

export default TrolleybusIcon
