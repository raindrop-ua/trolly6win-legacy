import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ScheduleNote from '@/components/ScheduleComponents/ScheduleNote'
import { Metadata } from 'next'
import styles from './page.module.scss'
import PageTitle from '@/components/PageTitle'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'

export const metadata: Metadata = {
	title: 'Blog - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/blog',
	},
}

export default function BlogPage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<PageTitle isPrimary>Blog</PageTitle>
				<VideoPlayer />
				<ScheduleNote>Some information</ScheduleNote>
			</SectionWrapper>
			<br />
		</main>
	)
}
