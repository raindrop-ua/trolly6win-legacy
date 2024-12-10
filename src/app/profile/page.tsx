import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ScheduleNote from '@/components/ScheduleNote'
import { Metadata } from 'next'
import styles from './page.module.scss'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import AccessingLoader from '@/components/AccessingLoader/AccessingLoader'

export const metadata: Metadata = {
	title: 'Profile - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/profile',
	},
}

export default function Home() {
	return (
		<main className={styles.Main}>
			<ProtectedLayout loadingComponent={<AccessingLoader />}>
				<SectionWrapper>
					<h1>Profile</h1>
					<ScheduleNote>Some information</ScheduleNote>
				</SectionWrapper>
			</ProtectedLayout>
			<br />
		</main>
	)
}
