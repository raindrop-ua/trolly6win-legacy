import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './EditorButton.module.scss'

type Ripple = {
	id: number
	left: number
	top: number
	size: number
}

interface Props {
	className?: string
	children: React.ReactNode
	onClick?: (e: any) => void
	type?: 'button' | 'submit' | 'reset'
}

const EditorButton: React.FC<Props> = ({
	children,
	className,
	onClick,
	type = 'button',
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
			type={type}
			className={classNames(styles.EditorButton, className)}
			onClick={onClick}
			onMouseDown={handleMouseDown}
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
			{children}
		</button>
	)
}

export default EditorButton
