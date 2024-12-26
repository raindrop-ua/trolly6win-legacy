'use client'

import useAuthStore from '@/store/authStore'
import React, { useEffect, useState } from 'react'
import useTokenRefresher from '@/hooks/useTokenRefresher'
import PageTitle from '@/components/PageTitle'
import ScheduleNote from '@/components/ScheduleComponents/ScheduleNote'
import Link from 'next/link'
import styles from '@/app/profile/page.module.scss'
import { fetchUserData } from '@/services/userService'

interface UserData {
	email: string
}

const Profile = () => {
	const initializeAuth = useAuthStore((state) => state.initializeAuth)
	const accessToken = useAuthStore((state) => state.accessToken)
	const [userData, setUserData] = useState<UserData | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		initializeAuth()
	}, [initializeAuth])

	useTokenRefresher()

	useEffect(() => {
		const fetchData = async () => {
			if (!accessToken) {
				setLoading(false)
				return
			}

			setLoading(true)
			setError(null)

			try {
				const data = await fetchUserData()
				setUserData(data)
			} catch (err) {
				setError('Failed to fetch user data')
				console.error('Error fetching user data:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [accessToken])

	return (
		<div>
			<PageTitle isPrimary>Profile</PageTitle>
			{loading && <p>Loading user data...</p>}
			{error && <p className={styles.ErrorMessage}>{error}</p>}
			{userData && (
				<div>
					<h3>Welcome, {userData.email}!</h3>
				</div>
			)}
			{!userData && !loading && (
				<>
					<Link className={styles.UserLink} href={'/sign-in'}>
						Sign In
					</Link>
					<ScheduleNote>
						<span>
							Registration on the website is completely optional. You are free
							to use the core functionality without any restrictions. However,
							registering unlocks additional features, such as a list of your
							favorite stops and preferred trolleybus departures from specific
							stops. We are also constantly working on expanding the
							functionality, and even more exclusive features requiring
							registration will be available soon.
						</span>
					</ScheduleNote>
				</>
			)}
		</div>
	)
}

export default Profile
