import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ScheduleNote from '@/components/ScheduleComponents/ScheduleNote'
import { Metadata } from 'next'
import styles from './page.module.scss'
import PageTitle from '@/components/PageTitle'

export const metadata: Metadata = {
	title: 'About - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/about',
	},
}

export default function AboutPage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<PageTitle isPrimary>About</PageTitle>
				<ScheduleNote>Some information</ScheduleNote>
			</SectionWrapper>
			<br />
		</main>
	)
}
