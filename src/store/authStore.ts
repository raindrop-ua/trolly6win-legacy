import { create } from 'zustand'

interface AuthState {
	isLoggedIn: boolean
	setLoggedIn: (isLoggedIn: boolean) => void
}

const useAuthStore = create<AuthState>((set) => ({
	isLoggedIn: false,
	setLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
}))

export default useAuthStore
