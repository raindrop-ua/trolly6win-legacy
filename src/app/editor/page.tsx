import React from 'react'
import { Metadata } from 'next'
import styles from './page.module.scss'
import SectionWrapper from '@/components/SectionWrapper'
import StopsList from '@/components/EditorComponents/StopsList'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import AccessingLoader from '@/components/AccessingLoader/AccessingLoader'

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
					<div>
						<StopsList />
					</div>
				</SectionWrapper>
			</ProtectedLayout>
			<br />
		</main>
	)
}
