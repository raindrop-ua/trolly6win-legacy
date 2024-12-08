'use client'

import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import useModalStore from '@/store/modalStore'
import styles from './Modal.module.scss'

export default function Modal({
	children,
	onClose,
}: {
	children: React.ReactNode
	onClose?: () => void
}) {
	const overlay = useRef<HTMLDivElement | null>(null)
	const wrapper = useRef<HTMLDivElement | null>(null)
	const router = useRouter()
	const { closeSignal, resetSignal } = useModalStore()

	const handleDismiss = useCallback(() => {
		if (onClose) {
			resetSignal()
			router.back()
			onClose()
		} else {
			router.back()
		}
	}, [onClose, router, resetSignal])

	const onClick: MouseEventHandler = useCallback(
		(e) => {
			if (e.target === overlay.current /*|| e.target === wrapper.current*/) {
				handleDismiss()
			}
		},
		[handleDismiss, overlay],
	)

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') handleDismiss()
		},
		[handleDismiss],
	)

	useEffect(() => {
		if (closeSignal) {
			handleDismiss()
		}
	}, [closeSignal, handleDismiss])

	useEffect(() => {
		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [onKeyDown])

	return (
		<div ref={overlay} className={styles.Overlay} onClick={onClick}>
			<div ref={wrapper} className={styles.ModalContent}>
				{children}
			</div>
		</div>
	)
}
