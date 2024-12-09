'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import useModalStore from '@/store/modalStore'
import useAuthStore from '@/store/authStore'
import { UserCheck } from 'lucide-react'
import styles from './LoginForm.module.scss'

interface IFormInput {
	email: string
	password: string
	confirmPassword?: string
}

interface LoginFormProps {
	isFromModal?: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({ isFromModal = false }) => {
	const [isLogin, setIsLogin] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [isSuccess, setIsSuccess] = useState(false)
	const { setUser } = useAuthStore()
	const triggerClose = useModalStore((state) => state.triggerClose)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<IFormInput>({ mode: 'onTouched' })

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		setError(null)
		const url = isLogin
			? `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`
			: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					email: data.email,
					password: data.password,
				}),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.message || 'Something went wrong')
			}

			const { email, id, access_token } = await response.json()

			setUser({ id, email }, access_token)

			setIsSuccess(true)

			if (isFromModal) {
				setTimeout(triggerClose, 2000)
			} else {
				setTimeout(() => router.push('/'), 2000)
			}
		} catch (err: any) {
			setError(err.message || 'Failed to authenticate')
		}
	}

	return (
		<div className={styles.LoginForm}>
			{!isSuccess ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2>{isLogin ? 'Log in' : 'Sign up'}</h2>

					{error && <p className={styles.ErrorMessage}>{error}</p>}

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
			) : (
				<div className={styles.Success}>
					<UserCheck />
					<span>
						{isFromModal ? 'Success!' : 'Success! Redirecting to home...'}
					</span>
				</div>
			)}

			{!isSuccess && (
				<p className={styles.DontHave}>
					{isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
					<button
						type='button'
						onClick={() => setIsLogin(!isLogin)}
						className={styles.ButtonTransparent}
					>
						{isLogin ? 'Sign up' : 'Log in'}
					</button>
				</p>
			)}
		</div>
	)
}

export default LoginForm
