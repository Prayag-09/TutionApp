import React, { useState, useEffect } from 'react';
import {
	getAllTeachers,
	getTeacherById,
	createTeacher,
	deleteTeacher,
} from '../../lib/axios'; // Updated import path

const Teachers = () => {
	const [teachers, setTeachers] = useState([]);
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [editData, setEditData] = useState({
		name: '',
		email: '',
		status: '',
	});
	const [newTeacherData, setNewTeacherData] = useState({
		name: '',
		email: '',
		password: '', // Required for creating a teacher
		status: 'Live', // Default value
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);

	// Fetch all teachers
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

	// View/Edit teacher details
	const handleViewDetails = async (id) => {
		try {
			const res = await getTeacherById(id);
			const teacher = res.data.data;
			setSelectedTeacher(teacher);
			setEditData({
				name: teacher.name,
				email: teacher.email,
				status: teacher.status,
			});
		} catch (err) {
			setError('Failed to load teacher details');
		}
	};

	// Update teacher (placeholder until updateTeacher API is added)
	const handleUpdate = async (id) => {
		try {
			// Simulate update until updateTeacher is implemented
			// const res = await updateTeacher(id, editData);
			const updatedTeacher = { _id: id, ...editData };
			setTeachers(
				teachers.map((teacher) =>
					teacher._id === id ? updatedTeacher : teacher
				)
			);
			setSelectedTeacher(null);
			setEditData({ name: '', email: '', status: '' });
		} catch (err) {
			setError('Failed to update teacher');
		}
	};

	// Delete teacher
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

	// Add new teacher
	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			const res = await createTeacher(newTeacherData);
			setTeachers([...teachers, res.data.data]);
			setNewTeacherData({ name: '', email: '', password: '', status: 'Live' });
			setShowAddForm(false);
		} catch (err) {
			setError('Failed to add teacher');
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='teachers'>
			<h1 className='text-2xl font-bold mb-6'>Manage Teachers</h1>
			<button
				onClick={() => setShowAddForm(!showAddForm)}
				className='bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600'>
				{showAddForm ? 'Cancel' : 'Add Teacher'}
			</button>

			{/* Add Teacher Form */}
			{showAddForm && (
				<div className='mb-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Add New Teacher</h2>
					<form onSubmit={handleAdd} className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name:
							</label>
							<input
								type='text'
								value={newTeacherData.name}
								onChange={(e) =>
									setNewTeacherData({ ...newTeacherData, name: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Email:
							</label>
							<input
								type='email'
								value={newTeacherData.email}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										email: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Password:
							</label>
							<input
								type='password'
								value={newTeacherData.password}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										password: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Status:
							</label>
							<select
								value={newTeacherData.status}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										status: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'>
								<option value='Live'>Live</option>
								<option value='Archive'>Archive</option>
							</select>
						</div>
						<button
							type='submit'
							className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
							Add Teacher
						</button>
					</form>
				</div>
			)}

			{/* Teachers Table */}
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>Name</th>
							<th className='border px-4 py-2 text-left'>Email</th>
							<th className='border px-4 py-2 text-left'>Status</th>
							<th className='border px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{teachers.map((teacher) => (
							<tr key={teacher._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{teacher.name}</td>
								<td className='border px-4 py-2'>{teacher.email}</td>
								<td className='border px-4 py-2'>{teacher.status}</td>
								<td className='border px-4 py-2'>
									<button
										onClick={() => handleViewDetails(teacher._id)}
										className='bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600'>
										View/Edit
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

			{/* Edit Teacher Form */}
			{selectedTeacher && (
				<div className='mt-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Teacher Details</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleUpdate(selectedTeacher._id);
						}}
						className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name:
							</label>
							<input
								type='text'
								value={editData.name}
								onChange={(e) =>
									setEditData({ ...editData, name: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Email:
							</label>
							<input
								type='email'
								value={editData.email}
								onChange={(e) =>
									setEditData({ ...editData, email: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Status:
							</label>
							<select
								value={editData.status}
								onChange={(e) =>
									setEditData({ ...editData, status: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'>
								<option value='Live'>Live</option>
								<option value='Archive'>Archive</option>
							</select>
						</div>
						<div className='flex space-x-3'>
							<button
								type='submit'
								className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
								Update Teacher
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
