import React, { useState, useEffect } from 'react';
import {
	getAllGrades,
	getGradeById,
	updateGrade,
	deleteGrade,
} from '../../lib/axios'; // Fixed import path

const Grades = () => {
	const [grades, setGrades] = useState([]);
	const [selectedGrade, setSelectedGrade] = useState(null);
	const [editData, setEditData] = useState({
		name: '',
		description: '',
		status: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchGrades = async () => {
			try {
				setLoading(true);
				const res = await getAllGrades();
				if (!res.data.success)
					throw new Error(res.data.message || 'Failed to fetch grades');
				setGrades(res.data.data);
			} catch (err) {
				setError(err.message || 'Failed to load grades');
			} finally {
				setLoading(false);
			}
		};

		fetchGrades();
	}, []);

	const handleViewDetails = async (id) => {
		try {
			const res = await getGradeById(id);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to fetch grade');
			setSelectedGrade(res.data.data);
			setEditData({
				name: res.data.data.name,
				description: res.data.data.description || '',
				status: res.data.data.status,
			});
		} catch (err) {
			setError(err.message || 'Failed to load grade details');
		}
	};

	const handleUpdate = async (e, id) => {
		e.preventDefault();
		try {
			const res = await updateGrade(id, editData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to update grade');
			setGrades(
				grades.map((grade) => (grade._id === id ? res.data.data : grade))
			);
			setSelectedGrade(null);
			setEditData({ name: '', description: '', status: '' });
		} catch (err) {
			setError(err.message || 'Failed to update grade');
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this grade?')) {
			try {
				const res = await deleteGrade(id);
				if (!res.data.success)
					throw new Error(res.data.message || 'Failed to delete grade');
				setGrades(grades.filter((grade) => grade._id !== id));
				setSelectedGrade(null);
			} catch (err) {
				setError(err.message || 'Failed to delete grade');
			}
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6 text-gray-800'>Manage Grades</h1>
			<div className='bg-white p-6 rounded-lg shadow-lg'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-200'>
							<th className='border px-6 py-3 text-left text-gray-700'>Name</th>
							<th className='border px-6 py-3 text-left text-gray-700'>
								Status
							</th>
							<th className='border px-6 py-3 text-left text-gray-700'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{grades.map((grade) => (
							<tr
								key={grade._id}
								className='hover:bg-gray-50 transition-colors'>
								<td className='border px-6 py-3'>{grade.name}</td>
								<td className='border px-6 py-3'>{grade.status}</td>
								<td className='border px-6 py-3 space-x-2'>
									<button
										onClick={() => handleViewDetails(grade._id)}
										className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
										Edit
									</button>
									<button
										onClick={() => handleDelete(grade._id)}
										className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedGrade && (
				<div className='mt-8 bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						Edit Grade
					</h2>
					<form
						onSubmit={(e) => handleUpdate(e, selectedGrade._id)}
						className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name
							</label>
							<input
								type='text'
								value={editData.name}
								onChange={(e) =>
									setEditData({ ...editData, name: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Description
							</label>
							<textarea
								value={editData.description}
								onChange={(e) =>
									setEditData({ ...editData, description: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Status
							</label>
							<select
								value={editData.status}
								onChange={(e) =>
									setEditData({ ...editData, status: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'>
								<option value='Live'>Live</option>
								<option value='Archive'>Archive</option>
							</select>
						</div>
						<div className='flex space-x-4'>
							<button
								type='submit'
								className='bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors'>
								Update
							</button>
							<button
								type='button'
								onClick={() => setSelectedGrade(null)}
								className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors'>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Grades;
