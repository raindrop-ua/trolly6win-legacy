import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ScheduleNote from '@/components/ScheduleNote'
import { Metadata } from 'next'
import styles from './page.module.scss'

export const metadata: Metadata = {
	title: 'Profile - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/profile',
	},
}

export default function Home() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<h2>Profile</h2>
				<ScheduleNote>Some information</ScheduleNote>
			</SectionWrapper>
			<br />
		</main>
	)
}
