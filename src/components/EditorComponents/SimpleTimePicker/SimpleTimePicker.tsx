import React, { useState } from 'react'
import EditorButton from '@/components/EditorComponents/EditorButton'
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
			<div className={styles.Wrapper}>
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
			</div>
			<EditorButton className={styles.SubmitButton} onClick={handleSubmit}>
				<span>Add time</span>
				<Plus></Plus>
			</EditorButton>
		</>
	)
}

export default SimpleTimePicker
