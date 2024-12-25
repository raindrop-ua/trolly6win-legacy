import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ScheduleNote from '@/components/ScheduleComponents/ScheduleNote'
import { Metadata } from 'next'
import styles from './page.module.scss'
import PageTitle from '@/components/PageTitle'
import Link from 'next/link'

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
				<PageTitle isPrimary>Profile</PageTitle>
				<Link className={styles.UserLink} href={'/sign-in'}>
					Sign In
				</Link>
				<ScheduleNote>Some information</ScheduleNote>
			</SectionWrapper>
			<br />
		</main>
	)
}
