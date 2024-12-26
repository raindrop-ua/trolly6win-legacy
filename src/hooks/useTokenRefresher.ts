import { useEffect } from 'react'
import useAuthStore from '@/store/authStore'

const useTokenRefresher = () => {
	const refreshTokens = useAuthStore((state) => state.refreshTokens)
	const accessToken = useAuthStore((state) => state.accessToken)

	useEffect(() => {
		if (!accessToken) return

		const tokenExpiryTime = 60 * 60 * 1000
		const refreshBeforeExpiry = tokenExpiryTime - 5 * 60 * 1000

		const timer = setTimeout(refreshTokens, refreshBeforeExpiry)

		return () => clearTimeout(timer)
	}, [accessToken, refreshTokens])
}

export default useTokenRefresher
