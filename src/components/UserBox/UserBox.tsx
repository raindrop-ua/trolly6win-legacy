'use client'

import React from 'react'
import Link from 'next/link'
import styles from './UserBox.module.scss'

const UserBox = () => {
	const [showMenu, setShowMenu] = React.useState(false)
	const isLoggedIn = false

	const handleAvatar = () => {
		setShowMenu((prevState) => !prevState)
		console.log(showMenu)
	}

	return (
		<div className={styles.UserBox}>
			{!isLoggedIn ? (
				<Link href={'./signin'}>
					<span>Sign In</span>
				</Link>
			) : (
				<div className={styles.AvatarBlock}>
					<button className={styles.Avatar} onClick={handleAvatar}>
						A
					</button>
					{showMenu && (
						<div className={styles.AvatarMenu}>
							<button>
								<span>Sign Out</span>
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default UserBox
