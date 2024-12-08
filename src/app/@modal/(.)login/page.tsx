'use client'

import React from 'react'
import styles from './page.module.scss'
import Modal from '@/components/Modal/Modal'
import LoginForm from '@/components/LoginForm/LoginForm'

export default function LoginPage() {
	return (
		<Modal>
			<div className={styles.Login}>
				<LoginForm isFromModal />
			</div>
		</Modal>
	)
}
