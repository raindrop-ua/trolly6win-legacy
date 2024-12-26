import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { Metadata } from 'next'
import Profile from '@/components/Profile'
import styles from './page.module.scss'

export const metadata: Metadata = {
	title: 'Profile - TrollySix',
	alternates: {
		canonical: 'https://trolly6.com/profile',
	},
}

export default function ProfilePage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<Profile />
			</SectionWrapper>
			<br />
		</main>
	)
}
