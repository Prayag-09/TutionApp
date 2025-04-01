import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LogOut, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

const Navbar = ({ role, toggleSidebar }) => {
	const [userRole, setUserRole] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const storedRole = localStorage.getItem('role');
		const storedEmail = localStorage.getItem('email');
		setUserRole(storedRole || 'guest');
		setUserEmail(storedEmail || 'User');
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		localStorage.removeItem('email');
		navigate('/login');
	};

	const getRoleDisplayName = () => {
		switch (userRole) {
			case 'principal':
				return 'Principal';
			case 'teacher':
				return 'Teacher';
			case 'student':
				return 'Student';
			case 'parent':
				return 'Parent';
			default:
				return 'Guest';
		}
	};

	return (
		<header className='w-full bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center'>
			<div className='flex items-center gap-4'>
				{/* Menu button for mobile view */}
				<button className='lg:hidden text-gray-700' onClick={toggleSidebar}>
					<Menu className='size-6' />
				</button>
				<div
					className='text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent cursor-pointer'
					onClick={() => navigate(`/${userRole}/dashboard`)}>
					Mentora {userRole && `| ${getRoleDisplayName()} Panel`}
				</div>
			</div>
			<div className='flex items-center gap-4'>
				<span className='text-gray-700 hidden md:block'>{userEmail}</span>
				<Button
					variant='outline'
					className={cn(
						'border-primary text-primary hover:bg-primary hover:text-white transition-all'
					)}
					onClick={handleLogout}>
					<LogOut className='size-4 mr-2' /> Logout
				</Button>
			</div>
		</header>
	);
};

export default Navbar;
