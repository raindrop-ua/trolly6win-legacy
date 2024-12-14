import styles from './EntityControls.module.scss'
import classNames from 'classnames'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import React from 'react'

const EntityControls = ({ isPublished }: { isPublished: boolean }) => {
	return (
		<div className={styles.EntityControls}>
			<button className={classNames(styles.ControlButton, styles.Edit)}>
				<Pencil size={18} />
			</button>
			{isPublished ? (
				<button className={classNames(styles.ControlButton, styles.Publish)}>
					<EyeOff size={18} />
				</button>
			) : (
				<button className={classNames(styles.ControlButton, styles.Publish)}>
					<Eye size={18} />
				</button>
			)}

			<button className={classNames(styles.ControlButton, styles.Delete)}>
				<Trash2 size={18} />
			</button>
		</div>
	)
}

export default EntityControls
