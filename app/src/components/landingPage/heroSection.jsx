import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<section className='relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden'>
			{/* Background Gradient */}
			<div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 -z-10' />

			{/* Decorative Elements */}
			<div className='absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/20 to-transparent dark:from-black/20 -z-10' />
			<div className='absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10' />
			<div className='absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10' />

			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col lg:flex-row items-center gap-12'>
					{/* Text Section */}
					<div className='flex-1 text-center lg:text-left'>
						<motion.h1
							className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}>
							Your Learning, <br />
							<span className='text-primary'>Guided & Simplified</span>
						</motion.h1>

						<motion.p
							className='text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}>
							Mentora connects students, teachers, and parents in a seamless
							learning experience—offering{' '}
							<b>
								personalized mentorship, progress tracking, and interactive
								collaboration tools
							</b>{' '}
							to help you stay on top of your educational goals.
						</motion.p>

						<motion.div
							className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}>
							<Link to='/login'>
								<Button size='lg' className='text-lg px-8 font-semibold'>
									Get Started
								</Button>
							</Link>
							<Button
								size='lg'
								variant='outline'
								className='text-lg px-8 font-semibold'>
								Explore Features
							</Button>
						</motion.div>
					</div>

					{/* Image Section */}
					<motion.div
						className='flex-1'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}>
						<div className='relative'>
							<div className='absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl transform rotate-3 scale-105' />
							<img
								src='/placeholder.svg?height=600&width=600'
								alt='Mentora Platform'
								className='relative z-10 rounded-2xl shadow-xl w-full max-w-lg mx-auto'
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
