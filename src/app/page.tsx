import ScheduleList from '@/components/ScheduleList'
import TrolleybusAnimated from '@/components/TrolleybusAnimated'
import SectionWrapper from '../components/SectionWrapper'
import styles from './page.module.scss'

export default function Home() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<ScheduleList />
				<p className={styles.Note}>
					<span>
						Schedule changes may occur due to unforeseen situations along the
						route.
					</span>
					<span>Thank you for riding the trolleybus!</span>
				</p>
				<TrolleybusAnimated />
			</SectionWrapper>
		</main>
	)
}
