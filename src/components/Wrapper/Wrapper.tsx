import React, { ReactNode } from 'react'
import styles from './Wrapper.module.scss'

type WrapperProps = {
	children: ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
	return <div className={styles.Wrapper}>{children}</div>
}

export default Wrapper
