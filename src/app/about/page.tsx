import SectionWrapper from '@/components/SectionWrapper'
import { Metadata } from 'next'
import TrolleybusAnimated from '@/components/TrolleybusAnimated'
import UnorderedList from '@/components/UnorderedList'
import Paragraph from '@/components/Paragraph'
import styles from './page.module.scss'

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
				<Paragraph>
					The route connects the charming residential area of Pridniprovsky,
					locally referred to simply as Pridniprovsk, with the city center.
				</Paragraph>
				<Paragraph>
					On weekdays, 8 vehicles operate on the route, while on weekends, this
					number is reduced to 4. The route is served by two trolleybus depots,
					with 4 vehicles from each depot on weekdays and 2 from each depot on
					weekends.
				</Paragraph>
				<Paragraph>
					Due to the specifics of the route, as a portion of it lacks overhead
					contact wires, only a limited number of vehicles capable of autonomous
					operation over long distances can serve this route. These vehicles
					include those with vehicle numbers: 1002, 1009, 1010, 1011, 1012,
					1014, 1015, 2003, 2004, 2005, 2006, 2007, 2008.
				</Paragraph>
				<Paragraph>
					<strong>Route:</strong>
					<UnorderedList>
						<UnorderedList.Item>SOBORNA SQUARE</UnorderedList.Item>
						<UnorderedList.Item>Dmytro Yavornytskyi Avenue</UnorderedList.Item>
						<UnorderedList.Item>Yaruzhna Street</UnorderedList.Item>
						<UnorderedList.Item>Naberezhna Peremohy Street</UnorderedList.Item>
						<UnorderedList.Item>Southern Bridge</UnorderedList.Item>
						<UnorderedList.Item>Havanska Street</UnorderedList.Item>
						<UnorderedList.Item>Elektrichna Street</UnorderedList.Item>
						<UnorderedList.Item>Kyryla Osmaka Street</UnorderedList.Item>
						<UnorderedList.Item>
							PRYDNIPROVSKYI RESIDENTIAL DISTRICT
						</UnorderedList.Item>
					</UnorderedList>
				</Paragraph>
				<Paragraph>
					<strong>Distance:</strong>
					<UnorderedList>
						<UnorderedList.Item>16.07 km</UnorderedList.Item>
					</UnorderedList>
				</Paragraph>
				<Paragraph>
					<strong>Fare:</strong>
					<UnorderedList>
						<UnorderedList.Item>8.00 UAH</UnorderedList.Item>
					</UnorderedList>
				</Paragraph>
				<Paragraph>
					<strong>Operating hours:</strong>
					<UnorderedList>
						<UnorderedList.Item>05:54 - 22:03</UnorderedList.Item>
					</UnorderedList>
				</Paragraph>
				<Paragraph>
					<strong>Carrier:</strong>
					<UnorderedList>
						<UnorderedList.Item>
							KP DET DMR Depot No.1 / Depot No.2
						</UnorderedList.Item>
					</UnorderedList>
				</Paragraph>
				<br />
				<TrolleybusAnimated />
			</SectionWrapper>
		</main>
	)
}
