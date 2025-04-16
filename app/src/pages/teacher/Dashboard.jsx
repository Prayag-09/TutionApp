import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	getAllStudents,
	getAllAssignments,
	getAllGrades,
	getAttendanceReport,
} from '../../lib/axios';
import {
	BookOpen,
	FileText,
	Layers,
	UserCheck,
	Clock,
	Loader2,
	AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
	const [stats, setStats] = useState({
		students: 0,
		assignments: 0,
		grades: 0,
		attendanceReport: null,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				setLoading(true);
				const [studentsRes, assignmentsRes, gradesRes, attendanceRes] =
					await Promise.all([
						getAllStudents(),
						getAllAssignments(),
						getAllGrades(),
						getAttendanceReport(),
					]);

				setStats({
					students: studentsRes.data?.data?.length || 0,
					assignments: assignmentsRes.data?.data?.length || 0,
					grades: gradesRes.data?.data?.length || 0,
					attendanceReport: attendanceRes.data?.data || null,
				});
			} catch (err) {
				setError('Failed to load dashboard data.');
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, []);

	const statCards = [
		{
			title: 'Students',
			value: stats.students,
			icon: UserCheck,
			link: '/teacher/students',
			color: 'bg-green-100 text-green-600',
		},
		{
			title: 'Assignments',
			value: stats.assignments,
			icon: FileText,
			link: '/teacher/assignments',
			color: 'bg-indigo-100 text-indigo-600',
		},
		{
			title: 'Grades',
			value: stats.grades,
			icon: Layers,
			link: '/teacher/grades',
			color: 'bg-yellow-100 text-yellow-600',
		},
	];

	if (loading) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[50vh]'>
				<Loader2 className='h-12 w-12 animate-spin text-indigo-600' />
				<p className='mt-4 text-lg text-gray-600'>Loading dashboard...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md'>
				<div className='flex items-center'>
					<AlertCircle className='h-5 w-5 mr-2' />
					<p>{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className='p-4 md:p-6 lg:p-8'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}>
				<h1 className='text-2xl font-bold text-gray-800 mb-2'>
					Teacher Dashboard
				</h1>
				<p className='text-gray-600 mb-6'>
					Overview of your assigned classes and reports
				</p>
			</motion.div>

			{/* Stat Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
				{statCards.map((card, index) => (
					<motion.div
						key={card.title}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.1 }}
						className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow'>
						<Link to={card.link} className='block p-5'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm text-gray-500'>{card.title}</p>
									<p className='text-2xl font-semibold text-gray-800 mt-1'>
										{card.value}
									</p>
								</div>
								<div className={`p-3 rounded-full ${card.color}`}>
									<card.icon className='h-6 w-6' />
								</div>
							</div>
						</Link>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default TeacherDashboard;
