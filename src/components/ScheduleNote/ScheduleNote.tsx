import { MessageCircleWarning } from 'lucide-react'
import styles from './ScheduleNote.module.scss'

const ScheduleNote = () => {
	return (
		<div className={styles.NoteWrapper}>
			<div className={styles.Note}>
				<span>
					Schedule changes may occur due to unforeseen situations along the
					route.
				</span>
				<span>Thank you for riding the trolleybus!</span>
			</div>
			<div className={styles.Icon}>
				<MessageCircleWarning size={32} />
			</div>
		</div>
	)
}

export default ScheduleNote
