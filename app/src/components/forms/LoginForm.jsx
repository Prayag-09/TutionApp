import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GalleryVerticalEnd, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/axios';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';

const containerVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: [0.43, 0.13, 0.23, 0.96],
			staggerChildren: 0.08,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 15 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
	},
};

const errorVariants = {
	hidden: { opacity: 0, height: 0, marginBottom: 0 },
	visible: {
		opacity: 1,
		height: 'auto',
		marginBottom: 12,
		transition: { duration: 0.3, ease: 'easeInOut' },
	},
};

export function LoginForm({ className }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) return setError('Please fill in all fields');
		setLoading(true);
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
				'flex flex-col items-center gap-4 w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-md border border-gray-100',
				className
			)}>
			<motion.div
				className='flex flex-col items-center gap-1'
				variants={itemVariants}>
				<div className='relative'>
					<motion.div
						className='flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white shadow-md'
						animate={{ scale: loading ? [1, 1.05, 1] : 1 }}
						transition={{
							scale: { duration: 0.6, repeat: loading ? Infinity : 0 },
						}}>
						<GalleryVerticalEnd className='size-5' />
					</motion.div>
				</div>
				<motion.h1
					className='text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-0.5'
					variants={itemVariants}>
					Mentora
				</motion.h1>
				<motion.p
					variants={itemVariants}
					className='text-xs text-gray-600 -mt-0.5'>
					Sign in to continue
				</motion.p>
			</motion.div>

			<form onSubmit={handleSubmit} className='w-full space-y-4'>
				<AnimatePresence>
					{error && (
						<motion.div
							variants={errorVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
							className='text-red-600 text-xs bg-red-50 p-2 rounded-lg border border-red-100'>
							{error}
						</motion.div>
					)}
				</AnimatePresence>

				<motion.div variants={itemVariants} className='space-y-1'>
					<Label htmlFor='email' className='text-xs font-medium'>
						Email
					</Label>
					<Input
						id='email'
						type='email'
						placeholder='john.doe@gmail.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className='bg-gray-50 focus:ring-2 focus:ring-primary/20'
					/>
				</motion.div>

				<motion.div variants={itemVariants} className='space-y-1'>
					<Label htmlFor='password' className='text-xs font-medium'>
						Password
					</Label>
					<div className='relative'>
						<Input
							id='password'
							type={showPassword ? 'text' : 'password'}
							placeholder='••••••••'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className='bg-gray-50 pr-10 focus:ring-2 focus:ring-primary/20'
						/>
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'>
							{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
						</button>
					</div>
				</motion.div>

				<motion.div variants={itemVariants}>
					<Button
						type='submit'
						disabled={loading}
						className={cn(
							'w-full bg-gradient-to-r from-primary to-primary/80 text-white py-2.5 text-sm font-medium',
							!loading && 'hover:from-primary/90 hover:to-primary/70',
							loading && 'opacity-70 cursor-not-allowed'
						)}>
						{loading ? (
							<span className='flex items-center gap-2'>
								<Loader2 className='animate-spin size-4' /> Logging in...
							</span>
						) : (
							'Sign In'
						)}
					</Button>
				</motion.div>
			</form>
		</motion.div>
	);
}
