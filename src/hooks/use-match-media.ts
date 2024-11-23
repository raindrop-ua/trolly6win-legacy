import { useState, useLayoutEffect } from 'react'

const queries: string[] = [
	'(max-width: 767px)',
	'(min-width: 768px) and (max-width: 1231px)',
	'(min-width: 1232px)'
]

type ScreenType = 'isMobile' | 'isTablet' | 'isDesktop'
type MatchMediaResult = Record<ScreenType, boolean>

export const useMatchMedia = (): MatchMediaResult => {
	const mediaQueryLists: MediaQueryList[] = queries.map((query) =>
		matchMedia(query)
	)

	const getValues = (): boolean[] => mediaQueryLists.map((list) => list.matches)

	const [values, setValues] = useState<boolean[]>(getValues)

	useLayoutEffect(() => {
		const handler = (): void => setValues(getValues)

		mediaQueryLists.forEach((list) => list.addEventListener('change', handler))

		return () =>
			mediaQueryLists.forEach((list) =>
				list.removeEventListener('change', handler)
			)
	})

	return ['isMobile', 'isTablet', 'isDesktop'].reduce((acc, screen, index) => {
		acc[screen as ScreenType] = values[index]
		return acc
	}, {} as MatchMediaResult)
}
