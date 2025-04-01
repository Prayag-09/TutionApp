import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const scrollToSection = (id) => {
		const section = document.getElementById(id);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
			setIsOpen(false);
		}
	};

	const navLinks = [
		{ name: 'Home', id: 'home' },
		{ name: 'About', id: 'about' },
		{ name: 'Features', id: 'features' },
		{ name: 'Testimonials', id: 'testimonials' },
		{ name: 'Contact', id: 'contact' },
	];

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-white/90 backdrop-blur-md shadow dark:bg-gray-900/90'
					: 'bg-transparent'
			}`}>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<Link to='/' className='text-2xl font-bold text-primary'>
						Mentora
					</Link>

					<nav className='hidden md:flex space-x-8'>
						{navLinks.map((link) => (
							<button
								key={link.name}
								onClick={() => scrollToSection(link.id)}
								className='text-gray-700 hover:text-primary transition-colors dark:text-gray-200 dark:hover:text-primary'>
								{link.name}
							</button>
						))}
					</nav>
					<div className='hidden md:block'>
						<Link to='/login'>
							<Button>Get Started</Button>
						</Link>
					</div>

					<button
						onClick={toggleMenu}
						className='md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
						aria-label='Toggle menu'
						aria-expanded={isOpen}>
						{isOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation Menu */}
			<div
				className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 transform transition-transform duration-300 ${
					isOpen ? 'translate-y-0' : '-translate-y-full'
				} shadow-lg`}>
				<div className='container mx-auto px-4 py-6'>
					<ul className='space-y-6'>
						{navLinks.map((link) => (
							<li key={link.name}>
								<button
									onClick={() => scrollToSection(link.id)}
									className='block text-lg font-medium text-gray-700 hover:text-primary transition-colors dark:text-gray-200 dark:hover:text-primary'>
									{link.name}
								</button>
							</li>
						))}
						<li>
							<Link to='/login'>
								<Button className='w-full'>Get Started</Button>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}
