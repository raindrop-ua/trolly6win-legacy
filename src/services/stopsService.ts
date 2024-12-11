export interface Stop {
	id: string
	internalName: string
	name: string
	isDefault: boolean
	sortIndex: number
	createdAt: string
	updatedAt: string
}

export interface SortPayload {
	id: string
	sortIndex: number
}

export const fetchStops = async (): Promise<Stop[] | null> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/stops`

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})

		if (!response.ok) {
			console.error(
				`Failed to fetch stops: ${response.status} ${response.statusText}`,
			)
			return null
		}

		return response.json()
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const updateStopsOrder = async (
	payload: SortPayload[],
): Promise<void> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/stops/sort`

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ order: payload }),
		})

		if (!response.ok) {
			console.error(
				`Failed to update stops order: ${response.status} ${response.statusText}`,
			)
			return
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}
