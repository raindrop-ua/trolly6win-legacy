import { create } from 'zustand'

interface UserState {
	email: string | null
	id: string | null
	accessToken: string | null
	setUser: (email: string, id: string, token: string) => void
	clearUser: () => void
}

const useUserStore = create<UserState>((set) => ({
	email: null,
	id: null,
	accessToken: null,
	setUser: (email, id, token) => set(() => ({ email, id, accessToken: token })),
	clearUser: () => set(() => ({ email: null, id: null, accessToken: null })),
}))

export default useUserStore
