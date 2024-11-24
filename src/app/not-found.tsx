import SectionWrapper from '@/components/SectionWrapper'
import styles from './page.module.scss'
import { Metadata } from 'next'
import TrolleybusAnimated from '@/components/TrolleybusAnimated'

export const metadata: Metadata = {
	title: '404 - TrollySix',
}

export default function About() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<h1>404 - Page not found</h1>
				<br />
				<TrolleybusAnimated />
			</SectionWrapper>
		</main>
	)
}
