import React from 'react'
import './globals.scss'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from '@/components/Header'
import SectionWrapper from '@/components/SectionWrapper'
import Footer from '@/components/Footer'
import IntervalInitializer from '@/components/IntervalInitializer'
import Toast from '@/components/Toast'
import ThemeHandler from '@/components/ThemeHandler'
import { cookies } from 'next/headers'

async function getThemeFromCookies(): Promise<'light' | 'dark' | 'auto'> {
	const themeCookie = (await cookies()).get('theme')?.value
	return themeCookie === 'light' ||
		themeCookie === 'dark' ||
		themeCookie === 'auto'
		? themeCookie
		: 'auto'
}

const dniproCity = localFont({
	src: [
		{
			path: './fonts/dniprocity-regular-webfont.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/dniprocity-bold-webfont.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-dnipro-city',
})

export const metadata: Metadata = {
	title: 'TrollySix',
	description: 'Timetable for trolleybus route number 6 in the city of Dnipro.',
	creator: 'Anton Sizov',
	publisher: 'Anton Sizov',
}

export default async function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	const theme = await getThemeFromCookies()

	return (
		<html lang='en' data-theme={theme === 'auto' ? undefined : theme}>
			<body className={`${dniproCity.variable}`}>
				<ThemeHandler />
				{modal}
				<Header />
				{children}
				<SectionWrapper as={'footer'} useSection={false}>
					<Footer />
				</SectionWrapper>
				<IntervalInitializer />
				<Toast />
				<div className='gradient'></div>
			</body>
		</html>
	)
}
