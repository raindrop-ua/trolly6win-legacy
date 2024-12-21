import SectionWrapper from '@/components/SectionWrapper'
import styles from './page.module.scss'
import { Metadata } from 'next'
import TrolleybusAnimated from '@/components/TrolleybusAnimated'
import PageTitle from '@/components/PageTitle'

export const metadata: Metadata = {
	title: '404 - TrollySix',
}

export default function About() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<PageTitle isPrimary>404 - Page not found</PageTitle>
				<br />
				<p>You seem lost... kinda like that one trolleybus on route six.</p>
				<TrolleybusAnimated />
			</SectionWrapper>
		</main>
	)
}
