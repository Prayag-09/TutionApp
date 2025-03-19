import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LayoutDashboard, Notebook, GraduationCap, Users } from 'lucide-react';

const routesByRole = {
	principal: [
		{
			path: '/principal/dashboard',
			label: 'Principal Dashboard',
			icon: LayoutDashboard,
		},
		{
			path: '/teacher/dashboard',
			label: 'Teacher Dashboard',
			icon: Notebook,
		},
		{
			path: '/student/dashboard',
			label: 'Student Dashboard',
			icon: GraduationCap,
		},
		{ path: '/parent/dashboard', label: 'Parent Dashboard', icon: Users },
	],
	teacher: [
		{
			path: '/teacher/dashboard',
			label: 'Teacher Dashboard',
			icon: Notebook,
		},
		{
			path: '/student/dashboard',
			label: 'Student Dashboard',
			icon: GraduationCap,
		},
		{ path: '/parent/dashboard', label: 'Parent Dashboard', icon: Users },
	],
	student: [
		{
			path: '/student/dashboard',
			label: 'Student Dashboard',
			icon: GraduationCap,
		},
	],
	parent: [
		{ path: '/parent/dashboard', label: 'Parent Dashboard', icon: Users },
	],
};

const Sidebar = ({ role }) => {
	const routes = routesByRole[role] || [];

	return (
		<aside className='w-64 bg-white border-r shadow-md h-screen sticky top-0'>
			<div className='p-6 text-2xl font-bold border-b bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
				Mentora
			</div>
			<nav className='p-4 flex flex-col gap-2'>
				{routes.map((route) => {
					const Icon = route.icon;
					return (
						<NavLink
							key={route.path}
							to={route.path}
							className={({ isActive }) =>
								cn(
									'flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors',
									isActive
										? 'bg-primary/10 text-primary font-medium'
										: 'text-gray-700'
								)
							}>
							<Icon className='size-5' /> {route.label}
						</NavLink>
					);
				})}
			</nav>
		</aside>
	);
};

export default Sidebar;
