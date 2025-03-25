// pages/principal/Reports.jsx
import React, { useState, useEffect } from 'react';
import {
	getUserReport,
	getTuitionReport,
	getFeeReport,
	getAttendanceReport,
} from '../../lib/axios';

const Reports = () => {
	const [reports, setReports] = useState({
		userReport: [],
		tuitionReport: [],
		feeReport: [],
		attendanceReport: [],
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchReports = async () => {
			try {
				setLoading(true);
				const [userRes, tuitionRes, feeRes, attendanceRes] = await Promise.all([
					getUserReport(),
					getTuitionReport(),
					getFeeReport(),
					getAttendanceReport(),
				]);

				setReports({
					userReport: userRes.data.data,
					tuitionReport: tuitionRes.data.data,
					feeReport: feeRes.data.data,
					attendanceReport: attendanceRes.data.data,
				});
			} catch (err) {
				setError('Failed to load reports');
			} finally {
				setLoading(false);
			}
		};

		fetchReports();
	}, []);

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='reports'>
			<h1 className='text-2xl font-bold mb-6'>Reports & Analytics</h1>

			{/* User Report */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4'>User Report</h2>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100'>
								<th className='border px-4 py-2 text-left'>Email</th>
								<th className='border px-4 py-2 text-left'>Role</th>
								<th className='border px-4 py-2 text-left'>Status</th>
							</tr>
						</thead>
						<tbody>
							{reports.userReport.map((user) => (
								<tr key={user._id} className='hover:bg-gray-50'>
									<td className='border px-4 py-2'>{user.email}</td>
									<td className='border px-4 py-2'>{user.role}</td>
									<td className='border px-4 py-2'>{user.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Tuition Report */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Tuition Report</h2>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100'>
								<th className='border px-4 py-2 text-left'>Grade</th>
								<th className='border px-4 py-2 text-left'>Subject</th>
								<th className='border px-4 py-2 text-left'>Student Count</th>
							</tr>
						</thead>
						<tbody>
							{reports.tuitionReport.map((tuition, index) => (
								<tr key={index} className='hover:bg-gray-50'>
									<td className='border px-4 py-2'>{tuition.grade}</td>
									<td className='border px-4 py-2'>{tuition.subject}</td>
									<td className='border px-4 py-2'>{tuition.studentCount}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Fee Report */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Fee Report</h2>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100'>
								<th className='border px-4 py-2 text-left'>Student ID</th>
								<th className='border px-4 py-2 text-left'>Total Amount</th>
								<th className='border px-4 py-2 text-left'>Status</th>
							</tr>
						</thead>
						<tbody>
							{reports.feeReport.map((fee, index) => (
								<tr key={index} className='hover:bg-gray-50'>
									<td className='border px-4 py-2'>{fee.studentId}</td>
									<td className='border px-4 py-2'>{fee.totalAmount}</td>
									<td className='border px-4 py-2'>{fee.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Attendance Report */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Attendance Report</h2>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-100'>
								<th className='border px-4 py-2 text-left'>Student ID</th>
								<th className='border px-4 py-2 text-left'>Date</th>
								<th className='border px-4 py-2 text-left'>Status</th>
							</tr>
						</thead>
						<tbody>
							{reports.attendanceReport.map((attendance, index) => (
								<tr key={index} className='hover:bg-gray-50'>
									<td className='border px-4 py-2'>{attendance.studentId}</td>
									<td className='border px-4 py-2'>{attendance.date}</td>
									<td className='border px-4 py-2'>{attendance.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Reports;
