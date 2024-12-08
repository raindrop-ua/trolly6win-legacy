import { create } from 'zustand'

interface Toast {
	id: string
	message: string
	type?: 'success' | 'error' | 'info'
	duration?: number
}

interface ToastState {
	toasts: Toast[]
	addToast: (toast: Omit<Toast, 'id'>) => void
	removeToast: (id: string) => void
}

const useToastStore = create<ToastState>((set) => ({
	toasts: [],
	addToast: (toast) =>
		set((state) => ({
			toasts: [...state.toasts, { ...toast, id: Date.now().toString() }],
		})),
	removeToast: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		})),
}))

export default useToastStore
