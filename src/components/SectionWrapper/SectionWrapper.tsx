import React, { ReactNode } from 'react'
import styles from './SectionWrapper.module.scss'

type WrapperProps = {
	children: ReactNode
}

const SectionWrapper = ({ children }: WrapperProps) => {
	return (
		<section>
			<div className={styles.SectionWrapper}>{children}</div>
		</section>
	)
}

export default SectionWrapper
