import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
				] = await Promise.all([
					getAllTeachers().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getAllStudents().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getAllParents().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getAllGrades().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getAllSubjects().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getAllAssignments().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getAllFees().catch((err) => ({
						data: { success: false, fees: [] },
						error: err,
					})),
					getUserRoles().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getUserReport().catch((err) => ({
						data: { success: false, data: null },
						error: err,
					})),
					getTuitionReport().catch((err) => ({
						data: { success: false, data: null },
						error: err,
					})),
					getFeeReport().catch((err) => ({
						data: { success: false, data: null },
						error: err,
					})),
					getAttendanceReport().catch((err) => ({
						data: { success: false, data: null },
						error: err,
					})),
				]);

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
						? feesRes.data.fees
							? feesRes.data.fees.length
							: feesRes.data.data.length
						: 0,
					roles: rolesRes.data.success ? rolesRes.data.data : [],
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

				// Check for partial failures
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
					setError(`Failed to load: ${failedCalls.join(', ')}`);
				}
			} catch (err) {
				setError('Failed to load dashboard stats');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='dashboard'>
			<h1 className='text-2xl font-bold mb-6'>Principal Dashboard</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Teachers</h3>
					<p className='text-2xl'>{stats.teachers}</p>
					<Link
						to='/principal/teachers'
						className='text-blue-500 hover:underline'>
						Manage Teachers
					</Link>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Students</h3>
					<p className='text-2xl'>{stats.students}</p>
					<Link
						to='/principal/students'
						className='text-blue-500 hover:underline'>
						Manage Students
					</Link>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Parents</h3>
					<p className='text-2xl'>{stats.parents}</p>
					<Link
						to='/principal/parents'
						className='text-blue-500 hover:underline'>
						Manage Parents
					</Link>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Grades</h3>
					<p className='text-2xl'>{stats.grades}</p>
					<Link
						to='/principal/grades'
						className='text-blue-500 hover:underline'>
						Manage Grades
					</Link>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Subjects</h3>
					<p className='text-2xl'>{stats.subjects}</p>
					<Link
						to='/principal/subjects'
						className='text-blue-500 hover:underline'>
						Manage Subjects
					</Link>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Assignments</h3>
					<p className='text-2xl'>{stats.assignments}</p>
					<Link
						to='/principal/assignments'
						className='text-blue-500 hover:underline'>
						Manage Assignments
					</Link>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Fees</h3>
					<p className='text-2xl'>{stats.fees}</p>
					<Link to='/principal/fees' className='text-blue-500 hover:underline'>
						Manage Fees
					</Link>
				</div>
			</div>
			<div className='mt-8'>
				<h2 className='text-xl font-semibold mb-4'>User Roles</h2>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<ul className='space-y-2'>
						{stats.roles.map((user) => (
							<li key={user._id} className='flex justify-between'>
								<span>{user.email}</span>
								<span className='text-gray-600'>{user.role}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className='mt-8'>
				<h2 className='text-xl font-semibold mb-4'>Reports Overview</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					<div className='bg-white p-4 rounded-lg shadow-md'>
						<h3 className='text-lg font-semibold'>User Report</h3>
						<p className='text-2xl'>{stats.userReport ? 'Available' : 'N/A'}</p>
					</div>
					<div className='bg-white p-4 rounded-lg shadow-md'>
						<h3 className='text-lg font-semibold'>Tuition Report</h3>
						<p className='text-2xl'>
							{stats.tuitionReport ? 'Available' : 'N/A'}
						</p>
					</div>
					<div className='bg-white p-4 rounded-lg shadow-md'>
						<h3 className='text-lg font-semibold'>Fee Report</h3>
						<p className='text-2xl'>{stats.feeReport ? 'Available' : 'N/A'}</p>
					</div>
					<div className='bg-white p-4 rounded-lg shadow-md'>
						<h3 className='text-lg font-semibold'>Attendance Report</h3>
						<p className='text-2xl'>
							{stats.attendanceReport ? 'Available' : 'N/A'}
						</p>
					</div>
				</div>
			</div>
			<div className='mt-6'>
				<Link to='/principal/reports' className='text-blue-500 hover:underline'>
					View Detailed Reports
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
