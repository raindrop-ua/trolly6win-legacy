import { useEffect } from 'react'
import useAuthStore from '@/store/authStore'

const useAutoRefresh = () => {
	const { accessToken, refreshAccessToken } = useAuthStore()

	useEffect(() => {
		if (!accessToken) return

		const payload = JSON.parse(atob(accessToken.split('.')[1]))
		const expTime = payload.exp * 1000
		const timeLeft = expTime - Date.now() - 60000 // Обновить за 1 минуту до истечения

		const timer = setTimeout(() => {
			refreshAccessToken().catch((error) => console.error(error))
		}, timeLeft)

		return () => clearTimeout(timer)
	}, [accessToken, refreshAccessToken])
}

export default useAutoRefresh
