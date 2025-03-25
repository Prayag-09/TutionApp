// pages/principal/Teachers.jsx
import React, { useState, useEffect } from 'react';
import {
	getAllTeachers,
	getTeacherById,
	updateUserRole,
	deleteTeacher,
} from '../../lib/axios';

const Teachers = () => {
	const [teachers, setTeachers] = useState([]);
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [editData, setEditData] = useState({ role: '' });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTeachers = async () => {
			try {
				setLoading(true);
				const res = await getAllTeachers();
				setTeachers(res.data.data);
			} catch (err) {
				setError('Failed to load teachers');
			} finally {
				setLoading(false);
			}
		};

		fetchTeachers();
	}, []);

	const handleViewDetails = async (id) => {
		try {
			const res = await getTeacherById(id);
			setSelectedTeacher(res.data.data);
			setEditData({ role: res.data.data.role || 'teacher' });
		} catch (err) {
			setError('Failed to load teacher details');
		}
	};

	const handleUpdateRole = async (id) => {
		try {
			await updateUserRole(id, editData.role);
			setTeachers(
				teachers.map((teacher) =>
					teacher._id === id ? { ...teacher, role: editData.role } : teacher
				)
			);
			setSelectedTeacher(null);
			setEditData({ role: '' });
		} catch (err) {
			setError('Failed to update teacher role');
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this teacher?')) {
			try {
				await deleteTeacher(id);
				setTeachers(teachers.filter((teacher) => teacher._id !== id));
				setSelectedTeacher(null);
			} catch (err) {
				setError('Failed to delete teacher');
			}
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='teachers'>
			<h1 className='text-2xl font-bold mb-6'>Manage Teachers</h1>
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>Name</th>
							<th className='border px-4 py-2 text-left'>Email</th>
							<th className='border px-4 py-2 text-left'>Role</th>
							<th className='border px-4 py-2 text-left'>Status</th>
							<th className='border px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{teachers.map((teacher) => (
							<tr key={teacher._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{teacher.name}</td>
								<td className='border px-4 py-2'>{teacher.email}</td>
								<td className='border px-4 py-2'>{teacher.role}</td>
								<td className='border px-4 py-2'>{teacher.status}</td>
								<td className='border px-4 py-2'>
									<button
										onClick={() => handleViewDetails(teacher._id)}
										className='bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600'>
										View/Edit Role
									</button>
									<button
										onClick={() => handleDelete(teacher._id)}
										className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedTeacher && (
				<div className='mt-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Teacher Details</h2>
					<p className='mb-2'>
						<strong>Name:</strong> {selectedTeacher.name}
					</p>
					<p className='mb-4'>
						<strong>Email:</strong> {selectedTeacher.email}
					</p>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleUpdateRole(selectedTeacher._id);
						}}
						className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Role:
							</label>
							<select
								value={editData.role}
								onChange={(e) =>
									setEditData({ ...editData, role: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'>
								<option value='teacher'>Teacher</option>
								<option value='principal'>Principal</option>
							</select>
						</div>
						<div className='flex space-x-3'>
							<button
								type='submit'
								className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
								Update Role
							</button>
							<button
								type='button'
								onClick={() => setSelectedTeacher(null)}
								className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Teachers;
