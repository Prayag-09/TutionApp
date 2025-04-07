import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LogOut, Menu, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Navbar = ({ role, toggleSidebar }) => {
	const [userData, setUserData] = useState({
		role: '',
		email: '',
		name: '',
	});
	const navigate = useNavigate();

	useEffect(() => {
		setUserData({
			role: localStorage.getItem('role') || 'guest',
			email: localStorage.getItem('email') || '',
			name: localStorage.getItem('name') || '',
		});
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		localStorage.removeItem('email');
		localStorage.removeItem('name');
		navigate('/login');
	};

	const getRoleDisplayName = () => {
		switch (userData.role) {
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

	const getAvatarFallback = () => {
		// Safe fallbacks for all cases
		if (userData.name) {
			return userData.name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.slice(0, 2)
				.toUpperCase();
		}
		if (userData.email) {
			return userData.email[0].toUpperCase();
		}
		return 'U'; // Default fallback
	};

	return (
		<header
			className={cn(
				'w-full bg-white/95 backdrop-blur-sm border-b border-gray-100',
				'px-4 sm:px-6 py-2.5 sticky top-0 z-50',
				'flex justify-between items-center shadow-sm'
			)}>
			<div className='flex items-center gap-2'>
				<button
					onClick={toggleSidebar}
					className={cn(
						'lg:hidden p-1.5 rounded-md transition-colors',
						'text-gray-500 hover:text-primary hover:bg-gray-100'
					)}
					aria-label='Toggle sidebar'>
					<Menu className='h-5 w-5' />
				</button>

				<div
					onClick={() => navigate(`/${userData.role}/dashboard`)}
					className={cn(
						'cursor-pointer flex items-center gap-2',
						'hover:opacity-80 transition-opacity'
					)}>
					<span
						className={cn(
							'text-lg font-bold tracking-tight',
							'bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'
						)}>
						Mentora
					</span>
					<span className='hidden sm:inline text-sm font-medium text-gray-500'>
						{getRoleDisplayName()} Panel
					</span>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				{userData.email || userData.name ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className={cn(
									'flex items-center gap-2 p-1 pr-2 rounded-full',
									'hover:bg-gray-50 transition-colors',
									'focus:outline-none focus:ring-2 focus:ring-primary/50'
								)}>
								<Avatar className='h-8 w-8'>
									<AvatarFallback className='bg-primary/10 text-primary font-medium'>
										{getAvatarFallback()}
									</AvatarFallback>
								</Avatar>
								<div className='hidden md:flex items-center gap-1'>
									<span className='text-sm font-medium text-gray-700 max-w-[120px] truncate'>
										{userData.name || userData.email}
									</span>
									<ChevronDown className='h-4 w-4 text-gray-400' />
								</div>
							</button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align='end' className='w-56'>
							<DropdownMenuItem className='flex flex-col items-start gap-0.5 cursor-default'>
								<span className='font-medium truncate w-full'>
									{userData.name || userData.email}
								</span>
								<span className='text-xs text-gray-500'>
									{getRoleDisplayName()}
								</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={handleLogout}
								className='text-red-600 focus:text-red-600 focus:bg-red-50'>
								<LogOut className='mr-2 h-4 w-4' />
								<span>Sign out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Button
						variant='outline'
						size='sm'
						onClick={handleLogout}
						className='flex items-center gap-1.5'>
						<LogOut className='h-4 w-4' />
						<span className='hidden sm:inline'>Sign out</span>
					</Button>
				)}
			</div>
		</header>
	);
};

export default Navbar;
