import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { Metadata } from 'next'
import styles from './page.module.scss'
import LoginForm from '@/components/LoginForm'

export const metadata: Metadata = {
	title: 'Sign In - TrollySix',
	alternates: {
		canonical: 'https://trolly6.com/sign-in',
	},
}

export default function SignInPage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<LoginForm />
			</SectionWrapper>
			<br />
		</main>
	)
}
