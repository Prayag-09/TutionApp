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
					userReport: userRes.data?.data || [],
					tuitionReport: tuitionRes.data?.data || [],
					feeReport: feeRes.data?.data || [],
					attendanceReport: attendanceRes.data?.data || [],
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

	// Safe dynamic table renderer
	const renderTable = (data = [], columns = []) => {
		if (!Array.isArray(data))
			return <div className='text-sm text-gray-500'>No data available</div>;

		return (
			<table className='min-w-full border-collapse'>
				<thead>
					<tr className='bg-gray-100'>
						{columns.map((col, index) => (
							<th key={index} className='border px-4 py-2 text-left'>
								{col.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index} className='hover:bg-gray-50'>
							{columns.map((col, i) => (
								<td key={i} className='border px-4 py-2'>
									{item[col.key] ?? '—'}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6'>Reports & Analytics</h1>

			{/* User Report */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4'>User Report</h2>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					{renderTable(reports.userReport, [
						{ label: 'Email', key: 'email' },
						{ label: 'Role', key: 'role' },
						{ label: 'Status', key: 'status' },
					])}
				</div>
			</div>

			{/* Tuition Report */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Tuition Report</h2>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					{renderTable(reports.tuitionReport, [
						{ label: 'Grade', key: 'grade' },
						{ label: 'Subject', key: 'subject' },
						{ label: 'Student Count', key: 'studentCount' },
					])}
				</div>
			</div>

			{/* Fee Report */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Fee Report</h2>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					{renderTable(reports.feeReport, [
						{ label: 'Student ID', key: 'studentId' },
						{ label: 'Total Amount', key: 'totalAmount' },
						{ label: 'Status', key: 'status' },
					])}
				</div>
			</div>

			{/* Attendance Report */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Attendance Report</h2>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					{renderTable(reports.attendanceReport, [
						{ label: 'Student ID', key: 'studentId' },
						{ label: 'Date', key: 'date' },
						{ label: 'Status', key: 'status' },
					])}
				</div>
			</div>
		</div>
	);
};

export default Reports;
