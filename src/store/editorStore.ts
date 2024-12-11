import { create } from 'zustand'

interface EditorState {
	selectedStop: string
	setSelectedStop: (stopId: string) => void
}

const useEditorStore = create<EditorState>((set) => ({
	selectedStop: '',
	setSelectedStop: (stopId) => set(() => ({ selectedStop: stopId })),
}))

export default useEditorStore
