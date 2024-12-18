import React from 'react'
import { formatTime } from '@/utils/helpers'
import classNames from 'classnames'
import SimpleTimePicker from '@/components/EditorComponents/SimpleTimePicker'
import styles from './WeekBox.module.scss'
import { IDirection } from '@/types/types'
import useToastStore from '@/store/toastStore'
import EntityControls, {
	EntityControlAction,
} from '@/components/EditorComponents/EntityControls/EntityControls'

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

	const handleAction = (action: EntityControlAction, id: string) => {
		switch (action) {
			case EntityControlAction.Edit:
				break
			case EntityControlAction.Delete:
				addToast({
					message: `You have to unpublish departure time item before deleting it.`,
					type: 'error',
					duration: 3000,
				})
				break
			case EntityControlAction.Publish:
				break
			case EntityControlAction.Unpublish:
				break
		}
	}

	return (
		<div className={styles.WeekBox}>
			<div className={styles.WeekBoxTitle}>
				<span>{dayType}</span>
			</div>
			{directionData.departures
				.filter((i) => i.typeOfDay === dayType)
				.map((departure) => {
					return (
						<div
							key={departure.id}
							className={classNames(styles.Time, {
								[styles.Unpublished]: !departure.isPublished,
							})}
						>
							<div>{formatTime(departure.departureTime)}</div>
							<EntityControls
								onClick={(action) => {
									handleAction(action, departure.id)
								}}
								isPublished={departure.isPublished}
							/>
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
