import React from 'react'
import classNames from 'classnames'
import styles from './InlineNoWrap.module.scss'

interface InlineNoWrapProps {
	className?: string
	children: React.ReactNode
}

const InlineNoWrap: React.FC<InlineNoWrapProps> = ({ children, className }) => {
	return <span className={classNames(styles.InlineNoWrapText, className)}>{children}</span>
}

InlineNoWrap.displayName = 'InlineNoWrap'

export default React.memo(InlineNoWrap)
