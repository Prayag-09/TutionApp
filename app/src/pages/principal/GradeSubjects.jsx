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
				if (!res.data.success)
					throw new Error(res.data.message || 'Failed to fetch grade-subjects');
				setGradeSubjects(res.data.data);
			} catch (err) {
				setError(err.message || 'Failed to load grade-subjects');
			} finally {
				setLoading(false);
			}
		};

		fetchGradeSubjects();
	}, []);

	const handleViewDetails = async (id) => {
		try {
			const res = await getGradeSubjectById(id);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to fetch grade-subject');
			const data = res.data.data;
			setSelectedGradeSubject(data);
			setEditData({
				gradeId: data.gradeId.toString(), // Convert ObjectId to string
				subjectId: data.subjectId.toString(), // Convert ObjectId to string
				status: data.status,
			});
		} catch (err) {
			setError(err.message || 'Failed to load grade-subject details');
		}
	};

	const handleUpdate = async (e, id) => {
		e.preventDefault();
		try {
			const res = await updateGradeSubject(id, editData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to update grade-subject');
			setGradeSubjects(
				gradeSubjects.map((gs) => (gs._id === id ? res.data.data : gs))
			);
			setSelectedGradeSubject(null);
			setEditData({ gradeId: '', subjectId: '', status: '' });
		} catch (err) {
			setError(err.message || 'Failed to update grade-subject');
		}
	};

	const handleDelete = async (id) => {
		if (
			window.confirm(
				'Are you sure you want to delete this grade-subject mapping?'
			)
		) {
			try {
				const res = await deleteGradeSubject(id);
				if (!res.data.success)
					throw new Error(res.data.message || 'Failed to delete grade-subject');
				setGradeSubjects(gradeSubjects.filter((gs) => gs._id !== id));
				setSelectedGradeSubject(null);
			} catch (err) {
				setError(err.message || 'Failed to delete grade-subject');
			}
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6 text-gray-800'>
				Manage Grade-Subjects
			</h1>
			<div className='bg-white p-6 rounded-lg shadow-lg'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-200'>
							<th className='border px-6 py-3 text-left text-gray-700'>
								Grade ID
							</th>
							<th className='border px-6 py-3 text-left text-gray-700'>
								Subject ID
							</th>
							<th className='border px-6 py-3 text-left text-gray-700'>
								Status
							</th>
							<th className='border px-6 py-3 text-left text-gray-700'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{gradeSubjects.map((gs) => (
							<tr key={gs._id} className='hover:bg-gray-50 transition-colors'>
								<td className='border px-6 py-3'>
									{gs.gradeId?.name || gs.gradeId?._id || 'N/A'}
								</td>
								<td className='border px-6 py-3'>
									{gs.subjectId?.name || gs.subjectId?._id || 'N/A'}
								</td>
								<td className='border px-6 py-3'>{gs.status}</td>
								<td className='border px-6 py-3 space-x-2'>
									<button
										onClick={() => handleViewDetails(gs._id)}
										className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
										Edit
									</button>
									<button
										onClick={() => handleDelete(gs._id)}
										className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedGradeSubject && (
				<div className='mt-8 bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						Edit Grade-Subject
					</h2>
					<form
						onSubmit={(e) => handleUpdate(e, selectedGradeSubject._id)}
						className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade ID
							</label>
							<input
								type='text'
								value={editData.gradeId}
								onChange={(e) =>
									setEditData({ ...editData, gradeId: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Subject ID
							</label>
							<input
								type='text'
								value={editData.subjectId}
								onChange={(e) =>
									setEditData({ ...editData, subjectId: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
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
								onClick={() => setSelectedGradeSubject(null)}
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

export default GradeSubjects;
