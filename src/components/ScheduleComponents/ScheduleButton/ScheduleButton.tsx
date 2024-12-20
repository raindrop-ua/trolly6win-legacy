import React, { ReactElement, useState } from 'react'
import classNames from 'classnames'
import styles from './ScheduleButton.module.scss'
import { Heart } from 'lucide-react'

interface ScheduleButtonProps {
	className?: string
	children?: React.ReactNode
	label?: string
	value?: string
	icon?: ReactElement
	isSelected?: boolean
	isFavorite?: boolean
	size?: 'small' | 'medium' | 'large'
	onClick: (option: string) => void
}

type Ripple = {
	id: number
	left: number
	top: number
	size: number
}

const ScheduleButton: React.FC<ScheduleButtonProps> = ({
	className,
	children,
	label,
	value,
	size,
	onClick,
	isSelected,
	isFavorite,
	icon,
	...props
}) => {
	const [ripples, setRipples] = useState<Ripple[]>([])

	const handleMouseDown = (
		e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLElement>,
	) => {
		const rippleId = new Date().getTime()
		const rect = e.currentTarget.getBoundingClientRect()
		const size = Math.max(rect.width, rect.height)
		const left = e.clientX - rect.left - size / 2
		const top = e.clientY - rect.top - size / 2

		setRipples((prevRipples) => [
			...prevRipples,
			{ id: rippleId, left, top, size },
		])

		setTimeout(() => {
			setRipples((prevRipples) => prevRipples.filter((r) => r.id !== rippleId))
		}, 800)
	}

	const favoriteIcon = isFavorite && (
		<span className={styles.Favorite}>
			<Heart size={32} strokeWidth={1} />
		</span>
	)

	return (
		<button
			{...props}
			className={classNames(className, styles.Button, {
				[styles.Active]: isSelected,
				[styles.Small]: size === 'small',
				[styles.Medium]: size === 'medium',
				[styles.Large]: size === 'large',
			})}
			onClick={(e) => {
				value && onClick(value)
				handleMouseDown(e)
			}}
			aria-pressed={isSelected}
			aria-label={`Select ${value}`}
		>
			<div className={styles.RippleEffectWrapper}>
				{ripples.map((ripple) => (
					<span
						key={ripple.id}
						className={classNames(styles.RippleEffect)}
						style={{
							left: ripple.left,
							top: ripple.top,
							width: ripple.size,
							height: ripple.size,
						}}
					></span>
				))}
			</div>
			{label && !children && !icon && (
				<>
					<span className={styles.SpaceHolder} aria-hidden={true}>
						{label} {favoriteIcon}
					</span>
					<span className={styles.Caption}>
						{label} {favoriteIcon}
					</span>
				</>
			)}
			{children && <span className={styles.BaselineContent}>{children}</span>}
		</button>
	)
}

export default ScheduleButton
