import { Stop } from '@/types/types'
import axios from 'axios'

export const fetchStop = async (id: string): Promise<Stop | null> => {
	const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/stops/${id}`

	try {
		const response = await axios.get<Stop>(url, {
			headers: {
				'Content-Type': 'application/json',
				//Authorization: `Bearer ${token}`,
			},
		})

		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(
				`Failed to fetch stop: ${error.response?.status} ${error.message}`,
			)
		} else {
			console.error(error)
		}
		return null
	}
}
