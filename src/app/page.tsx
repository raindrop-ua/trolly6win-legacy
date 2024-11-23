import ScheduleList from '@/components/ScheduleList'
import Header from '@/components/Header'
import TrolleybusAnimated from '@/components/TrolleybusAnimated'
import Wrapper from '@/components/Wrapper'
import styles from './page.module.scss'

export default function Home() {
	return (
		<main className={styles.Main}>
			<Wrapper>
				<>
					<Header />
					<ScheduleList />
					<p className={styles.Note}>
						<span>Schedule changes may occur due to unforeseen situations along the route.</span>
						<span>Thank you for riding the trolleybus!</span>
					</p>
					<TrolleybusAnimated />
				</>
				<div className={styles.Note}>
					<div>V1.07 &copy; 2024. </div>
					<div>Coded with love for the Web and trolleybuses.</div>
				</div>
			</Wrapper>
		</main>
	)
}
