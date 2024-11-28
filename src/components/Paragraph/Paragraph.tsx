import React from 'react'
import classNames from 'classnames'
import styles from './Paragraph.module.scss'

interface ParagraphProps {
	className?: string
	children: React.ReactNode
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
	return (
		<div className={classNames(styles.Paragraph, className)}>{children}</div>
	)
}

Paragraph.displayName = 'Paragraph'

export default React.memo(Paragraph)
