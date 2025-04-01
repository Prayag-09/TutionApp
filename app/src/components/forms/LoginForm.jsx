import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, X, GalleryVerticalEnd } from 'lucide-react';
import api from '../../lib/axios';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function LoginForm({ className }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [errorShake, setErrorShake] = useState(false);
	const navigate = useNavigate();

	// Auto-dismiss error after 5s
	useEffect(() => {
		let timer;
		if (error) {
			timer = setTimeout(() => setError(''), 5000);
		}
		return () => clearTimeout(timer);
	}, [error]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			setError('Please fill in all fields');
			setErrorShake(true);
			setTimeout(() => setErrorShake(false), 500);
			return;
		}

		setIsLoading(true);
		setError('');

		try {
			const { data } = await api.post('/auth/login', { email, password });
			localStorage.setItem('token', data.token);
			localStorage.setItem('role', data.role);
			await new Promise((r) => setTimeout(r, 300));

			const rolePaths = {
				principal: '/principal/dashboard',
				teacher: '/teacher/dashboard',
				student: '/student/dashboard',
				parent: '/parent/dashboard',
			};
			navigate(rolePaths[data.role] || '/dashboard');
		} catch (err) {
			setError(
				err.response?.data?.message || 'Login failed. Please try again.'
			);
			setErrorShake(true);
			setTimeout(() => setErrorShake(false), 500);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-4'>
			<div className='w-full max-w-md'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					className={cn(
						'relative overflow-hidden rounded-xl border bg-white shadow-lg p-8',
						className
					)}>
					{/* Branding */}
					<motion.div
						className='flex flex-col items-center mb-6'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.6,
							ease: [0.22, 1, 0.36, 1],
							delay: 0.2,
						}}>
						<motion.div
							className='flex items-center justify-center p-3 rounded-lg bg-primary/10 text-primary mb-4'
							whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
							transition={{ duration: 0.5 }}>
							<GalleryVerticalEnd className='h-10 w-10' />
						</motion.div>
						<h1 className='text-3xl font-semibold text-primary'>Mentora</h1>
						<p className='text-gray-600 mt-2 text-center'>
							Sign in to your account to continue
						</p>
					</motion.div>

					{/* Error Message */}
					<AnimatePresence>
						{error && (
							<motion.div
								initial={{ opacity: 0, y: -10, height: 0 }}
								animate={{ opacity: 1, y: 0, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.2 }}
								className='mb-6 relative'>
								<motion.div
									animate={errorShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
									transition={{ duration: 0.4, ease: 'easeInOut' }}
									className='flex items-start gap-2 p-3 rounded-lg bg-red-100 text-red-600 border border-red-300'>
									<AlertCircle className='h-5 w-5 flex-shrink-0 mt-0.5' />
									<span className='text-sm'>{error}</span>
									<button
										onClick={() => setError('')}
										className='ml-auto p-1 rounded-full hover:bg-red-200 transition-colors'>
										<X className='h-4 w-4' />
									</button>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Login Form */}
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='john.doe@gmail.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className='h-12 px-4 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-primary transition-all'
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<div className='relative'>
								<Input
									id='password'
									type={showPassword ? 'text' : 'password'}
									placeholder='••••••••'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className='h-12 px-4 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-primary pr-10'
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition'>
									{showPassword ? (
										<EyeOff className='h-5 w-5' />
									) : (
										<Eye className='h-5 w-5' />
									)}
								</button>
							</div>
						</div>

						<Button
							type='submit'
							className='w-full h-12 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition-all'
							disabled={isLoading}>
							{isLoading ? 'Signing in...' : 'Sign In'}
						</Button>
					</form>
				</motion.div>
			</div>
		</div>
	);
}
