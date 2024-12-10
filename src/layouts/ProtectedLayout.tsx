'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'

const ProtectedLayout = ({
	children,
	loadingComponent,
}: {
	children: React.ReactNode
	loadingComponent?: React.ReactNode
}) => {
	const { isAuthenticated, refreshAccessToken, clearAuth, checkUser } =
		useAuthStore()
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async () => {
			await checkUser()
			if (!isAuthenticated) {
				try {
					await refreshAccessToken()
				} catch (error) {
					clearAuth()
					router.push('/login')
				}
			}
			setLoading(false)
		}
		checkAuth()
	}, [isAuthenticated, refreshAccessToken, clearAuth, checkUser, router])

	if (loading) {
		return loadingComponent ? (
			loadingComponent
		) : (
			<p style={{ textAlign: 'center' }}>Loading...</p>
		)
	}

	return <>{isAuthenticated && children}</>
}

export default ProtectedLayout
