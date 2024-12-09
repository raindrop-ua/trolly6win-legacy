'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, refreshAccessToken, clearAuth } = useAuthStore()
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (!isAuthenticated) {
					await refreshAccessToken()
				}
				setLoading(false)
			} catch (error) {
				clearAuth()
				router.push('/login')
			}
		}

		checkAuth()
	}, [isAuthenticated, refreshAccessToken, clearAuth, router])

	if (loading) {
		return <p>Loading...</p>
	}

	return <>{children}</>
}

export default ProtectedLayout
