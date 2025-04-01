import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
	Brain,
	BookOpen,
	MessageSquare,
	BarChart4,
	Users,
	Shield,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';

export default function FeaturesSection() {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});

	const features = [
		{
			title: 'AI-Powered Personalized Learning',
			description:
				'Leverage AI-driven insights to create a tailored learning experience that adapts to every student’s unique needs and pace.',
			icon: Brain,
		},
		{
			title: 'Interactive & Engaging Lessons',
			description:
				'Gamified quizzes, dynamic assignments, and real-time progress tracking to make learning both fun and effective.',
			icon: BookOpen,
		},
		{
			title: 'Real-Time Communication Hub',
			description:
				'Stay connected with an integrated chat and notification system, ensuring seamless interaction between students, teachers, and parents.',
			icon: MessageSquare,
		},
		{
			title: 'Smart Analytics & Progress Reports',
			description:
				'Get in-depth performance insights and AI-powered recommendations to help educators make data-driven decisions.',
			icon: BarChart4,
		},
		{
			title: 'Collaborative Learning Spaces',
			description:
				'Encourage teamwork with interactive discussion boards and group learning sessions designed to foster knowledge-sharing.',
			icon: Users,
		},
		{
			title: 'Secure & Safe Learning Environment',
			description:
				'A privacy-first platform with robust security controls, ensuring a protected space for students and educators alike.',
			icon: Shield,
		},
	];

	return (
		<section id='features' className='py-20 bg-gray-50 dark:bg-gray-800'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
						Empowering Education with Smart Technology
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto mb-6'></div>
					<p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
						Mentora combines innovation and intelligence to enhance the way
						students learn, teachers teach, and parents stay informed. Explore
						the powerful features designed to transform modern education.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, index) => {
						const { ref, inView } = useInView({
							triggerOnce: true,
							threshold: 0.1,
						});
						const Icon = feature.icon;

						return (
							<motion.div
								key={index}
								ref={ref}
								initial={{ opacity: 0, y: 20 }}
								animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
								transition={{ duration: 0.5, delay: 0.1 * index }}>
								<Card className='h-full border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-900 rounded-lg'>
									<CardHeader>
										<div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
											<Icon className='h-7 w-7 text-primary' />
										</div>
										<CardTitle className='text-xl font-bold'>
											{feature.title}
										</CardTitle>
									</CardHeader>
									<CardContent className='p-6'>
										<CardDescription className='text-gray-600 dark:text-gray-300 text-base'>
											{feature.description}
										</CardDescription>
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
