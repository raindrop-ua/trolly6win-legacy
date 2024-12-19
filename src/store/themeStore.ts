import { create } from 'zustand'
import { setThemeCookie } from '@/utils/cookies'

type Theme = 'light' | 'dark' | 'auto'

interface ThemeStore {
	theme: Theme
	effectiveTheme: 'light' | 'dark'
	setTheme: (theme: Theme) => void
	initializeTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set) => {
	let mediaQuery: MediaQueryList | null = null

	const handleSystemThemeChange = (theme: Theme) => {
		if (!mediaQuery) {
			mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		}
		const systemTheme = mediaQuery.matches ? 'dark' : 'light'
		set({
			effectiveTheme: computeEffectiveTheme(theme, systemTheme),
		})
	}

	return {
		theme: 'auto',
		effectiveTheme: 'light',
		setTheme: (theme) => {
			setThemeCookie(theme)
			set({ theme })

			handleSystemThemeChange(theme)
		},
		initializeTheme: () => {
			const savedTheme =
				(document.cookie.match(/theme=(light|dark|auto)/)?.[1] as Theme) ||
				'auto'

			mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

			const systemTheme = mediaQuery.matches ? 'dark' : 'light'
			set({
				theme: savedTheme,
				effectiveTheme: computeEffectiveTheme(savedTheme, systemTheme),
			})

			const handleChange = () => handleSystemThemeChange(savedTheme)
			mediaQuery.addEventListener('change', handleChange)

			return () => {
				mediaQuery?.removeEventListener('change', handleChange)
			}
		},
	}
})

function computeEffectiveTheme(
	theme: Theme,
	systemTheme: 'light' | 'dark',
): 'light' | 'dark' {
	return theme === 'auto' ? systemTheme : theme
}
