import SectionWrapper from '@/components/SectionWrapper'
import styles from './page.module.scss'
import { Metadata } from 'next'
import TrolleybusAnimated from '@/components/TrolleybusAnimated'

export const metadata: Metadata = {
	title: 'About - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/about',
	},
}

export default function About() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<h1 className={styles.Title}>About</h1>
				<div className={styles.Paragraph}>
					<strong>Route:</strong>{' '}
					<ul>
						<li>
							<span>SOBORNA SQUARE</span>
						</li>
						<li>
							<span>Dmytro Yavornytskyi Avenue</span>
						</li>
						<li>
							<span>Yaruzhna Street</span>
						</li>
						<li>
							<span>Naberezhna Peremohy Street</span>
						</li>
						<li>
							<span>Southern Bridge</span>
						</li>
						<li>
							<span>Havanska Street</span>
						</li>
						<li>
							<span>Elektrichna Street</span>
						</li>
						<li>
							<span>Kyryla Osmaka Street</span>
						</li>
						<li>
							<span>PRYDNIPROVSKYI RESIDENTIAL DISTRICT</span>
						</li>
					</ul>
				</div>
				<div className={styles.Paragraph}>
					<strong>Distance:</strong>{' '}
					<ul>
						<li>
							<span className={styles.Attention}>16.07 km</span>
						</li>
					</ul>
				</div>
				<div className={styles.Paragraph}>
					<strong>Fare:</strong>{' '}
					<ul>
						<li>
							<span className={styles.Attention}>8.00 UAH</span>
						</li>
					</ul>
				</div>
				<div className={styles.Paragraph}>
					<strong>Operating hours:</strong>{' '}
					<ul>
						<li>
							<span className={styles.Attention}>05:54 - 22:03</span>
						</li>
					</ul>
				</div>
				<div className={styles.Paragraph}>
					<strong>Carrier:</strong>{' '}
					<ul>
						<li>
							<span className={styles.Attention}>
								KP DET DMR Depot No.1 / Depot No.2
							</span>
						</li>
					</ul>
				</div>
				<br />
				<TrolleybusAnimated />
			</SectionWrapper>
		</main>
	)
}
