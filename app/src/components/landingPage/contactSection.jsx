import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [submitted, setSubmitted] = useState(false);
	const formSpreeID = 'xwplnylj';

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const response = await fetch(`https://formspree.io/f/${formSpreeID}`, {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json',
			},
		});

		if (response.ok) {
			setSubmitted(true);
			e.target.reset();
		} else {
			alert('Something went wrong. Please try again.');
		}
	};

	return (
		<section id='contact' className='py-20 bg-gray-50 dark:bg-gray-800'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
						Get in Touch
					</h2>
					<div className='w-24 h-1 bg-primary mx-auto mb-6'></div>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
						Have questions or want to learn more about Mentora? We'd love to
						hear from you.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
						transition={{ duration: 0.5, delay: 0.2 }}>
						<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
							Contact Information
						</h3>
						<div className='space-y-6'>
							<div className='flex items-start'>
								<div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
									<Mail className='h-5 w-5 text-primary' />
								</div>
								<div>
									<h4 className='font-semibold text-gray-900 dark:text-white'>
										Email
									</h4>
									<p className='text-gray-600 dark:text-gray-300'>
										principal@zerone.com
									</p>
								</div>
							</div>
							<div className='flex items-start'>
								<div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
									<Phone className='h-5 w-5 text-primary' />
								</div>
								<div>
									<h4 className='font-semibold text-gray-900 dark:text-white'>
										Phone
									</h4>
									<p className='text-gray-600 dark:text-gray-300'>
										+91 99999 88888
									</p>
								</div>
							</div>
							<div className='flex items-start'>
								<div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
									<MapPin className='h-5 w-5 text-primary' />
								</div>
								<div>
									<h4 className='font-semibold text-gray-900 dark:text-white'>
										Address
									</h4>
									<p className='text-gray-600 dark:text-gray-300'>
										Thuthiyoor Rd, Thuthiyoor, Kakkanad, Kerala 682037
									</p>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
						transition={{ duration: 0.5, delay: 0.3 }}>
						{submitted ? (
							<div className='text-center text-green-600 text-lg font-semibold'>
								Thank you! Your message has been sent.
							</div>
						) : (
							<form onSubmit={handleSubmit} className='space-y-6'>
								<div>
									<label
										htmlFor='name'
										className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
										Name
									</label>
									<Input
										id='name'
										name='name'
										placeholder='Your name'
										required
										className='w-full'
									/>
								</div>

								<div>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
										Email
									</label>
									<Input
										id='email'
										name='email'
										type='email'
										placeholder='Your email address'
										required
										className='w-full'
									/>
								</div>

								<div>
									<label
										htmlFor='message'
										className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
										Message
									</label>
									<Textarea
										id='message'
										name='message'
										placeholder='How can we help you?'
										rows={5}
										required
										className='w-full'
									/>
								</div>

								<Button type='submit' className='w-full'>
									Send Message
									<Send className='ml-2 h-5 w-5' />
								</Button>
							</form>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
