'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

export default function ThemeHandler() {
	const { effectiveTheme, initializeTheme } = useThemeStore()

	useEffect(() => {
		initializeTheme()

		document.documentElement.setAttribute('data-theme', effectiveTheme)
	}, [effectiveTheme, initializeTheme])

	return null
}
