import React from 'react'
import { formatTime } from '@/utils/helpers'
import classNames from 'classnames'
import {
	HardDriveUpload,
	Trash2,
	Pencil,
	HardDriveDownload,
} from 'lucide-react'
import SimpleTimePicker from '@/components/EditorComponents/SimpleTimePicker/SimpleTimePicker'
import styles from './WeekBox.module.scss'
import { IDirection } from '@/types/types'
import useToastStore from '@/store/toastStore'

interface WeekBoxProps {
	directionData: IDirection
	dayType: 'weekend' | 'weekday'
}

const WeekBox: React.FC<WeekBoxProps> = ({ directionData, dayType }) => {
	const { addToast } = useToastStore()

	const handle = (time: string) => {
		addToast({
			message: `New time ${time} has been saved.`,
			type: 'success',
			duration: 3000,
		})
	}

	return (
		<div className={styles.WeekBox}>
			<div className={styles.WeekBoxTitle}>{dayType}</div>
			{directionData.schedules
				.filter((i) => i.typeOfDay === dayType)
				.map((schedule) => {
					return (
						<div
							key={schedule.id}
							className={classNames(styles.Time, {
								[styles.Unpublished]: !schedule.isPublished,
							})}
						>
							<div>{formatTime(schedule.departureTime)}</div>
							<div className={styles.DepartureControls}>
								<button
									className={classNames(
										styles.DepartureControlButton,
										styles.Edit,
									)}
								>
									<Pencil size={18} />
								</button>
								{schedule.isPublished ? (
									<button
										className={classNames(
											styles.DepartureControlButton,
											styles.Publish,
										)}
									>
										<HardDriveDownload size={18} />
									</button>
								) : (
									<button
										className={classNames(
											styles.DepartureControlButton,
											styles.Publish,
										)}
									>
										<HardDriveUpload size={18} />
									</button>
								)}

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
				<SimpleTimePicker onSubmit={handle} />
			</div>
		</div>
	)
}

export default WeekBox
