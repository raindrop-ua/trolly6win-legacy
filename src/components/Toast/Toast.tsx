'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import useToastStore from '@/store/toastStore'
import styles from './Toast.module.scss'

const Toast = () => {
	const { toasts, removeToast } = useToastStore()

	useEffect(() => {
		const timers = toasts.map((toast) =>
			setTimeout(() => removeToast(toast.id), toast.duration || 3000),
		)
		return () => timers.forEach((timer) => clearTimeout(timer))
	}, [toasts, removeToast])

	return (
		<div className={styles.ToastContainer}>
			<AnimatePresence>
				{toasts.map((toast) => (
					<motion.div
						key={toast.id}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{
							type: 'spring',
							stiffness: 150,
							damping: 15,
						}}
						className={classNames(styles.ToastItem, {
							[styles.Success]: toast.type === 'success',
							[styles.Error]: toast.type === 'error',
							[styles.Info]: toast.type === 'info',
						})}
					>
						{toast.message}
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	)
}

export default Toast
