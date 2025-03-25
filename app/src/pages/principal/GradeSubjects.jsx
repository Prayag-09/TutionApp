// pages/principal/GradeSubjects.jsx
import React, { useState, useEffect } from 'react';
import {
	getAllGradeSubjects,
	getGradeSubjectById,
	updateGradeSubject,
	deleteGradeSubject,
} from '../../lib/axios';

const GradeSubjects = () => {
	const [gradeSubjects, setGradeSubjects] = useState([]);
	const [selectedGradeSubject, setSelectedGradeSubject] = useState(null);
	const [editData, setEditData] = useState({
		gradeId: '',
		subjectId: '',
		status: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchGradeSubjects = async () => {
			try {
				setLoading(true);
				const res = await getAllGradeSubjects();
				setGradeSubjects(res.data.data);
			} catch (err) {
				setError('Failed to load grade-subjects');
			} finally {
				setLoading(false);
			}
		};

		fetchGradeSubjects();
	}, []);

	const handleViewDetails = async (id) => {
		try {
			const res = await getGradeSubjectById(id);
			setSelectedGradeSubject(res.data.data);
			setEditData({
				gradeId: res.data.data.gradeId,
				subjectId: res.data.data.subjectId,
				status: res.data.data.status,
			});
		} catch (err) {
			setError('Failed to load grade-subject details');
		}
	};

	const handleUpdate = async (id) => {
		try {
			const res = await updateGradeSubject(id, editData);
			setGradeSubjects(
				gradeSubjects.map((gs) => (gs._id === id ? res.data.data : gs))
			);
			setSelectedGradeSubject(null);
			setEditData({ gradeId: '', subjectId: '', status: '' });
		} catch (err) {
			setError('Failed to update grade-subject');
		}
	};

	const handleDelete = async (id) => {
		if (
			window.confirm(
				'Are you sure you want to delete this grade-subject mapping?'
			)
		) {
			try {
				await deleteGradeSubject(id);
				setGradeSubjects(gradeSubjects.filter((gs) => gs._id !== id));
				setSelectedGradeSubject(null);
			} catch (err) {
				setError('Failed to delete grade-subject');
			}
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='grade-subjects'>
			<h1 className='text-2xl font-bold mb-6'>Manage Grade-Subjects</h1>
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>Grade ID</th>
							<th className='border px-4 py-2 text-left'>Subject ID</th>
							<th className='border px-4 py-2 text-left'>Status</th>
							<th className='border px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{gradeSubjects.map((gs) => (
							<tr key={gs._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{gs.gradeId}</td>
								<td className='border px-4 py-2'>{gs.subjectId}</td>
								<td className='border px-4 py-2'>{gs.status}</td>
								<td className='border px-4 py-2'>
									<button
										onClick={() => handleViewDetails(gs._id)}
										className='bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600'>
										View/Edit
									</button>
									<button
										onClick={() => handleDelete(gs._id)}
										className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedGradeSubject && (
				<div className='mt-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Grade-Subject Details</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleUpdate(selectedGradeSubject._id);
						}}
						className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade ID:
							</label>
							<input
								type='text'
								value={editData.gradeId}
								onChange={(e) =>
									setEditData({ ...editData, gradeId: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Subject ID:
							</label>
							<input
								type='text'
								value={editData.subjectId}
								onChange={(e) =>
									setEditData({ ...editData, subjectId: e.target.value })
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
								Update Grade-Subject
							</button>
							<button
								type='button'
								onClick={() => setSelectedGradeSubject(null)}
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

export default GradeSubjects;
