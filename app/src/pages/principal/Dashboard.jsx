// pages/principal/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	getAllTeachers,
	getAllStudents,
	getAllParents,
	getUserRoles,
	getAllGrades,
	getAllSubjects,
	getAllGradeSubjects,
	getAllStudentSubjects,
	getAllAttendance,
	getAllFees,
	getAllFeeRemittances,
} from '../../lib/axios';

const Dashboard = () => {
	const [stats, setStats] = useState({
		teachers: 0,
		students: 0,
		parents: 0,
		grades: 0,
		subjects: 0,
		gradeSubjects: 0,
		studentSubjects: 0,
		attendanceRecords: 0,
		fees: 0,
		feeRemittances: 0,
		roles: [],
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				setLoading(true);
				const [
					teachersRes,
					studentsRes,
					parentsRes,
					gradesRes,
					subjectsRes,
					gradeSubjectsRes,
					studentSubjectsRes,
					attendanceRes,
					feesRes,
					feeRemittancesRes,
					rolesRes,
				] = await Promise.all([
					getAllTeachers(),
					getAllStudents(),
					getAllParents(),
					getAllGrades(),
					getAllSubjects(),
					getAllGradeSubjects(),
					getAllStudentSubjects(),
					getAllAttendance(),
					getAllFees(),
					getAllFeeRemittances(),
					getUserRoles(),
				]);

				setStats({
					teachers: teachersRes.data.data.length,
					students: studentsRes.data.data.length,
					parents: parentsRes.data.data.length,
					grades: gradesRes.data.data.length,
					subjects: subjectsRes.data.data.length,
					gradeSubjects: gradeSubjectsRes.data.data.length,
					studentSubjects: studentSubjectsRes.data.data.length,
					attendanceRecords: attendanceRes.data.data.length,
					fees: feesRes.data.data.length,
					feeRemittances: feeRemittancesRes.data.data.length,
					roles: rolesRes.data.data,
				});
			} catch (err) {
				setError('Failed to load dashboard stats');
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
					<h3 className='text-lg font-semibold'>Total Grade-Subjects</h3>
					<p className='text-2xl'>{stats.gradeSubjects}</p>
					<Link
						to='/principal/grade-subjects'
						className='text-blue-500 hover:underline'>
						Manage Grade-Subjects
					</Link>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Student-Subjects</h3>
					<p className='text-2xl'>{stats.studentSubjects}</p>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Attendance Records</h3>
					<p className='text-2xl'>{stats.attendanceRecords}</p>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Fees</h3>
					<p className='text-2xl'>{stats.fees}</p>
					<Link to='/principal/fees' className='text-blue-500 hover:underline'>
						Manage Fees
					</Link>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Fee Remittances</h3>
					<p className='text-2xl'>{stats.feeRemittances}</p>
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
			<div className='mt-6'>
				<Link to='/principal/reports' className='text-blue-500 hover:underline'>
					View Detailed Reports
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
