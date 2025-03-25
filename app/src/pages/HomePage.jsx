import { Button } from '../components/ui/Button';
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div className='flex items-center justify-center h-screen bg-gray-50'>
			<div className='text-center space-y-4'>
				<h1 className='text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
					Welcome to Mentora Tution App
				</h1>
				<p className='text-gray-600'>
					Please login to continue managing your dashboard.
				</p>
				<Link to={'/login'}>
					<Button className='px-6 py-2'>Go to Login</Button>
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
