'use client'

import { useEffect } from 'react'
import useAuthStore from '@/store/authStore'

const UserLoader = () => {
	const { checkUser } = useAuthStore()

	useEffect(() => {
		checkUser()
	}, [checkUser])

	return null
}

export default UserLoader
