import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ScheduleNote from '@/components/ScheduleComponents/ScheduleNote'
import { Metadata } from 'next'
import styles from './page.module.scss'
import PageTitle from '@/components/PageTitle'

export const metadata: Metadata = {
	title: 'Profile - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/profile',
	},
}

export default function ProfilePage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<PageTitle isPrimary>Profile</PageTitle>
				<ScheduleNote>Some information</ScheduleNote>
			</SectionWrapper>
			<br />
		</main>
	)
}
