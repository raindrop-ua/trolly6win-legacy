import React from 'react'
import { Metadata } from 'next'
import ScheduleList from '@/components/ScheduleList'
import SectionWrapper from '@/components/SectionWrapper'
import ScheduleNote from '@/components/ScheduleNote'
import Paragraph from '@/components/Paragraph'
import WantToShare from '@/components/WantToShare'
import styles from './page.module.scss'

export const metadata: Metadata = {
	title: 'TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/',
	},
}

export default function HomePage() {
	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<ScheduleList />
				<ScheduleNote>
					<span>
						Schedule changes may occur due to unforeseen situations along the
						route.
					</span>
					<span>Thank you for riding the trolleybus!</span>
				</ScheduleNote>
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
					operation over long distances can serve this route.
				</Paragraph>
				<WantToShare />
			</SectionWrapper>
			<br />
		</main>
	)
}
