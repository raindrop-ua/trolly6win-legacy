'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './UserBox.module.scss'
import useAuthStore from '@/store/authStore'
import useUserStore from '@/store/userStore'

const UserBox = () => {
	const pathname = usePathname()
	const [showMenu, setShowMenu] = React.useState(false)
	const { isLoggedIn } = useAuthStore()
	const { email } = useUserStore()

	const handleAvatar = () => {
		setShowMenu((prevState) => !prevState)
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
					<button className={styles.Avatar} onClick={handleAvatar}>
						{email && email[0].toUpperCase()}
					</button>
					{showMenu && (
						<div className={styles.AvatarMenu}>
							<button>
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
