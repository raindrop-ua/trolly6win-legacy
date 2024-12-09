import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/v1',
	withCredentials: true,
})

apiClient.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().accessToken
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		const authStore = useAuthStore.getState()

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			await authStore.refreshAccessToken()

			const newToken = authStore.accessToken
			if (newToken) {
				originalRequest.headers.Authorization = `Bearer ${newToken}`
				return axios(originalRequest)
			}
		}
		return Promise.reject(error)
	},
)

export default apiClient
