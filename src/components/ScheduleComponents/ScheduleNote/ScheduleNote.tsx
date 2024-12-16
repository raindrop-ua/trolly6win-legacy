import React from 'react'
import { MessageCircleWarning, TriangleAlertIcon } from 'lucide-react'
import styles from './ScheduleNote.module.scss'
import classNames from 'classnames'

interface ScheduleNoteProps {
	className?: string
	children: React.ReactNode
	icon?: React.ReactNode
	isAlert?: boolean
}

const ScheduleNote: React.FC<ScheduleNoteProps> = ({
	children,
	className,
	isAlert = false,
}) => {
	return (
		<div
			className={classNames(styles.NoteWrapper, className, {
				[styles.Alert]: isAlert,
			})}
		>
			<div className={styles.Note}>{children}</div>
			<div className={styles.Icon}>
				{isAlert ? <TriangleAlertIcon /> : <MessageCircleWarning />}
			</div>
		</div>
	)
}

export default ScheduleNote
