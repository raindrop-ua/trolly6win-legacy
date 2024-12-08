import { create } from 'zustand'

interface ModalState {
	closeSignal: boolean // Сигнал для закрытия
	triggerClose: () => void // Отправка сигнала
	resetSignal: () => void // Сброс сигнала
}

const useModalStore = create<ModalState>((set) => ({
	closeSignal: false,
	triggerClose: () => set({ closeSignal: true }),
	resetSignal: () => set({ closeSignal: false }),
}))

export default useModalStore
