import { create } from 'zustand'

interface ModalState {
	closeSignal: boolean
	triggerClose: () => void
	resetSignal: () => void
}

const useModalStore = create<ModalState>((set) => ({
	closeSignal: false,
	triggerClose: () => set({ closeSignal: true }),
	resetSignal: () => set({ closeSignal: false }),
}))

export default useModalStore
