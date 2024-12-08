import { create } from 'zustand'

interface LoadingState {
	isDataLoading: boolean
	isDataLoaded: boolean
	isDataUpdating: boolean
	isDataUpdated: boolean
	setDataLoading: (isLoading: boolean) => void
	setDataLoaded: (isLoaded: boolean) => void
	setDataUpdating: (isUpdating: boolean) => void
	setDataUpdated: (isUpdated: boolean) => void
}

const useLoadingStore = create<LoadingState>((set) => ({
	isDataLoading: false,
	isDataLoaded: false,
	isDataUpdating: false,
	isDataUpdated: false,
	setDataLoading: (isLoading) => set(() => ({ isDataLoading: isLoading })),
	setDataLoaded: (isLoaded) => set(() => ({ isDataLoaded: isLoaded })),
	setDataUpdating: (isUpdating) => set(() => ({ isDataUpdating: isUpdating })),
	setDataUpdated: (isUpdated) => set(() => ({ isDataUpdated: isUpdated })),
}))

export default useLoadingStore
