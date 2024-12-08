'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './UserBox.module.scss'
import useAuthStore from '@/store/authStore'
import useUserStore from '@/store/userStore'
import useToastStore from '@/store/toastStore'

const UserBox = () => {
	const pathname = usePathname()
	const [showMenu, setShowMenu] = React.useState(false)
	const menuRef = useRef<HTMLDivElement>(null) // Реф для меню
	const buttonRef = useRef<HTMLButtonElement>(null) // Реф для кнопки Avatar
	const { isLoggedIn } = useAuthStore()
	const { email } = useUserStore()
	const { addToast } = useToastStore()

	const showToast = () => {
		addToast({
			message: 'This stop has only forward direction.',
			type: 'info',
			duration: 3000,
		})
	}

	const handleAvatar = () => {
		setShowMenu((prevState) => !prevState)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setShowMenu(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	const handleMenuClick = () => {
		setShowMenu(false)
	}

	if (pathname === '/login') {
		return null
	}

	return (
		<div className={styles.UserBox}>
			{!isLoggedIn ? (
				<Link href={'/login'}>
					<span>Log in</span>
				</Link>
			) : (
				<div className={styles.AvatarBlock}>
					<button
						ref={buttonRef}
						className={styles.Avatar}
						onClick={handleAvatar}
					>
						{email && email[0].toUpperCase()}
					</button>
					{showMenu && (
						<div
							ref={menuRef}
							className={styles.AvatarMenu}
							onClick={handleMenuClick}
						>
							<Link href={'/profile'}>Profile</Link>
							<Link href={'/editor'}>Editor</Link>
							<button onClick={showToast}>
								<span>Log out</span>
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default UserBox
