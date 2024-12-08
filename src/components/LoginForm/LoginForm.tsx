'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import styles from './LoginForm.module.scss'
import classNames from 'classnames'
import useModalStore from '@/store/modalStore'
import { UserCheck } from 'lucide-react'
import useAuthStore from '@/store/authStore'
import useUserStore from '@/store/userStore'

interface IFormInput {
	email: string
	password: string
	confirmPassword?: string
}

interface LoginFormProps {
	isFromModal?: boolean
}

const LoginForm = ({ isFromModal = false }: LoginFormProps) => {
	const [isLogin, setIsLogin] = useState(true)
	const { setLoggedIn, isLoggedIn } = useAuthStore()
	const { setUser } = useUserStore()
	const triggerClose = useModalStore((state) => state.triggerClose) // Получаем функцию для отправки сигнала

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<IFormInput>({
		mode: 'onTouched',
	})
	const router = useRouter()

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		if (!isLogin && data.password !== data.confirmPassword) {
			alert('Passwords do not match')
			return
		}

		try {
			console.log(`${isLogin ? 'Logging in' : 'Signing up'}:`, data)
			await new Promise((resolve) => setTimeout(resolve, 2000))
			console.log(isLogin ? 'Login successful!' : 'Sign up successful!')
			setLoggedIn(true)
			setUser(data.email, '100', '23')

			if (isFromModal) {
				setTimeout(() => {
					triggerClose()
				}, 2000)
			} else {
				setTimeout(() => {
					router.push('/')
				}, 2000)
			}
		} catch (error) {
			console.error(isLogin ? 'Login failed:' : 'Sign up failed:', error)
		}
	}

	return (
		<div className={styles.LoginForm}>
			{!isLoggedIn ? (
				<>
					<form onSubmit={handleSubmit(onSubmit)}>
						<h2>{isLogin ? 'Log in' : 'Sign up'}</h2>
						<div className={styles.FormGroup}>
							<label htmlFor='email'>Email:</label>
							<input
								id='email'
								type='email'
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: 'Invalid email address',
									},
								})}
								className={classNames({ [styles.Error]: errors.email })}
							/>
							{errors.email && (
								<p className={styles.ErrorMessage}>{errors.email.message}</p>
							)}
						</div>

						<div className={styles.FormGroup}>
							<label htmlFor='password'>Password:</label>
							<input
								id='password'
								type='password'
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters long',
									},
								})}
								className={classNames({ [styles.Error]: errors.password })}
							/>
							{errors.password && (
								<p className={styles.ErrorMessage}>{errors.password.message}</p>
							)}
						</div>

						{!isLogin && (
							<div className={styles.FormGroup}>
								<label htmlFor='confirmPassword'>Confirm Password:</label>
								<input
									id='confirmPassword'
									type='password'
									{...register('confirmPassword', {
										required: 'Please confirm your password',
										validate: (value) =>
											value === watch('password') || 'Passwords do not match',
									})}
									className={classNames({
										[styles.Error]: errors.confirmPassword,
									})}
								/>
								{errors.confirmPassword && (
									<p className={styles.ErrorMessage}>
										{errors.confirmPassword.message}
									</p>
								)}
							</div>
						)}

						<button
							type='submit'
							disabled={isSubmitting}
							className={classNames(styles.Button, {
								[styles.Submitting]: isSubmitting,
							})}
						>
							{isSubmitting ? 'Submitting...' : isLogin ? 'Login' : 'Sign up'}
						</button>
					</form>

					<p className={styles.DontHave}>
						{isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
						<button
							type='button'
							onClick={() => setIsLogin(!isLogin)}
							className={classNames(styles.ButtonTransparent)}
						>
							{isLogin ? 'Sign up' : 'Log in'}
						</button>
					</p>
				</>
			) : (
				<div className={styles.Success}>
					<UserCheck />
					<span>Success! {isFromModal ? '' : 'Redirecting to home...'}</span>
				</div>
			)}
		</div>
	)
}

export default LoginForm
