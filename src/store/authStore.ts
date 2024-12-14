import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

interface AuthState {
	user: null | { id: string; email: string }
	accessToken: string | null
	isAuthenticated: boolean
	isUserLoading: boolean
	isCheckingUser: boolean
	setUser: (user: { id: string; email: string }, accessToken: string) => void
	checkUser: () => void
	clearAuth: () => void
	refreshAccessToken: () => Promise<void>
	isHydrated: boolean
}

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/v1',
	withCredentials: true,
})

const isTokenExpired = (token: string) => {
	try {
		const payload = JSON.parse(atob(token.split('.')[1]))
		return payload.exp * 1000 < Date.now()
	} catch (error) {
		return true
	}
}

const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			accessToken: null,
			isAuthenticated: false,
			isUserLoading: false,
			isCheckingUser: false,
			isHydrated: false,

			setUser: (user: any, accessToken: any) =>
				set({ user, accessToken, isAuthenticated: true }),

			clearAuth: () =>
				set({
					user: null,
					accessToken: null,
					isAuthenticated: false,
					isUserLoading: false,
				}),

			refreshAccessToken: async () => {
				const { accessToken } = get()
				if (accessToken && !isTokenExpired(accessToken)) {
					return
				}
				try {
					const response = await apiClient.post('/auth/refresh-tokens')
					const { access_token } = response.data
					set({ accessToken: access_token, isAuthenticated: true })
				} catch (error) {
					console.error('Failed to refresh access token', error)
					get().clearAuth()
					throw error
				}
			},

			checkUser: async () => {
				const { accessToken, isCheckingUser, user } = get()
				if (isCheckingUser) return
				if (!accessToken) {
					get().clearAuth()
					return
				}
				try {
					set({ isCheckingUser: true, isUserLoading: true })
					const response = await apiClient.get(`/users/${user.id}`, {
						headers: { Authorization: `Bearer ${accessToken}` },
					})
					const userData = response.data
					set({ user: userData, isAuthenticated: true, isUserLoading: false })
				} catch (error) {
					console.error('Failed to fetch user profile', error)
					get().clearAuth()
				} finally {
					set({ isCheckingUser: false })
				}
			},
		}),
		{
			name: 'auth-store',
			partialize: (state) => ({
				user: state.user,
				accessToken: state.accessToken,
			}),
			onRehydrateStorage: (state: any) => {
				if (state) {
					state.isHydrated = true
				}
			},
		},
	),
)

export default useAuthStore
