import { NextResponse } from 'next/server'
import scheduleData from '@/data/scheduleData'

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const id = (await params).id

	if (id === '6') {
		return NextResponse.json(scheduleData)
	} else {
		return NextResponse.json({ error: 'Route not found' }, { status: 404 })
	}
}
