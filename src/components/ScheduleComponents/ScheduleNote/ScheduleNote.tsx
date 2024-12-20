import React from 'react'
import {
	BadgeInfo,
	MessageCircleWarning,
	TriangleAlertIcon,
} from 'lucide-react'
import styles from './ScheduleNote.module.scss'
import classNames from 'classnames'

interface ScheduleNoteProps {
	className?: string
	children: React.ReactNode
	icon?: React.ReactNode
	isAlert?: boolean
	isAttention?: boolean
}

const ScheduleNote: React.FC<ScheduleNoteProps> = ({
	children,
	className,
	isAlert = false,
	isAttention = false,
}) => {
	return (
		<div
			className={classNames(styles.NoteWrapper, className, {
				[styles.Alert]: isAlert,
				[styles.Attention]: isAttention,
			})}
		>
			<div className={styles.Note}>{children}</div>
			<div className={styles.Icon}>
				{isAlert && <TriangleAlertIcon />}
				{isAttention && <BadgeInfo />}
				{!isAlert && !isAttention && <MessageCircleWarning />}
			</div>
		</div>
	)
}

export default ScheduleNote
