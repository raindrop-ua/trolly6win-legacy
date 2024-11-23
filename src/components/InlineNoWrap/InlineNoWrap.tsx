import React from 'react'
import styles from './InlineNoWrap.module.scss'
import classNames from 'classnames'

interface InlineNoWrapProps {
	className?: string
	children: React.ReactNode
}

const InlineNoWrap: React.FC<InlineNoWrapProps> = ({ children, className }) => {
	return <span className={classNames(styles.InlineNoWrapText, className)}>{children}</span>
}

InlineNoWrap.displayName = 'InlineNoWrap'

export default React.memo(InlineNoWrap)
