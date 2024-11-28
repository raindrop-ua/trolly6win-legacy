import ScheduleList from '@/components/ScheduleList'
import SectionWrapper from '../components/SectionWrapper'
import ScheduleNote from '@/components/ScheduleNote'
import styles from './page.module.scss'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Main - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/',
	},
}

export default function Home() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<ScheduleList />
				<ScheduleNote />
			</SectionWrapper>
		</main>
	)
}
