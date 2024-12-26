import apiClient from '@/utils/apiClient'

export const fetchUserData = async () => {
	const response = await apiClient.get('/users')
	return response.data
}
