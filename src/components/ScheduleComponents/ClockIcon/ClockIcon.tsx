import React, { FC } from 'react'
import classNames from 'classnames'

interface ClockIconProps {
	time?: string
	size?: number
	className?: string
}

const ClockIcon: FC<ClockIconProps> = ({
	time = '00:00',
	size = 24,
	className,
}) => {
	const [hours, minutes] = time.split(':').map(Number)

	// Calculating angles for arrows
	const hourAngle = (360 / 12) * (hours % 12) + (30 / 60) * minutes // Clockwise angle
	const minuteAngle = (360 / 60) * minutes // Minute hand angle

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={`${classNames(className)}`}
			aria-hidden='true'
		>
			<circle cx='12' cy='12' r='10'></circle>
			{/* Hour hand */}
			<line
				x1='12'
				y1='12'
				x2='12'
				y2='8' // Length of the arrow to the center of the circle
				transform={`rotate(${hourAngle} 12 12)`}
			/>
			{/* Minute hand */}
			<line
				x1='12'
				y1='12'
				x2='12'
				y2='6' // The length of the minute hand is longer than the hour hand
				transform={`rotate(${minuteAngle} 12 12)`}
			/>
		</svg>
	)
}

export default ClockIcon
