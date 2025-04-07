import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Eye,
	EyeOff,
	AlertCircle,
	Loader2,
	Lock,
	Mail,
	GalleryVerticalEnd,
} from 'lucide-react';
import api from '../../lib/axios';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

// Reusable animation variants
const fadeIn = {
	hidden: { opacity: 0, y: -10 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -10 },
};

const shake = {
	shake: {
		x: [0, -10, 10, -10, 10, 0],
		transition: { duration: 0.4 },
	},
};

const scaleUp = {
	initial: { scale: 0.95, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.95, opacity: 0 },
};

export function LoginForm({ className }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => setError(''), 5000);
			return () => clearTimeout(timer);
		}
	}, [error]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.email || !formData.password) {
			setError('Please fill in all fields');
			return;
		}

		setIsLoading(true);
		setError('');

		try {
			const { data } = await api.post('/auth/login', formData);
			localStorage.setItem('token', data.token);
			localStorage.setItem('role', data.role);

			// Smooth transition before navigation
			await new Promise((resolve) => setTimeout(resolve, 300));

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
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className='w-full max-w-md'>
				<div
					className={cn(
						'bg-white rounded-2xl shadow-xl overflow-hidden',
						className
					)}>
					{/* Decorative header */}
					<div className='bg-gradient-to-r from-indigo-600 to-blue-500 h-2 w-full' />

					<div className='p-8 sm:p-10'>
						{/* Logo and title */}
						<motion.div
							className='flex flex-col items-center mb-8'
							variants={scaleUp}
							initial='initial'
							animate='animate'>
							<div className='bg-indigo-100 p-3 rounded-full mb-4'>
								<Lock className='h-8 w-8 text-indigo-600' />
							</div>
							<h1 className='text-3xl font-bold text-gray-900'>Welcome back</h1>
							<p className='text-gray-600 mt-2 text-center'>
								Sign in to your Mentora account
							</p>
						</motion.div>

						{/* Error message */}
						<AnimatePresence>
							{error && (
								<motion.div
									variants={fadeIn}
									initial='hidden'
									animate='visible'
									exit='exit'
									className='mb-6'
									aria-live='assertive'>
									<motion.div
										variants={shake}
										animate='shake'
										className='flex items-start gap-3 rounded-lg bg-red-50 p-4 text-red-600 border border-red-200'>
										<AlertCircle className='h-5 w-5 mt-0.5 flex-shrink-0' />
										<div className='flex-1 text-sm'>{error}</div>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Login form */}
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div className='space-y-2'>
								<Label htmlFor='email' className='text-gray-700'>
									Email
								</Label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<Mail className='h-5 w-5 text-gray-400' />
									</div>
									<Input
										id='email'
										name='email'
										type='email'
										placeholder='your@email.com'
										value={formData.email}
										onChange={handleChange}
										required
										className='pl-10 h-11 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<Label htmlFor='password' className='text-gray-700'>
										Password
									</Label>
									<Link
										to='/forgot-password'
										className='text-sm text-indigo-600 hover:text-indigo-500 hover:underline'
										onMouseEnter={() => setIsHovered(true)}
										onMouseLeave={() => setIsHovered(false)}>
										<motion.span
											animate={{ x: isHovered ? 2 : 0 }}
											transition={{ type: 'spring', stiffness: 500 }}>
											Forgot password?
										</motion.span>
									</Link>
								</div>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										<Lock className='h-5 w-5 text-gray-400' />
									</div>
									<Input
										id='password'
										name='password'
										type={showPassword ? 'text' : 'password'}
										placeholder='••••••••'
										value={formData.password}
										onChange={handleChange}
										required
										className='pl-10 h-11 bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10'
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										aria-label={
											showPassword ? 'Hide password' : 'Show password'
										}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'>
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
								disabled={isLoading}
								className='w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all duration-200 transform hover:scale-[1.01] focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
								{isLoading ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Signing in...
									</>
								) : (
									'Sign In'
								)}
							</Button>
						</form>

						<div className='mt-6 text-center text-sm text-gray-600'>
							Don't have an account?{' '}
							<Link
								to='/register'
								className='font-medium text-indigo-600 hover:text-indigo-500 hover:underline'>
								Sign up
							</Link>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
