import { MessageCircleWarning } from 'lucide-react'
import React from 'react'
import styles from './ScheduleNote.module.scss'

interface ScheduleNoteProps {
	className?: string
	children: React.ReactNode
}

const ScheduleNote: React.FC<ScheduleNoteProps> = ({ children }) => {
	return (
		<div className={styles.NoteWrapper}>
			<div className={styles.Note}>{children}</div>
			<div className={styles.Icon}>
				<MessageCircleWarning size={32} />
			</div>
		</div>
	)
}

export default ScheduleNote
