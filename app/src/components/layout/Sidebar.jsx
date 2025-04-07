import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
	LayoutDashboard,
	Users,
	BookOpen,
	FileText,
	DollarSign,
	BarChart2,
	Lock,
	FileCheck,
	FileQuestion,
} from 'lucide-react';
import { motion } from 'framer-motion';

const routesByRole = {
	principal: [
		{ path: '/principal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
		{ path: '/principal/teachers', label: 'Manage Teachers', icon: Users },
		{ path: '/principal/students', label: 'Manage Students', icon: Users },
		{ path: '/principal/parents', label: 'Manage Parents', icon: Users },
		{ path: '/principal/grades', label: 'Manage Grades', icon: BookOpen },
		{ path: '/principal/subjects', label: 'Manage Subjects', icon: BookOpen },
		{
			path: '/principal/grade-subjects',
			label: 'Manage Grade-Subjects',
			icon: BookOpen,
		},
		{
			path: '/principal/assignments',
			label: 'Manage Assignments',
			icon: FileText,
		},
		{ path: '/principal/quizzes', label: 'Manage Quizzes', icon: FileText },
		{ path: '/principal/fees', label: 'Fee Management', icon: DollarSign },
		{
			path: '/principal/reports',
			label: 'Reports & Analytics',
			icon: BarChart2,
		},
		{
			path: '/principal/access-control',
			label: 'User Access Control',
			icon: Lock,
		},
	],
	teacher: [
		{ path: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
		{ path: '/teacher/students', label: 'My Students', icon: Users },
		{ path: '/teacher/assignments', label: 'Assignments', icon: FileText },
		{ path: '/teacher/quizzes', label: 'Quizzes', icon: FileQuestion },
		{ path: '/teacher/attendance', label: 'Attendance', icon: FileCheck },
		{ path: '/teacher/reports', label: 'Reports', icon: BarChart2 },
	],
	student: [
		{ path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
		{ path: '/student/assignments', label: 'Assignments', icon: FileText },
		{ path: '/student/quizzes', label: 'Quizzes', icon: FileQuestion },
		{ path: '/student/exams', label: 'Exams', icon: FileCheck },
		{ path: '/student/attendance', label: 'Attendance', icon: FileCheck },
	],
	parent: [
		{ path: '/parent/dashboard', label: 'Dashboard', icon: LayoutDashboard },
		{ path: '/parent/children', label: 'My Children', icon: Users },
		{ path: '/parent/fee-payment', label: 'Fee Payment', icon: DollarSign },
		{ path: '/parent/reports', label: 'Reports', icon: BarChart2 },
	],
};

const Sidebar = ({ role }) => {
	return (
		<aside className='w-64 bg-white border-r shadow-sm h-screen sticky top-0 hidden lg:block'>
			<div className='p-5 text-xl font-bold border-b bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
				Mentora
			</div>
			<nav className='p-2 flex flex-col gap-1'>
				{routesByRole[role]?.map((route) => {
					const Icon = route.icon;
					return (
						<NavLink
							key={route.path}
							to={route.path}
							className={({ isActive }) =>
								cn(
									'flex items-center gap-3 px-3 py-2.5 rounded-md mx-2 transition-colors',
									'text-sm text-gray-700 hover:bg-primary/10 hover:text-primary',
									isActive && 'bg-primary/10 text-primary font-medium'
								)
							}>
							<Icon className='size-4.5 flex-shrink-0' />
							<span className='truncate'>{route.label}</span>
						</NavLink>
					);
				})}
			</nav>
		</aside>
	);
};

export default Sidebar;
