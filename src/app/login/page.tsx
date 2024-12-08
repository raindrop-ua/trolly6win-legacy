import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { Metadata } from 'next'
import styles from './page.module.scss'
import LoginForm from '@/components/LoginForm'

export const metadata: Metadata = {
	title: 'Login - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/login',
	},
}

export default function LoginPage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<LoginForm />
			</SectionWrapper>
			<br />
		</main>
	)
}
