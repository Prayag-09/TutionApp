import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '../../components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
	});

	return (
		<section className='py-20 bg-gradient-to-br from-primary to-primary-foreground text-white'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className='max-w-4xl mx-auto text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-6 leading-tight'>
						Ready to Transform Your Educational Experience?
					</h2>
					<p className='text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto'>
						Join thousands of students, teachers, and parents who are already
						benefiting from Mentora's innovative platform.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<Button
							size='lg'
							variant='secondary'
							className='text-primary font-semibold text-lg px-8 shadow-lg'>
							Sign Up for Free
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
