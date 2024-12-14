'use client'

import styles from './EditorGrid.module.scss'
import React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import StopsList from '@/components/EditorComponents/StopsList'
import StopProperties from '@/components/EditorComponents/StopProperties'

interface Props {
	children?: React.ReactNode
}

const EditorGrid: React.FC<Props> = ({ children }) => {
	return (
		<div className={styles.EditorGrid}>
			<PanelGroup direction='horizontal'>
				<Panel minSize={25} defaultSize={35}>
					<StopsList />
				</Panel>
				<PanelResizeHandle className={styles.EditorGridHandle} />
				<Panel minSize={45}>
					<StopProperties />
				</Panel>
			</PanelGroup>
		</div>
	)
}

export default EditorGrid
