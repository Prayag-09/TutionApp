import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '../../components/ui/avatar';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export default function TestimonialsSection() {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [currentIndex, setCurrentIndex] = useState(0);
	const [autoplay, setAutoplay] = useState(true);

	const testimonials = [
		{
			name: 'Sarah Johnson',
			role: 'High School Teacher',
			image: '/testmonial/imageSarah.jpeg?height=100&width=100',
			quote:
				'Mentora has transformed how I interact with my students. The progress tracking and analytics help me personalize my teaching.',
		},
		{
			name: 'Michael Chen',
			role: 'Parent',
			image: '/testmonial/imageMichael.jpeg?height=100&width=100',
			quote:
				"As a parent, I love being able to track my child's progress and easily communicate with teachers. It keeps me engaged in their education.",
		},
		{
			name: 'Emily Rodriguez',
			role: 'University Student',
			image: '/testmonial/imageEmily.jpeg',
			quote:
				"The mentorship feature has been invaluable. I've connected with mentors who have guided me through tough courses and career choices.",
		},
		{
			name: 'David Wilson',
			role: 'School Administrator',
			image: '/testmonial/imageDavid.jpeg?height=100&width=100',
			quote:
				'Since implementing Mentora, we’ve seen measurable improvements in student engagement. The data insights are incredibly useful for planning.',
		},
	];

	useEffect(() => {
		if (!autoplay) return;
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [autoplay, testimonials.length]);

	const handlePrev = () => {
		setAutoplay(false);
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
		);
	};

	const handleNext = () => {
		setAutoplay(false);
		setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
	};

	return (
		<section id='testimonials' className='py-20 bg-white dark:bg-gray-900'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
						What Our Users Say
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto mb-6'></div>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
						Real feedback from students, teachers, and parents who use Mentora
						daily.
					</p>
				</motion.div>

				<div className='relative max-w-4xl mx-auto'>
					<div className='overflow-hidden'>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={
								inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
							}
							transition={{ duration: 0.5, delay: 0.2 }}
							aria-live='polite'>
							<Card className='border-none shadow-lg bg-gray-50 dark:bg-gray-800'>
								<CardContent className='p-8'>
									<div className='flex justify-center mb-6'>
										<div className='relative'>
											<Quote className='absolute -top-2 -left-2 h-8 w-8 text-primary/20' />
											<Avatar className='h-20 w-20 border-4 border-white dark:border-gray-800'>
												<AvatarImage
													src={testimonials[currentIndex].image}
													alt={testimonials[currentIndex].name}
												/>
												<AvatarFallback>
													{testimonials[currentIndex].name.charAt(0)}
												</AvatarFallback>
											</Avatar>
										</div>
									</div>
									<blockquote className='text-center mb-6'>
										<p className='text-lg md:text-xl text-gray-700 dark:text-gray-300 italic'>
											"{testimonials[currentIndex].quote}"
										</p>
									</blockquote>
									<div className='text-center'>
										<h4 className='font-bold text-gray-900 dark:text-white'>
											{testimonials[currentIndex].name}
										</h4>
										<p className='text-gray-600 dark:text-gray-400'>
											{testimonials[currentIndex].role}
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>

					{/* Navigation Dots */}
					<div className='flex justify-center mt-8 space-x-2'>
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => {
									setAutoplay(false);
									setCurrentIndex(index);
								}}
								className={`w-3 h-3 rounded-full transition-all duration-300 ${
									index === currentIndex
										? 'bg-primary scale-125'
										: 'bg-gray-300 dark:bg-gray-600'
								}`}
								aria-label={`Go to testimonial ${index + 1}`}
							/>
						))}
					</div>

					{/* Navigation Buttons */}
					<Button
						variant='outline'
						size='icon'
						className='absolute top-1/2 -left-4 -translate-y-1/2 md:-left-12 bg-white dark:bg-gray-800 shadow-md'
						onClick={handlePrev}
						aria-label='Previous testimonial'>
						<ChevronLeft className='h-5 w-5' />
					</Button>

					<Button
						variant='outline'
						size='icon'
						className='absolute top-1/2 -right-4 -translate-y-1/2 md:-right-12 bg-white dark:bg-gray-800 shadow-md'
						onClick={handleNext}
						aria-label='Next testimonial'>
						<ChevronRight className='h-5 w-5' />
					</Button>
				</div>
			</div>
		</section>
	);
}
