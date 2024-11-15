import React from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.scss'

const dniproCity = localFont({
	src: [
		{
			path: './fonts/dniprocity-regular-webfont.woff',
			weight: '400',
			style: 'normal'
		},
		{
			path: './fonts/dniprocity-bold-webfont.woff2',
			weight: '700',
			style: 'normal'
		}
	],
	variable: '--font-dnipro-city'
})

export const metadata: Metadata = {
	title: 'TrollySix',
	description: 'Timetable for trolleybus route number 6 in the city of Dnipro.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${dniproCity.variable}`}>{children}</body>
		</html>
	)
}
