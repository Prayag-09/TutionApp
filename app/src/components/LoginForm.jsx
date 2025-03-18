import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GalleryVerticalEnd, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';

const containerVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: [0.43, 0.13, 0.23, 0.96],
			when: 'beforeChildren',
			staggerChildren: 0.08,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 15 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.43, 0.13, 0.23, 0.96],
		},
	},
};

const errorVariants = {
	hidden: { opacity: 0, height: 0, marginBottom: 0 },
	visible: {
		opacity: 1,
		height: 'auto',
		marginBottom: 16,
		transition: { duration: 0.3, ease: 'easeInOut' },
	},
};

export function LoginForm({ className }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isFocused, setIsFocused] = useState({ email: false, password: false });
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			setError('Please fill in all fields');
			return;
		}
		setLoading(true);
		setError('');

		try {
			const { data } = await axios.post(
				'http://localhost:3000/api/auth/login',
				{ email, password }
			);
			localStorage.setItem('token', data.token);
			await new Promise((resolve) => setTimeout(resolve, 400));
			navigate('/dashboard');
		} catch (err) {
			setError(
				err.response?.data?.message || 'Login failed. Please try again.'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			className={cn(
				'flex flex-col items-center gap-8 w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-lg border border-gray-100',
				className
			)}>
			<motion.div
				className='flex flex-col items-center gap-2'
				variants={itemVariants}
				whileHover={{ scale: 1.03 }}
				transition={{ type: 'spring', stiffness: 300 }}>
				<div className='relative'>
					<motion.div
						className='flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white shadow-md'
						animate={{
							scale: loading ? [1, 1.05, 1] : 1,
							boxShadow: loading
								? [
										'0 0 0 0 rgba(59, 130, 246, 0.5)',
										'0 0 0 8px rgba(59, 130, 246, 0)',
										'0 0 0 0 rgba(59, 130, 246, 0.5)',
								  ]
								: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
						}}
						transition={{
							scale: { duration: 0.6, repeat: loading ? Infinity : 0 },
							boxShadow: { duration: 1.2, repeat: loading ? Infinity : 0 },
						}}>
						<GalleryVerticalEnd className='size-6' />
					</motion.div>
				</div>
				<motion.span
					className='text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'
					variants={itemVariants}>
					Mentora
				</motion.span>
			</motion.div>

			<motion.div className='text-center' variants={itemVariants}>
				<h2 className='text-xl font-semibold text-gray-900 mb-2'>
					Welcome Back
				</h2>
				<p className='text-sm text-gray-600'>
					Sign in to continue your journey
				</p>
			</motion.div>

			<form onSubmit={handleSubmit} className='w-full space-y-6'>
				<AnimatePresence>
					{error && (
						<motion.div
							variants={errorVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
							className='text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2'>
							<span className='flex-1'>{error}</span>
						</motion.div>
					)}
				</AnimatePresence>

				<motion.div variants={itemVariants} className='space-y-2'>
					<Label
						htmlFor='email'
						className={cn(
							'text-sm font-medium transition-colors',
							isFocused.email && 'text-primary'
						)}>
						Email Address
					</Label>
					<Input
						id='email'
						type='email'
						placeholder='you@example.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onFocus={() => setIsFocused((prev) => ({ ...prev, email: true }))}
						onBlur={() => setIsFocused((prev) => ({ ...prev, email: false }))}
						required
						className={cn(
							'transition-all duration-200 bg-gray-50/50',
							isFocused.email && 'border-primary ring-2 ring-primary/10'
						)}
					/>
				</motion.div>

				<motion.div variants={itemVariants} className='space-y-2 relative'>
					<Label
						htmlFor='password'
						className={cn(
							'text-sm font-medium transition-colors',
							isFocused.password && 'text-primary'
						)}>
						Password
					</Label>
					<div className='relative'>
						<Input
							id='password'
							type={showPassword ? 'text' : 'password'}
							placeholder='••••••••'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onFocus={() =>
								setIsFocused((prev) => ({ ...prev, password: true }))
							}
							onBlur={() =>
								setIsFocused((prev) => ({ ...prev, password: false }))
							}
							required
							className={cn(
								'transition-all duration-200 bg-gray-50/50 pr-10',
								isFocused.password && 'border-primary ring-2 ring-primary/10'
							)}
						/>
						<motion.button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}>
							{showPassword ? (
								<EyeOff className='size-4' />
							) : (
								<Eye className='size-4' />
							)}
						</motion.button>
					</div>
				</motion.div>

				<motion.div variants={itemVariants}>
					<Button
						type='submit'
						disabled={loading}
						className={cn(
							'w-full bg-gradient-to-r from-primary to-primary/80 text-white py-2.5 font-medium',
							'transition-all duration-300',
							!loading &&
								'hover:from-primary/90 hover:to-primary/70 hover:shadow-md',
							loading && 'opacity-80 cursor-not-allowed'
						)}
						whileHover={{ scale: loading ? 1 : 1.02 }}
						whileTap={{ scale: loading ? 1 : 0.98 }}>
						{loading ? (
							<span className='flex items-center justify-center gap-2'>
								<Loader2 className='animate-spin size-4' /> Logging in...
							</span>
						) : (
							'Sign In'
						)}
					</Button>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className='text-center text-sm text-gray-600 flex justify-between items-center'>
					{/* <Link
						to='/forgot-password'
						className='hover:text-primary underline underline-offset-2 transition-colors duration-200'>
						Forgot Password?
					</Link> */}
					<span>
						New here?{' '}
						<Link
							to='/signup'
							className='hover:text-primary underline underline-offset-2 transition-colors duration-200'>
							Sign Up
						</Link>
					</span>
				</motion.div>
			</form>
		</motion.div>
	);
}
