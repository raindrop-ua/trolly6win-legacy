import React, { ReactElement, useState } from 'react'
import classNames from 'classnames'
import styles from './BaselineButton.module.scss'

interface BaselineButtonProps {
	value: string
	Icon?: ReactElement
	selectedOption: string
	onClick: (option: string) => void
}

type Ripple = {
	id: number
	left: number
	top: number
	size: number
}

const BaselineButton: React.FC<BaselineButtonProps> = ({
	value,
	onClick,
	selectedOption,
	Icon,
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

	return (
		<button
			className={`${styles.Button} ${selectedOption === value ? styles.Active : ''}`}
			onClick={() => onClick(value)}
			onMouseDown={handleMouseDown}
			aria-pressed={selectedOption === value}
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
			{Icon ? (
				<>
					{Icon as ReactElement}
					<div className={styles.Tooltip}>
						<div className={styles.TooltipText}>{value}</div>
					</div>
				</>
			) : (
				<>
					<span className={styles.SpaceHolder} aria-hidden={true}>
						{value}
					</span>
					<span className={styles.Caption}>{value}</span>
				</>
			)}
		</button>
	)
}

export default BaselineButton
