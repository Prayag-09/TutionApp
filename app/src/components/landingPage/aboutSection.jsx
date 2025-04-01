import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle } from 'lucide-react';

export default function AboutSection() {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const benefits = [
		'Efficient management of student records, schedules, and attendance',
		'Seamless communication between teachers, students, and parents',
		'Automated reports and insights for better decision-making',
		'User-friendly interface designed for an effortless experience',
	];

	return (
		<section id='about' className='py-20 bg-white dark:bg-gray-900'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
						About Mentora
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto mb-6'></div>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
						Mentora is a modern tuition management system designed to simplify
						administration, enhance communication, and create an engaging
						learning experience for students, teachers, and parents.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
						transition={{ duration: 0.5, delay: 0.2 }}>
						<div className='relative'>
							<div className='absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl transform -rotate-2' />
							<img
								src='/placeholder.svg?height=500&width=500'
								alt='Tuition Management Illustration'
								className='relative z-10 rounded-2xl shadow-lg w-full'
							/>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
						transition={{ duration: 0.5, delay: 0.3 }}>
						<h3 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							Smart Tuition Management for a Better Learning Experience
						</h3>
						<p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
							Our platform enables teachers to focus on teaching while reducing
							the hassle of managing schedules, student records, and progress
							tracking. Parents stay informed, and students benefit from an
							organized, data-driven learning journey.
						</p>

						<div className='space-y-4'>
							{benefits.map((benefit, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 10 }}
									animate={
										inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
									}
									transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
									className='flex items-start'>
									<CheckCircle className='text-primary mr-3 h-6 w-6 flex-shrink-0' />
									<p className='text-gray-700 dark:text-gray-300'>{benefit}</p>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
