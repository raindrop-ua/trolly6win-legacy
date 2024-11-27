import { NextResponse } from 'next/server'

export async function GET() {
	const now = new Date()
	const kyivTime = new Date(
		now.toLocaleString('en-US', { timeZone: 'Europe/Kyiv' }),
	)

	return NextResponse.json({
		timestamp: kyivTime.getTime(),
	})
}
