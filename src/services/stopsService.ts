import useAuthStore from '@/store/authStore'
import axios from 'axios'

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

	// try {
	// 	const response = await fetch(url, {
	// 		method: 'GET',
	// 		headers: { 'Content-Type': 'application/json' },
	// 	})
	//
	// 	if (!response.ok) {
	// 		console.error(
	// 			`Failed to fetch stops: ${response.status} ${response.statusText}`,
	// 		)
	// 		return null
	// 	}
	//
	// 	return response.json()
	// } catch (error) {
	// 	console.error(error)
	// 	throw error
	// }

	try {
		const response = await axios.get<Stop[]>(url, {
			headers: {
				'Content-Type': 'application/json',
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
	const token = useAuthStore.getState().accessToken

	try {
		// const response = await fetch(url, {
		// 	method: 'PATCH',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// 	body: JSON.stringify({ order: payload }),
		// })
		//
		// if (!response.ok) {
		// 	console.error(
		// 		`Failed to update stops order: ${response.status} ${response.statusText}`,
		// 	)
		// 	return
		// }

		await axios.patch(
			url,
			{ order: payload },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		)
	} catch (error) {
		// console.error(error)
		// throw error

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
