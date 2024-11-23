import styles from './page.module.scss'
import ScheduleList from '@/components/ScheduleList/ScheduleList'
import Header from '@/components/Header/Header'
import TrolleybusAnimated from '@/components/TrolleybusAnimated/TrolleybusAnimated'

export default function Home() {
	return (
		<div className={styles.Page}>
			<main className={styles.Main}>
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
					<div>V1.05 &copy; 2024. </div>
					<div>Coded with love for the Web and trolleybuses.</div>
				</div>
			</main>
			<footer className={styles.Footer}></footer>
		</div>
	)
}
