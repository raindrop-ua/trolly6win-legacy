import React from 'react'
import { Metadata } from 'next'
import styles from './page.module.scss'
import SectionWrapper from '@/components/SectionWrapper'
import EditorGrid from '@/components/EditorComponents/EditorGrid'

export const metadata: Metadata = {
	title: 'Editor - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/e',
	},
}

export default function EditorPage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<h1>Schedule Editor</h1>
				<br />
				<EditorGrid />
			</SectionWrapper>
			<br />
		</main>
	)
}
