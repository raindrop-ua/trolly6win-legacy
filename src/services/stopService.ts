import { Stop } from '@/services/stopsService'

export const fetchStop = async (id: string): Promise<Stop | null> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/stops/${id}`

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})

		if (!response.ok) {
			console.error(
				`Failed to fetch stop data: ${response.status} ${response.statusText}`,
			)
			return null
		}

		return response.json()
	} catch (error) {
		console.error(error)
		throw error
	}
}
