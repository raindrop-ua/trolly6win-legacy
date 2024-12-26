import React, { JSX } from 'react'
import styles from './SectionWrapper.module.scss'
import classNames from 'classnames'

type ElementTag = keyof JSX.IntrinsicElements

interface SectionWrapperProps {
	asElement?: ElementTag
	children: React.ReactNode
	className?: string
	useSection?: boolean
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
	asElement: Tag = 'div',
	children,
	className,
	useSection = true,
}) => {
	const content = (
		<Tag className={classNames(styles.Section, className)}>
			<div className={styles.SectionWrapper}>{children}</div>
		</Tag>
	)

	return useSection ? <section>{content}</section> : content
}

SectionWrapper.displayName = 'SectionWrapper'

export default SectionWrapper
