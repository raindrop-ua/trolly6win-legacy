import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ScheduleNote from '@/components/ScheduleComponents/ScheduleNote'
import { Metadata } from 'next'
import styles from './page.module.scss'
import PageTitle from '@/components/PageTitle'
import VideoPlayer from '@/components/VideoPlayer'

export const metadata: Metadata = {
	title: 'About - TrollySix',
	alternates: {
		canonical: 'https://trolly6.com/about',
	},
}

export default function AboutPage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<PageTitle isPrimary>About</PageTitle>
				<VideoPlayer />
				<ScheduleNote>Some information</ScheduleNote>
			</SectionWrapper>
			<br />
		</main>
	)
}
