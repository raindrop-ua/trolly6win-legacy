import React from 'react'
import { formatTime } from '@/utils/helpers'
import classNames from 'classnames'
import { HardDriveUpload, Trash2 } from 'lucide-react'
import SimpleTimePicker from '@/components/EditorComponents/SimpleTimePicker/SimpleTimePicker'
import styles from './WeekBox.module.scss'
import { IDirection } from '@/types/types'

interface WeekBoxProps {
	directionData: IDirection
	dayType: 'weekend' | 'weekday'
}

const WeekBox: React.FC<WeekBoxProps> = ({ directionData, dayType }) => {
	return (
		<div className={styles.WeekBox}>
			<div className={styles.WeekBoxTitle}>Weekday</div>
			{directionData.schedules
				.filter((i) => i.typeOfDay === dayType)
				.map((schedule) => {
					return (
						<div key={schedule.id} className={styles.Time}>
							<div>{formatTime(schedule.departureTime)}</div>
							<div className={styles.DepartureControls}>
								<button
									className={classNames(
										styles.DepartureControlButton,
										styles.Upload,
									)}
								>
									<HardDriveUpload size={18} />
								</button>
								<button
									className={classNames(
										styles.DepartureControlButton,
										styles.Delete,
									)}
								>
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
	)
}

export default WeekBox
