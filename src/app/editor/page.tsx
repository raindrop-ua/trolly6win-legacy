import React from 'react'
import { Metadata } from 'next'
import styles from './page.module.scss'
import SectionWrapper from '@/components/SectionWrapper'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import AccessingLoader from '@/components/AccessingLoader/AccessingLoader'
import EditorGrid from '@/components/EditorComponents/EditorGrid'

export const metadata: Metadata = {
	title: 'Editor - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/editor',
	},
}

export default function EditorPage() {
	return (
		<main className={styles.Main}>
			<ProtectedLayout loadingComponent={<AccessingLoader />}>
				<SectionWrapper>
					<h1>Schedule Editor</h1>
					<br />
					<EditorGrid />
				</SectionWrapper>
			</ProtectedLayout>
			<br />
		</main>
	)
}
