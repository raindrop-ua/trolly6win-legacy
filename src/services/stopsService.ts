import axios from 'axios'
import { SortPayload, Stop } from '@/types/types'

export const fetchStops = async (): Promise<Stop[] | null> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/stops`

	try {
		const response = await axios.get<Stop[]>(url, {
			headers: {
				'Content-Type': 'application/json',
				//Authorization: `Bearer ${token}`,
			},
		})

		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(
				`Failed to fetch stops: ${error.response?.status} ${error.message}`,
			)
		} else {
			console.error(error)
		}
		return null
	}
}

export const updateStopsOrder = async (
	payload: SortPayload[],
): Promise<void> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/stops/sort`

	try {
		await axios.patch(
			url,
			{ order: payload },
			{
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${token}`,
				},
			},
		)
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(
				`Failed to update stops order: ${error.response?.status} ${error.message}`,
			)
		} else {
			console.error(error)
		}
		throw error
	}
}
