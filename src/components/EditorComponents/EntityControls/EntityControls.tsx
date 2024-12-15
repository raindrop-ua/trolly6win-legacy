import styles from './EntityControls.module.scss'
import classNames from 'classnames'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import React from 'react'

export enum EntityControlAction {
	Edit = 'edit',
	Delete = 'delete',
	Publish = 'publish',
	Unpublish = 'unpublish',
}

interface EntityControlsProps {
	isPublished?: boolean
	onClick?: (action: EntityControlAction) => void
}

const EntityControls: React.FC<EntityControlsProps> = ({
	isPublished,
	onClick,
}) => {
	const handleClick = (action: EntityControlAction) => {
		onClick && onClick(action)
	}

	return (
		<div className={styles.EntityControls}>
			<button
				className={classNames(styles.ControlButton, styles.Edit)}
				onClick={() => handleClick(EntityControlAction.Edit)}
			>
				<Pencil size={18} />
			</button>
			{isPublished ? (
				<button
					className={classNames(styles.ControlButton, styles.Unpublish)}
					onClick={() => handleClick(EntityControlAction.Unpublish)}
				>
					<EyeOff size={18} />
				</button>
			) : (
				<button
					className={classNames(styles.ControlButton, styles.Publish)}
					onClick={() => handleClick(EntityControlAction.Publish)}
				>
					<Eye size={18} />
				</button>
			)}

			<button
				className={classNames(styles.ControlButton, styles.Delete)}
				onClick={() => handleClick(EntityControlAction.Delete)}
			>
				<Trash2 size={18} />
			</button>
		</div>
	)
}

export default EntityControls
