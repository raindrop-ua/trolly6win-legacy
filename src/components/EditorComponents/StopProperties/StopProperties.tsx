'use client'

import React, { useEffect, useState } from 'react'
import styles from './StopProperties.module.scss'
import { formatToDateTime } from '@/utils/helpers'
import useEditorStore from '@/store/editorStore'
import useToastStore from '@/store/toastStore'
import { Stop } from '@/types/types'
import DirectionBox from '@/components/EditorComponents/DirectionBox'
import EntityControls from '@/components/EditorComponents/EntityControls'
import TabsBox from '@/components/EditorComponents/TabsBox'
import { EntityControlAction } from '@/components/EditorComponents/EntityControls'
import { Star, Tag } from 'lucide-react'

const StopProperties: React.FC<{}> = () => {
	const { addToast } = useToastStore()
	const { selectedStop, stops, deleteStop, publishStop } = useEditorStore()

	const [item, setItem] = useState<Stop>()

	useEffect(() => {
		setItem(stops.find((stop) => stop.id === selectedStop))
	}, [selectedStop, stops])

	const handleAction = (value: EntityControlAction) => {
		if (value === EntityControlAction.Delete) {
			item?.id && deleteStop(item.id)
		}

		if (value === EntityControlAction.Publish) {
			item?.id && publishStop(item.id, true)
		}

		if (value === EntityControlAction.Unpublish) {
			item?.id && publishStop(item.id, false)
		}
	}

	if (!item) {
		return (
			<div className={styles.StopProperties}>
				<p>Please select a trolleybus stop from the list.</p>
				<p>
					You can also drag and drop items to rearrange the order of stops
					according to the route sequence.
				</p>
			</div>
		)
	}

	return (
		<div className={styles.StopProperties}>
			<div className={styles.StopPropertiesTitle}>
				<h3>
					<span>{item?.name}</span>
					{item?.isDefault && (
						<span>
							<Star size={18} />
						</span>
					)}
				</h3>
				<EntityControls isPublished={item.isPublished} onClick={handleAction} />
			</div>
			<div className={styles.Info}>
				<div className={styles.InternalName}>
					<Tag size={12} />
					{item?.internalName}
				</div>
				<div className={styles.LastUpdate}>
					Last update{' '}
					{item?.updatedAt && (
						<span>
							<span>{formatToDateTime(item?.updatedAt)}</span>
						</span>
					)}
				</div>
			</div>
			<TabsBox />
			<div className={styles.Directions}>
				<DirectionBox directions={item.directions} direction={'forward'} />
				<DirectionBox directions={item.directions} direction={'backward'} />
			</div>
		</div>
	)
}

export default StopProperties
