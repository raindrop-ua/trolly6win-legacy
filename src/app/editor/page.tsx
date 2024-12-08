import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { Metadata } from 'next'
import styles from './page.module.scss'
import StopsList from '@/components/EditorComponents/StopsList'

export const metadata: Metadata = {
	title: 'Editor - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/editor',
	},
}

export default function EditorPage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<h1>Schedule Editor</h1>
				<br />
				<div>
					<StopsList />
				</div>
			</SectionWrapper>
			<br />
		</main>
	)
}
