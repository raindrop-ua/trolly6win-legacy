'use client'

import styles from './EditorModal.module.scss'
import useEditorModalStore from '@/store/editorModalStore'
import EditorButton from '@/components/EditorComponents/EditorButton'
import { X } from 'lucide-react'

const EditorModal: React.FC = () => {
	const { isOpen, modalContent, modalTitle, closeModal } = useEditorModalStore()

	if (!isOpen) return null

	return (
		<div className={styles.Overlay}>
			<div className={styles.Content}>
				<div className={styles.ContentHeader}>
					<div>{modalTitle}</div>
					<EditorButton onClick={closeModal} className={styles.CloseButton}>
						<X />
					</EditorButton>
				</div>
				{modalContent}
			</div>
		</div>
	)
}

export default EditorModal
