import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

interface AuthState {
	user: null | { id: string; email: string }
	accessToken: string | null
	isAuthenticated: boolean
	setUser: (user: { id: string; email: string }, accessToken: string) => void
	clearAuth: () => void
	refreshAccessToken: () => Promise<void>
}

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/v1',
	withCredentials: true, // Включаем передачу куков
})

const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			accessToken: null,
			isAuthenticated: false,

			setUser: (user, accessToken) =>
				set({ user, accessToken, isAuthenticated: true }),

			clearAuth: () =>
				set({ user: null, accessToken: null, isAuthenticated: false }),

			refreshAccessToken: async () => {
				try {
					const response = await apiClient.post('/auth/refresh')
					const { access_token } = response.data
					set({ accessToken: access_token, isAuthenticated: true })
				} catch (error) {
					console.error('Failed to refresh access token', error)
					get().clearAuth()
					throw error
				}
			},
		}),
		{
			name: 'auth-store',
			partialize: (state) => ({
				user: state.user,
				accessToken: state.accessToken,
			}),
		},
	),
)

export default useAuthStore
