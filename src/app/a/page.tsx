import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ScheduleNote from '@/components/ScheduleComponents/ScheduleNote'
import { Metadata } from 'next'
import styles from './page.module.scss'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Administration - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/a',
	},
}

export default function AdminPage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<h1>Administration</h1>
				<br />
				<Link href={'/a/e'}>Schedule Editor</Link>
				<ScheduleNote>Some information</ScheduleNote>
			</SectionWrapper>
			<br />
		</main>
	)
}
