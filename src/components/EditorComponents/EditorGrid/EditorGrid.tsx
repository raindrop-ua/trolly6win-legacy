import styles from './EditorGrid.module.scss'
import React from 'react'

interface Props {
	children: React.ReactNode
}

const EditorGrid: React.FC<Props> = ({ children }) => {
	return <div className={styles.EditorGrid}>{children}</div>
}

export default EditorGrid
