import axios from 'axios'
import useAuthStore from '@/store/authStore'

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true,
})

apiClient.interceptors.request.use(
	(config) => {
		const accessToken = useAuthStore.getState().accessToken

		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}

		return config
	},
	(error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			const refreshToken = useAuthStore.getState().refreshToken

			if (!refreshToken) {
				console.error('No refresh token available. Logging out.')
				useAuthStore.getState().clearTokens()
				return Promise.reject(error)
			}

			try {
				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-tokens`,
					{ refreshToken },
				)

				const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
					response.data.data

				if (!newAccessToken || !newRefreshToken) {
					throw new Error('Invalid tokens received')
				}

				useAuthStore.getState().setTokens(newAccessToken, newRefreshToken)

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
				return apiClient(originalRequest)
			} catch (err) {
				console.error('Failed to refresh tokens:', err)
				useAuthStore.getState().clearTokens()
				return Promise.reject(err)
			}
		}

		return Promise.reject(error)
	},
)

export default apiClient
