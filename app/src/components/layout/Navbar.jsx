import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export default function Navbar() {
	const [role, setRole] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const storedRole = localStorage.getItem('role');
		setRole(storedRole || 'guest');
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		navigate('/login');
	};

	const getRoleDisplayName = () => {
		switch (role) {
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
			<div
				className='text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent cursor-pointer'
				onClick={() => navigate(`/${role}/dashboard`)}>
				Mentora {role && `| ${getRoleDisplayName()} Panel`}
			</div>
			<div className='flex items-center gap-4'>
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
}
