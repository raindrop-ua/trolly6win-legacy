import styles from './UserBox.module.scss'
import { CircleUserRound } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const UserBox = () => {
	return (
		<div className={styles.UserBox}>
			<Link className={styles.UserLink} href={'/sign-in'}>
				<CircleUserRound size={48} strokeWidth={1} />
			</Link>
		</div>
	)
}

UserBox.displayName = 'User'

export default UserBox
