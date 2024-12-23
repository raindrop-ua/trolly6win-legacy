import styles from './UserBox.module.scss'
import { LuCircleUserRound } from 'react-icons/lu'
import Link from 'next/link'
import React from 'react'

const UserBox = () => {
	return (
		<div className={styles.UserBox}>
			<Link className={styles.UserLink} href={'/profile'}>
				<LuCircleUserRound size={48} strokeWidth={1} />
			</Link>
		</div>
	)
}

UserBox.displayName = 'User'

export default UserBox
