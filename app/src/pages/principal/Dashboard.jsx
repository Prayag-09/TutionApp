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
				setError(null);

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
					getAllGradeSubjects().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getAllStudentSubjects().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getAllAttendance().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getAllFees().catch((err) => ({
						data: { success: false, fees: [] },
						error: err,
					})),
					getAllFeeRemittances().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
					getUserRoles().catch((err) => ({
						data: { success: false, data: [] },
						error: err,
					})),
				]);

				setStats({
					teachers: teachersRes.data.success ? teachersRes.data.data.length : 0,
					students: studentsRes.data.success ? studentsRes.data.data.length : 0,
					parents: parentsRes.data.success ? parentsRes.data.data.length : 0,
					grades: gradesRes.data.success ? gradesRes.data.data.length : 0,
					subjects: subjectsRes.data.success ? subjectsRes.data.data.length : 0,
					gradeSubjects: gradeSubjectsRes.data.success
						? gradeSubjectsRes.data.data.length
						: 0,
					studentSubjects: studentSubjectsRes.data.success
						? studentSubjectsRes.data.data.length
						: 0,
					attendanceRecords: attendanceRes.data.success
						? attendanceRes.data.data.length
						: 0,
					fees: feesRes.data.success
						? feesRes.data.fees
							? feesRes.data.fees.length
							: feesRes.data.data.length
						: 0,
					feeRemittances: feeRemittancesRes.data.success
						? feeRemittancesRes.data.data.length
						: 0,
					roles: rolesRes.data.success ? rolesRes.data.data : [],
				});

				// Check for partial failures
				const failedCalls = [];
				if (!teachersRes.data.success) failedCalls.push('teachers');
				if (!studentsRes.data.success) failedCalls.push('students');
				if (!parentsRes.data.success) failedCalls.push('parents');
				if (!gradesRes.data.success) failedCalls.push('grades');
				if (!subjectsRes.data.success) failedCalls.push('subjects');
				if (!gradeSubjectsRes.data.success) failedCalls.push('grade-subjects');
				if (!studentSubjectsRes.data.success)
					failedCalls.push('student-subjects');
				if (!attendanceRes.data.success) failedCalls.push('attendance');
				if (!feesRes.data.success) failedCalls.push('fees');
				if (!feeRemittancesRes.data.success)
					failedCalls.push('fee remittances');
				if (!rolesRes.data.success) failedCalls.push('roles');

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
					<Link
						to='/principal/student-subjects'
						className='text-blue-500 hover:underline'>
						Manage Student-Subjects
					</Link>
				</div>
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-lg font-semibold'>Total Attendance Records</h3>
					<p className='text-2xl'>{stats.attendanceRecords}</p>
					<Link
						to='/principal/attendance'
						className='text-blue-500 hover:underline'>
						Manage Attendance
					</Link>
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
					<Link
						to='/principal/fee-remittances'
						className='text-blue-500 hover:underline'>
						Manage Fee Remittances
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
			<div className='mt-6'>
				<Link to='/principal/reports' className='text-blue-500 hover:underline'>
					View Detailed Reports
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
