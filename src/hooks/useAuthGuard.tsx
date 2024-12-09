import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'

const useAuthGuard = () => {
	const { isAuthenticated, refreshAccessToken } = useAuthStore()
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async () => {
			if (!isAuthenticated) {
				try {
					await refreshAccessToken()
				} catch {
					router.push('/login')
				}
			}
		}

		checkAuth()
	}, [isAuthenticated, refreshAccessToken, router])
}

export default useAuthGuard
