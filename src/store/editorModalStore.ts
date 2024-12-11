import { create } from 'zustand'

interface ModalState {
	isOpen: boolean
	modalTitle?: React.ReactNode | null
	modalContent: React.ReactNode | null
	resolveCallback: ((data: unknown) => void) | null
	openModal: (
		content: React.ReactNode,
		title?: React.ReactNode,
	) => Promise<unknown>
	closeModal: (result?: unknown) => void
}

export const useEditorModalStore = create<ModalState>((set, get) => ({
	isOpen: false,
	modalTitle: null,
	modalContent: null,
	resolveCallback: null,

	openModal: (content, title) =>
		new Promise((resolve) => {
			set({
				isOpen: true,
				modalTitle: title,
				modalContent: content,
				resolveCallback: resolve,
			})
		}),

	closeModal: (result) => {
		const { resolveCallback } = get()

		if (resolveCallback) {
			if (result && typeof result === 'object' && 'preventDefault' in result) {
				resolveCallback(null)
			} else {
				resolveCallback(result || null)
			}
		}

		set({
			isOpen: false,
			modalContent: null,
			resolveCallback: null,
		})
	},
}))
