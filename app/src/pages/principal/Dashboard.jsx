import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	getAllTeachers,
	getAllStudents,
	getAllParents,
	getUserRoles,
	getAllGrades,
	getAllSubjects,
	getAllAssignments,
	getAllFees,
	getUserReport,
	getTuitionReport,
	getFeeReport,
	getAttendanceReport,
} from '../../lib/axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Users,
	BookOpen,
	FileText,
	DollarSign,
	Layers,
	Clipboard,
	BarChart2,
	Clock,
	UserCheck,
	Loader2,
	ChevronDown,
	ChevronRight,
	Shield,
} from 'lucide-react';

const Dashboard = () => {
	const [stats, setStats] = useState({
		teachers: 0,
		students: 0,
		parents: 0,
		grades: 0,
		subjects: 0,
		assignments: 0,
		fees: 0,
		roles: [],
		userReport: null,
		tuitionReport: null,
		feeReport: null,
		attendanceReport: null,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showRoles, setShowRoles] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchStats = async () => {
			try {
				setLoading(true);
				setError(null);

				const [
					teachersRes,
					studentsRes,
					parentsRes,
					gradesRes,
					subjectsRes,
					assignmentsRes,
					feesRes,
					rolesRes,
					userReportRes,
					tuitionReportRes,
					feeReportRes,
					attendanceReportRes,
				] = await Promise.all(
					[
						getAllTeachers(),
						getAllStudents(),
						getAllParents(),
						getAllGrades(),
						getAllSubjects(),
						getAllAssignments(),
						getAllFees(),
						getUserRoles(),
						getUserReport(),
						getTuitionReport(),
						getFeeReport(),
						getAttendanceReport(),
					].map((p) =>
						p.catch((err) => {
							console.error('API Error:', err);
							return { data: { success: false, error: err.message } };
						})
					)
				);

				setStats({
					teachers: teachersRes.data.success ? teachersRes.data.data.length : 0,
					students: studentsRes.data.success ? studentsRes.data.data.length : 0,
					parents: parentsRes.data.success ? parentsRes.data.data.length : 0,
					grades: gradesRes.data.success ? gradesRes.data.data.length : 0,
					subjects: subjectsRes.data.success ? subjectsRes.data.data.length : 0,
					assignments: assignmentsRes.data.success
						? assignmentsRes.data.data.length
						: 0,
					fees: feesRes.data.success
						? (feesRes.data.fees || feesRes.data.data).length
						: 0,
					roles: rolesRes.data.success ? rolesRes.data.data.slice(0, 5) : [], // Show only first 5 roles
					userReport: userReportRes.data.success
						? userReportRes.data.data
						: null,
					tuitionReport: tuitionReportRes.data.success
						? tuitionReportRes.data.data
						: null,
					feeReport: feeReportRes.data.success ? feeReportRes.data.data : null,
					attendanceReport: attendanceReportRes.data.success
						? attendanceReportRes.data.data
						: null,
				});

				// Error handling for failed calls
				const failedCalls = [];
				if (!teachersRes.data.success) failedCalls.push('teachers');
				if (!studentsRes.data.success) failedCalls.push('students');
				if (!parentsRes.data.success) failedCalls.push('parents');
				if (!gradesRes.data.success) failedCalls.push('grades');
				if (!subjectsRes.data.success) failedCalls.push('subjects');
				if (!assignmentsRes.data.success) failedCalls.push('assignments');
				if (!feesRes.data.success) failedCalls.push('fees');
				if (!rolesRes.data.success) failedCalls.push('roles');
				if (!userReportRes.data.success) failedCalls.push('user report');
				if (!tuitionReportRes.data.success) failedCalls.push('tuition report');
				if (!feeReportRes.data.success) failedCalls.push('fee report');
				if (!attendanceReportRes.data.success)
					failedCalls.push('attendance report');

				if (failedCalls.length > 0) {
					setError(
						`Partial data loaded. Failed to load: ${failedCalls.join(', ')}`
					);
				}
			} catch (err) {
				setError('Failed to load dashboard data. Please try again later.');
				console.error('Dashboard error:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	const handleViewRoles = () => {
		navigate('/principal/manage-roles');
	};

	const statCards = [
		{
			title: 'Teachers',
			value: stats.teachers,
			icon: Users,
			link: '/principal/teachers',
			color: 'bg-blue-100 text-blue-600',
		},
		{
			title: 'Students',
			value: stats.students,
			icon: UserCheck,
			link: '/principal/students',
			color: 'bg-green-100 text-green-600',
		},
		{
			title: 'Parents',
			value: stats.parents,
			icon: Users,
			link: '/principal/parents',
			color: 'bg-purple-100 text-purple-600',
		},
		{
			title: 'Grades',
			value: stats.grades,
			icon: Layers,
			link: '/principal/grades',
			color: 'bg-yellow-100 text-yellow-600',
		},
		{
			title: 'Subjects',
			value: stats.subjects,
			icon: BookOpen,
			link: '/principal/subjects',
			color: 'bg-red-100 text-red-600',
		},
		{
			title: 'Assignments',
			value: stats.assignments,
			icon: FileText,
			link: '/principal/assignments',
			color: 'bg-indigo-100 text-indigo-600',
		},
		{
			title: 'Fees',
			value: stats.fees,
			icon: DollarSign,
			link: '/principal/fees',
			color: 'bg-emerald-100 text-emerald-600',
		},
	];

	const reportCards = [
		{
			title: 'User Report',
			available: stats.userReport,
			icon: BarChart2,
			color: 'bg-blue-50',
		},
		{
			title: 'Tuition Report',
			available: stats.tuitionReport,
			icon: Clipboard,
			color: 'bg-green-50',
		},
		{
			title: 'Fee Report',
			available: stats.feeReport,
			icon: DollarSign,
			color: 'bg-purple-50',
		},
		{
			title: 'Attendance Report',
			available: stats.attendanceReport,
			icon: Clock,
			color: 'bg-yellow-50',
		},
	];

	if (loading) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[50vh]'>
				<Loader2 className='h-12 w-12 animate-spin text-indigo-600' />
				<p className='mt-4 text-lg text-gray-600'>Loading dashboard data...</p>
			</div>
		);
	}

	if (error) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md'>
				<div className='flex items-center'>
					<AlertCircle className='h-5 w-5 mr-2' />
					<p>{error}</p>
				</div>
				<button
					onClick={() => window.location.reload()}
					className='mt-2 text-sm text-red-600 hover:underline'>
					Try again
				</button>
			</motion.div>
		);
	}

	return (
		<div className='p-4 md:p-6 lg:p-8'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}>
				<h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
					Principal Dashboard
				</h1>
				<p className='text-gray-600 mb-6'>
					Overview of school management system
				</p>
			</motion.div>

			{/* Stats Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
				{statCards.map((card, index) => (
					<motion.div
						key={card.title}
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
						initial='hidden'
						animate='visible'
						transition={{ duration: 0.3, delay: index * 0.1 }}
						className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow'>
						<Link to={card.link} className='block p-5'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-gray-500'>
										{card.title}
									</p>
									<p className='text-2xl font-semibold text-gray-800 mt-1'>
										{card.value}
									</p>
								</div>
								<div className={`p-3 rounded-full ${card.color}`}>
									<card.icon className='h-6 w-6' />
								</div>
							</div>
							<div className='mt-4'>
								<span className='text-sm text-indigo-600 hover:underline'>
									View details
								</span>
							</div>
						</Link>
					</motion.div>
				))}
			</div>

			{/* User Roles Section - Now clickable to expand/show more */}
			<motion.div
				className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8'
				whileHover={{ scale: 1.005 }}
				transition={{ type: 'spring', stiffness: 400 }}>
				<button
					onClick={() => setShowRoles(!showRoles)}
					className='w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors'>
					<div className='flex items-center'>
						<div className='p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4'>
							<Shield className='h-6 w-6' />
						</div>
						<div>
							<h2 className='text-xl font-semibold text-gray-800'>
								User Roles
							</h2>
							<p className='text-sm text-gray-500'>
								{showRoles ? 'Hide user roles' : 'Show recent user roles'}
							</p>
						</div>
					</div>
					{showRoles ? (
						<ChevronDown className='h-5 w-5 text-gray-500' />
					) : (
						<ChevronRight className='h-5 w-5 text-gray-500' />
					)}
				</button>

				<AnimatePresence>
					{showRoles && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className='px-5 pb-5'>
							<div className='border-t border-gray-200 pt-5'>
								{stats.roles.length > 0 ? (
									<div className='space-y-3'>
										{stats.roles.map((user) => (
											<div
												key={user._id}
												className='flex justify-between items-center py-2 px-3 hover:bg-gray-50 rounded-lg'>
												<span className='font-medium text-gray-700'>
													{user.email}
												</span>
												<span className='text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700 capitalize'>
													{user.role}
												</span>
											</div>
										))}
										<button
											onClick={handleViewRoles}
											className='w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors'>
											Manage All Roles
										</button>
									</div>
								) : (
									<div className='text-center py-4 text-gray-500'>
										No user roles data available
									</div>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>

			{/* Reports Section */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-xl font-semibold text-gray-800'>
						Reports Overview
					</h2>
					<Link
						to='/principal/reports'
						className='text-sm text-indigo-600 hover:underline flex items-center'>
						View all reports
						<svg
							className='w-4 h-4 ml-1'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9 5l7 7-7 7'
							/>
						</svg>
					</Link>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
					{reportCards.map((card, index) => (
						<motion.div
							key={card.title}
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0 },
							}}
							initial='hidden'
							animate='visible'
							transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
							className={`${card.color} rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow`}>
							<div className='flex items-center justify-between mb-3'>
								<h3 className='font-medium text-gray-800'>{card.title}</h3>
								<card.icon className='h-5 w-5 text-gray-500' />
							</div>
							<p className='text-2xl font-semibold mb-4'>
								{card.available ? (
									<span className='text-green-600'>Available</span>
								) : (
									<span className='text-gray-400'>N/A</span>
								)}
							</p>
							<Link
								to='/principal/reports'
								className='text-sm text-indigo-600 hover:underline'>
								{card.available ? 'View report' : 'Generate report'}
							</Link>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default Dashboard;
