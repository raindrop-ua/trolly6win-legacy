'use client'

import { useThemeStore } from '@/store/themeStore'
import { MonitorCog, Moon, Sun } from 'lucide-react'
import styles from './ThemeSwitcher.module.scss'
import classNames from 'classnames'

enum Theme {
	Light = 'light',
	Dark = 'dark',
	Auto = 'auto',
}

export default function ThemeSwitcher() {
	const { theme, setTheme } = useThemeStore()

	const handleThemeSet = (theme: Theme) => {
		setTheme(theme)
	}

	return (
		<div className={styles.ThemeSwitcherWrapper}>
			<button
				className={classNames(styles.Button, styles.Light, {
					[styles.Active]: theme === Theme.Light,
				})}
				onClick={() => handleThemeSet(Theme.Light)}
			>
				<Sun size={16} />
			</button>
			<button
				className={classNames(styles.Button, styles.Dark, {
					[styles.Active]: theme === Theme.Dark,
				})}
				onClick={() => handleThemeSet(Theme.Dark)}
			>
				<Moon size={16} />
			</button>
			<button
				className={classNames(styles.Button, styles.Auto, {
					[styles.Active]: theme === Theme.Auto,
				})}
				onClick={() => handleThemeSet(Theme.Auto)}
			>
				<MonitorCog size={16} />
			</button>
		</div>
	)
}
