import React, { useEffect, useRef, useState } from 'react'
import { Plus, ChevronDown, ChevronUp } from 'lucide-react'
import styles from './SimpleTimePicker.module.scss'

interface Props {
	initialTime?: string
	onSubmit: (time: string) => void
}

const SimpleTimePicker: React.FC<Props> = ({
	initialTime = '12:00',
	onSubmit,
}) => {
	const [time, setTime] = useState(initialTime)
	const [width, setWidth] = useState(0)
	const ref = useRef(null)

	useEffect(() => {
		const element = ref.current

		const resizeObserver = new ResizeObserver((entries) => {
			if (entries.length > 0) {
				const { width } = entries[0].contentRect
				setWidth(width)
			}
		})

		if (element) {
			resizeObserver.observe(element)
		}

		return () => {
			if (element) {
				resizeObserver.unobserve(element)
			}
		}
	}, [])

	const adjustTime = (type: 'hours' | 'minutes', amount: number) => {
		const [hours, minutes] = time.split(':').map(Number)
		let newHours = hours
		let newMinutes = minutes

		if (type === 'hours') {
			newHours = (hours + amount + 24) % 24
		} else if (type === 'minutes') {
			const totalMinutes = hours * 60 + minutes + amount
			newHours = Math.floor(((totalMinutes + 1440) % 1440) / 60)
			newMinutes = (totalMinutes + 1440) % 60
		}

		const formattedTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`
		setTime(formattedTime)
	}

	const handleSubmit = () => {
		if (onSubmit) onSubmit(time)
	}

	return (
		<>
			<div className={styles.Wrapper} ref={ref} data-width={width}>
				<div className={styles.Controls}>
					<button
						className={styles.Button}
						onClick={() => adjustTime('hours', 1)}
					>
						<ChevronUp />
					</button>
					<button
						className={styles.Button}
						onClick={() => adjustTime('hours', -1)}
					>
						<ChevronDown />
					</button>
				</div>
				<div className={styles.TimeDisplay}>
					<span>{time}</span>
				</div>
				<div className={styles.Controls}>
					<button
						className={styles.Button}
						onClick={() => adjustTime('minutes', 1)}
					>
						<ChevronUp />
					</button>
					<button
						className={styles.Button}
						onClick={() => adjustTime('minutes', -1)}
					>
						<ChevronDown />
					</button>
				</div>
				<button className={styles.AddButton} onClick={handleSubmit}>
					<Plus />
				</button>
			</div>
		</>
	)
}

export default SimpleTimePicker
