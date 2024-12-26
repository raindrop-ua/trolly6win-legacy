import { create } from 'zustand'
import axios from 'axios'

interface AuthState {
	accessToken: string | null
	refreshToken: string | null
	isAuthenticated: boolean
	setTokens: (accessToken: string, refreshToken: string) => void
	clearTokens: () => void
	refreshTokens: () => Promise<void>
	initializeAuth: () => void
}

const useAuthStore = create<AuthState>((set, get) => ({
	accessToken: null,
	refreshToken: null,
	isAuthenticated: false,

	setTokens: (accessToken, refreshToken) => {
		localStorage.setItem('accessToken', accessToken)
		localStorage.setItem('refreshToken', refreshToken)
		set({
			accessToken,
			refreshToken,
			isAuthenticated: true,
		})
	},

	clearTokens: () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		set({
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,
		})
	},

	refreshTokens: async () => {
		const { refreshToken } = get()
		if (!refreshToken) {
			get().clearTokens()
			return
		}

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-tokens`,
				{ refreshToken },
				{ withCredentials: true },
			)

			const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
				response.data
			get().setTokens(newAccessToken, newRefreshToken)
		} catch (error) {
			console.error('Failed to refresh tokens', error)
			get().clearTokens()
		}
	},

	initializeAuth: () => {
		const accessToken = localStorage.getItem('accessToken')
		const refreshToken = localStorage.getItem('refreshToken')

		if (accessToken && refreshToken) {
			set({
				accessToken,
				refreshToken,
				isAuthenticated: true,
			})
		}
	},
}))

export default useAuthStore
