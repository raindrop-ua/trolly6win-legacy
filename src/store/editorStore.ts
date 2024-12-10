import { create } from 'zustand'

interface EditorState {
	selectedStop: string | null
	setSelectedStop: (stopId: string) => void
}

const useEditorStore = create<EditorState>((set) => ({
	selectedStop: null,
	setSelectedStop: (stopId) => set(() => ({ selectedStop: stopId })),
}))

export default useEditorStore
