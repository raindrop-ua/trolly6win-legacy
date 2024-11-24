import React, { ReactNode } from 'react'
import styles from './SectionWrapper.module.scss'

type WrapperProps = {
	children: ReactNode
}

const SectionWrapper = ({ children }: WrapperProps) => {
	return (
		<section className={styles.Section}>
			<div className={styles.SectionWrapper}>{children}</div>
		</section>
	)
}

SectionWrapper.displayName = 'SectionWrapper'

export default SectionWrapper
