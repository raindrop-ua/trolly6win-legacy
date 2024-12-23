import React from 'react'
import {
	LuBadgeInfo,
	LuMessageCircleWarning,
	LuTriangleAlert,
} from 'react-icons/lu'
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
				{isAlert && <LuTriangleAlert />}
				{isAttention && <LuBadgeInfo />}
				{!isAlert && !isAttention && <LuMessageCircleWarning />}
			</div>
		</div>
	)
}

export default ScheduleNote
