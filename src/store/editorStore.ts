import { create } from 'zustand'
import axios from 'axios'
import { SortPayload, Stop } from '@/types/types'

interface EditorState {
	selectedStop: string | null
	stops: Stop[]
	isLoading: boolean
	error: string | null
	fetchStops: () => Promise<void>
	updateStopsOrder: (payload: SortPayload[]) => Promise<void>
	deleteStop: (postId: string) => Promise<void>
	publishStop: (postId: string, state: boolean) => Promise<void>
	setSelectedStop: (stopId: string) => void
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const useEditorStore = create<EditorState>((set) => {
	const handleApiCall = async (apiCall: () => Promise<void>) => {
		try {
			await apiCall()
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error(`API Error: ${error.message}`)
				//set({ error: error.message })
			} else {
				console.error(error)
				//set({ error: 'Unexpected error' })
			}
		} finally {
			set({ isLoading: false })
		}
	}

	return {
		setSelectedStop: (stopId) => set(() => ({ selectedStop: stopId })),

		stops: [],
		selectedStop: null,
		isLoading: false,
		error: null,

		fetchStops: async () => {
			await handleApiCall(async () => {
				const response = await axios.get(`${baseUrl}/stops`)
				set({ stops: response.data })
			})
		},

		// updateStopsOrder: async (payload: SortPayload[]): Promise<void> => {
		// 	set(
		// 		(state) =>
		// 			({
		// 				stops: payload.map((item) => ({
		// 					...state.stops.find((stop) => stop.id === item.id),
		// 					...item,
		// 				})),
		// 			}) as Partial<EditorState>,
		// 	)
		//
		// 	try {
		// 		await axios.patch(
		// 			`${baseUrl}/stops/reorder`,
		// 			{ order: payload },
		// 			{
		// 				headers: {
		// 					'Content-Type': 'application/json',
		// 					// Authorization: `Bearer ${token}`,
		// 				},
		// 			},
		// 		)
		// 		await useEditorStore.getState().fetchStops()
		// 	} catch (error) {
		// 		if (axios.isAxiosError(error)) {
		// 			console.error(
		// 				`Failed to update stops order: ${error.response?.status} ${error.message}`,
		// 			)
		// 		} else {
		// 			console.error(error)
		// 		}
		// 		throw error
		// 	}
		// },

		updateStopsOrder: async (payload: SortPayload[]): Promise<void> => {
			set(
				(state) =>
					({
						stops: payload.map((item) => ({
							...state.stops.find((stop) => stop.id === item.id),
							...item,
						})),
					}) as Partial<EditorState>,
			)

			await handleApiCall(async () => {
				await axios.patch(`${baseUrl}/stops/reorder`, { order: payload })
			})
		},

		deleteStop: async (stopId: string): Promise<void> => {
			await handleApiCall(async () => {
				await axios.delete(`${baseUrl}/stops/${stopId}`)
				await useEditorStore.getState().fetchStops()
			})
		},

		publishStop: async (stopId: string, state: boolean): Promise<void> => {
			await handleApiCall(async () => {
				await axios.patch(`${baseUrl}/stops/${stopId}`, { isPublished: state })
				await useEditorStore.getState().fetchStops()
			})
		},

		updateStop: async (stopData: any) => {
			try {
				await axios.patch(`${baseUrl}/stops`, stopData)
				await useEditorStore.getState().fetchStops()
				set({ isLoading: false })
			} catch (err: any) {
				set({ error: err.message, isLoading: false })
			}
		},
	}
})

export default useEditorStore
