import { create } from 'zustand'
import { DayType, StopType } from '@/utils/scheduleUtils'

interface ScheduleState {
	dayType: DayType
	selectedStop: StopType
	currentTime: Date
	setDayType: (dayType: DayType) => void
	setSelectedStop: (stop: StopType) => void
	updateCurrentTime: () => void
}

const useScheduleStore = create<ScheduleState>((set) => ({
	dayType: 'Auto',
	selectedStop: 'Pridniprovsk',
	currentTime: new Date(),
	setDayType: (dayType) => set(() => ({ dayType })),
	setSelectedStop: (stop) => set(() => ({ selectedStop: stop })),
	updateCurrentTime: () => set(() => ({ currentTime: new Date() })),
}))

export default useScheduleStore
