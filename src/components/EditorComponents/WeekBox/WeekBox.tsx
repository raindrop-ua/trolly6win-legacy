import React from 'react'
import { formatTime } from '@/utils/helpers'
import classNames from 'classnames'
import SimpleTimePicker from '@/components/EditorComponents/SimpleTimePicker'
import styles from './WeekBox.module.scss'
import { IDirection } from '@/types/types'
import useToastStore from '@/store/toastStore'
import EntityControls from '@/components/EditorComponents/EntityControls/EntityControls'

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
			<div className={styles.WeekBoxTitle}>
				<span>{dayType}</span>
			</div>
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
							<EntityControls isPublished={schedule.isPublished} />
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
