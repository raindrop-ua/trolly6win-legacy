import styles from './DirectionBox.module.scss'
import React from 'react'
import { IDirection } from '@/types/types'
import {
	Plus,
	X,
	Trash2,
	HardDriveUpload,
	HardDriveDownload,
} from 'lucide-react'
import EditorButton from '@/components/EditorComponents/EditorButton'
import { formatTime } from '@/utils/helpers'
import SimpleTimePicker from '@/components/EditorComponents/SimpleTimePicker/SimpleTimePicker'

interface DirectionBoxProps {
	direction: string
	directions: IDirection[]
}

const DirectionBox = ({ directions, direction }: DirectionBoxProps) => {
	const directionData = directions.find((dir) => dir.direction === direction)

	if (!directionData) {
		return (
			<div className={styles.Direction}>
				<EditorButton onClick={() => {}}>
					<span>{direction}</span>
					<Plus></Plus>
				</EditorButton>
			</div>
		)
	}

	return (
		<div key={directionData.id} className={styles.Direction}>
			<div className={styles.DirectionTitle}>
				<div>{directionData.direction}</div>
				<div></div>
			</div>
			<div className={styles.WeekBox}>
				<div className={styles.WeekBoxTitle}>Weekday</div>
				{directionData.schedules
					.filter((i) => i.typeOfDay === 'weekday')
					.map((schedule) => {
						return (
							<div key={schedule.id} className={styles.Time}>
								<div>{formatTime(schedule.departureTime)}</div>
								<div className={styles.DepartureControls}>
									<button className={styles.DepartureControlButton}>
										<HardDriveUpload size={18} />
									</button>
									<button className={styles.DepartureControlButton}>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
						)
					})}
				<div>
					<SimpleTimePicker onSubmit={() => {}} />
				</div>
			</div>
			<div className={styles.WeekBox}>
				<div className={styles.WeekBoxTitle}>Weekend</div>
				{directionData.schedules
					.filter((i) => i.typeOfDay === 'weekend')
					.map((schedule) => {
						return (
							<div key={schedule.id} className={styles.Time}>
								{formatTime(schedule.departureTime)}
							</div>
						)
					})}
				<EditorButton className={styles.AddTime} onClick={() => {}}>
					<span>Add time</span>
					<Plus></Plus>
				</EditorButton>
			</div>
		</div>
	)
}

export default DirectionBox
