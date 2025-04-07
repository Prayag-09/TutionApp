import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
	getAllGrades,
	getGradeById,
	updateGrade,
	deleteGrade,
	getAllSubjects,
} from '../../lib/axios';

const Grades = () => {
	const [grades, setGrades] = useState([]);
	const [selectedGrade, setSelectedGrade] = useState(null);
	const [editData, setEditData] = useState({
		name: '',
		description: '',
		status: 'Live',
		subjects: [],
	});
	const [subjectOptions, setSubjectOptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch grades and subjects on mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [gradesRes, subjectsRes] = await Promise.all([
					getAllGrades(),
					getAllSubjects(),
				]);

				if (!gradesRes.data.success || !subjectsRes.data.success) {
					throw new Error('Failed to fetch grades or subjects');
				}

				setGrades(gradesRes.data.data);

				const options = subjectsRes.data.data.map((subject) => ({
					value: subject._id,
					label: subject.name,
				}));

				setSubjectOptions(options);
			} catch (err) {
				setError(err.message || 'Failed to load data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Fetch and populate grade details for editing
	const handleViewDetails = async (id) => {
		try {
			const res = await getGradeById(id);
			if (!res.data.success) throw new Error(res.data.message);

			const gradeData = res.data.data;

			const formattedSubjects = gradeData.subjects.map((sub) => {
				const match = subjectOptions.find((opt) => opt.value === sub.subjectId);
				return {
					value: sub.subjectId,
					label: match ? match.label : 'Unknown',
					status: sub.status || 'Live',
				};
			});

			setEditData({
				name: gradeData.name || '',
				description: gradeData.description || '',
				status: gradeData.status || 'Live',
				subjects: formattedSubjects,
			});

			setSelectedGrade(gradeData);
			setError(null);
		} catch (err) {
			setError(err.message || 'Failed to load grade details');
		}
	};

	// Update grade
	const handleUpdate = async (e, id) => {
		e.preventDefault();
		try {
			const formattedSubjects = editData.subjects.map((sub) => ({
				subjectId: sub.value,
				status: sub.status || 'Live',
			}));

			const res = await updateGrade(id, {
				name: editData.name,
				description: editData.description,
				status: editData.status,
				subjects: formattedSubjects,
			});

			if (!res.data.success) throw new Error(res.data.message);

			setGrades(
				grades.map((grade) => (grade._id === id ? res.data.data : grade))
			);
			handleCancel();
		} catch (err) {
			setError(err.message || 'Failed to update grade');
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this grade?')) return;
		try {
			const res = await deleteGrade(id);
			if (!res.data.success) throw new Error(res.data.message);

			setGrades(grades.filter((grade) => grade._id !== id));
			handleCancel();
		} catch (err) {
			setError(err.message || 'Failed to delete grade');
		}
	};

	const handleCancel = () => {
		setSelectedGrade(null);
		setEditData({ name: '', description: '', status: 'Live', subjects: [] });
		setError(null);
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6 text-gray-800'>Manage Grades</h1>

			{!selectedGrade && (
				<div className='bg-white p-6 rounded-lg shadow-lg'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-200'>
								<th className='border px-6 py-3 text-left text-gray-700'>
									Name
								</th>
								<th className='border px-6 py-3 text-left text-gray-700'>
									Status
								</th>
								<th className='border px-6 py-3 text-left text-gray-700'>
									Subjects
								</th>
								<th className='border px-6 py-3 text-left text-gray-700'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{grades.map((grade) => (
								<tr key={grade._id} className='hover:bg-gray-50 transition'>
									<td className='border px-6 py-3'>{grade.name}</td>
									<td className='border px-6 py-3'>{grade.status}</td>
									<td className='border px-6 py-3'>
										{grade.subjects
											.map((sub) => {
												const match = subjectOptions.find(
													(opt) =>
														opt.value === (sub.subjectId._id || sub.subjectId)
												);
												return match?.label || sub.subjectId;
											})
											.join(', ') || 'None'}
									</td>
									<td className='border px-6 py-3 space-x-2'>
										<button
											onClick={() => handleViewDetails(grade._id)}
											className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
											Edit
										</button>
										<button
											onClick={() => handleDelete(grade._id)}
											className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{selectedGrade && (
				<div className='bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						Edit Grade
					</h2>
					<form
						onSubmit={(e) => handleUpdate(e, selectedGrade._id)}
						className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name *
							</label>
							<input
								type='text'
								value={editData.name}
								onChange={(e) =>
									setEditData({ ...editData, name: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2'
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
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2'
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
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2'>
								<option value='Live'>Live</option>
								<option value='Archive'>Archive</option>
							</select>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Subjects
							</label>
							<Select
								isMulti
								options={subjectOptions}
								value={editData.subjects}
								onChange={(selectedOptions) =>
									setEditData({
										...editData,
										subjects: selectedOptions.map((opt) => ({
											value: opt.value,
											label: opt.label,
											status:
												editData.subjects.find((s) => s.value === opt.value)
													?.status || 'Live',
										})),
									})
								}
								className='mt-1'
								placeholder='Select subjects...'
							/>
						</div>
						<div className='flex space-x-4'>
							<button
								type='submit'
								className='bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600'>
								Update
							</button>
							<button
								type='button'
								onClick={handleCancel}
								className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600'>
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
