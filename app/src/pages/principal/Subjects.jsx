// pages/principal/Subjects.jsx
import React, { useState, useEffect } from 'react';
import {
	getAllSubjects,
	getSubjectById,
	updateSubject,
	deleteSubject,
} from '../../lib/axios';

const Subjects = () => {
	const [subjects, setSubjects] = useState([]);
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [editData, setEditData] = useState({
		name: '',
		description: '',
		status: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSubjects = async () => {
			try {
				setLoading(true);
				const res = await getAllSubjects();
				setSubjects(res.data.data);
			} catch (err) {
				setError('Failed to load subjects');
			} finally {
				setLoading(false);
			}
		};

		fetchSubjects();
	}, []);

	const handleViewDetails = async (id) => {
		try {
			const res = await getSubjectById(id);
			setSelectedSubject(res.data.data);
			setEditData({
				name: res.data.data.name,
				description: res.data.data.description || '',
				status: res.data.data.status,
			});
		} catch (err) {
			setError('Failed to load subject details');
		}
	};

	const handleUpdate = async (id) => {
		try {
			const res = await updateSubject(id, editData);
			setSubjects(
				subjects.map((subject) =>
					subject._id === id ? res.data.data : subject
				)
			);
			setSelectedSubject(null);
			setEditData({ name: '', description: '', status: '' });
		} catch (err) {
			setError('Failed to update subject');
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this subject?')) {
			try {
				await deleteSubject(id);
				setSubjects(subjects.filter((subject) => subject._id !== id));
				setSelectedSubject(null);
			} catch (err) {
				setError('Failed to delete subject');
			}
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='subjects'>
			<h1 className='text-2xl font-bold mb-6'>Manage Subjects</h1>
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>Name</th>
							<th className='border px-4 py-2 text-left'>Status</th>
							<th className='border px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{subjects.map((subject) => (
							<tr key={subject._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{subject.name}</td>
								<td className='border px-4 py-2'>{subject.status}</td>
								<td className='border px-4 py-2'>
									<button
										onClick={() => handleViewDetails(subject._id)}
										className='bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600'>
										View/Edit
									</button>
									<button
										onClick={() => handleDelete(subject._id)}
										className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedSubject && (
				<div className='mt-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Subject Details</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleUpdate(selectedSubject._id);
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
								Description:
							</label>
							<textarea
								value={editData.description}
								onChange={(e) =>
									setEditData({ ...editData, description: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
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
								Update Subject
							</button>
							<button
								type='button'
								onClick={() => setSelectedSubject(null)}
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

export default Subjects;
