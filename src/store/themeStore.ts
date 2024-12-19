import { create } from 'zustand'

type Theme = 'light' | 'dark' | 'auto'

interface ThemeStore {
	theme: Theme
	effectiveTheme: 'light' | 'dark'
	setTheme: (theme: Theme) => void
	initializeTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
	theme: 'auto',
	effectiveTheme: 'light',
	setTheme: (theme) => {
		localStorage.setItem('theme', theme)
		set({ theme })
		set((state) => ({
			effectiveTheme: computeEffectiveTheme(theme, state.effectiveTheme),
		}))
	},
	initializeTheme: () => {
		const savedTheme = (localStorage.getItem('theme') as Theme | null) || 'auto'
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
			.matches
			? 'dark'
			: 'light'

		set({
			theme: savedTheme,
			effectiveTheme: computeEffectiveTheme(savedTheme, systemTheme),
		})

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = () => {
			set((state) => ({
				effectiveTheme: computeEffectiveTheme(
					state.theme,
					mediaQuery.matches ? 'dark' : 'light',
				),
			}))
		}

		mediaQuery.addEventListener('change', handleChange)

		return () => {
			mediaQuery.removeEventListener('change', handleChange)
		}
	},
}))

function computeEffectiveTheme(
	theme: Theme,
	systemTheme: 'light' | 'dark',
): 'light' | 'dark' {
	return theme === 'auto' ? systemTheme : theme
}
