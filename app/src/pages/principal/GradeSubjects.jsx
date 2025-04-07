import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
	getAllGradeSubjects,
	getGradeSubjectById,
	createGradeSubject,
	updateGradeSubject,
	deleteGradeSubject,
	getAllGrades,
	getAllSubjects,
} from '../../lib/axios';

const GradeSubjects = () => {
	const [gradeSubjects, setGradeSubjects] = useState([]);
	const [selectedGradeSubject, setSelectedGradeSubject] = useState(null);
	const [editData, setEditData] = useState({
		gradeId: null, // Use { value, label } object for react-select
		subjectId: null,
		status: 'Live',
	});
	const [newData, setNewData] = useState({
		gradeId: null,
		subjectId: null,
		status: 'Live',
	});
	const [gradeOptions, setGradeOptions] = useState([]);
	const [subjectOptions, setSubjectOptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);

	// Fetch all grade-subjects, grades, and subjects
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [gsRes, gradesRes, subjectsRes] = await Promise.all([
					getAllGradeSubjects(),
					getAllGrades(),
					getAllSubjects(),
				]);

				if (!gsRes.data.success)
					throw new Error(
						gsRes.data.message || 'Failed to fetch grade-subjects'
					);
				if (!gradesRes.data.success)
					throw new Error(gradesRes.data.message || 'Failed to fetch grades');
				if (!subjectsRes.data.success)
					throw new Error(
						subjectsRes.data.message || 'Failed to fetch subjects'
					);

				setGradeSubjects(gsRes.data.data);
				setGradeOptions(
					gradesRes.data.data.map((grade) => ({
						value: grade._id,
						label: grade.name,
					}))
				);
				setSubjectOptions(
					subjectsRes.data.data.map((subject) => ({
						value: subject._id,
						label: subject.name,
					}))
				);
			} catch (err) {
				setError(err.message || 'Failed to load data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Fetch and populate grade-subject details for editing
	const handleViewDetails = async (id) => {
		try {
			const res = await getGradeSubjectById(id);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to fetch grade-subject');
			const data = res.data.data;
			setSelectedGradeSubject(data);
			setEditData({
				gradeId: gradeOptions.find(
					(opt) => opt.value === data.gradeId._id.toString()
				) || {
					value: data.gradeId._id,
					label: data.gradeId.name,
				},
				subjectId: subjectOptions.find(
					(opt) => opt.value === data.subjectId._id.toString()
				) || {
					value: data.subjectId._id,
					label: data.subjectId.name,
				},
				status: data.status || 'Live',
			});
			setError(null);
		} catch (err) {
			setError(err.message || 'Failed to load grade-subject details');
		}
	};

	// Add new grade-subject
	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			if (!newData.gradeId || !newData.subjectId) {
				throw new Error('Grade and Subject are required');
			}
			const formattedData = {
				gradeId: newData.gradeId.value,
				subjectId: newData.subjectId.value,
				status: newData.status,
			};
			const res = await createGradeSubject(formattedData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to add grade-subject');
			setGradeSubjects([...gradeSubjects, res.data.data]);
			setNewData({ gradeId: null, subjectId: null, status: 'Live' });
			setShowAddForm(false);
			setError(null);
		} catch (err) {
			setError(err.message || 'Failed to add grade-subject');
		}
	};

	// Update grade-subject
	const handleUpdate = async (e, id) => {
		e.preventDefault();
		try {
			const formattedData = {
				gradeId: editData.gradeId.value,
				subjectId: editData.subjectId.value,
				status: editData.status,
			};
			const res = await updateGradeSubject(id, formattedData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to update grade-subject');
			setGradeSubjects(
				gradeSubjects.map((gs) => (gs._id === id ? res.data.data : gs))
			);
			setSelectedGradeSubject(null);
			setEditData({ gradeId: null, subjectId: null, status: 'Live' });
			setError(null);
		} catch (err) {
			setError(err.message || 'Failed to update grade-subject');
		}
	};

	// Delete grade-subject
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
				setEditData({ gradeId: null, subjectId: null, status: 'Live' });
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

			{/* Add Grade-Subject Form */}
			{showAddForm && (
				<div className='mb-8 bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						Add Grade-Subject
					</h2>
					<form onSubmit={handleAdd} className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade *
							</label>
							<Select
								options={gradeOptions}
								value={newData.gradeId}
								onChange={(selected) =>
									setNewData({ ...newData, gradeId: selected })
								}
								className='mt-1'
								placeholder='Select grade...'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Subject *
							</label>
							<Select
								options={subjectOptions}
								value={newData.subjectId}
								onChange={(selected) =>
									setNewData({ ...newData, subjectId: selected })
								}
								className='mt-1'
								placeholder='Select subject...'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Status
							</label>
							<select
								value={newData.status}
								onChange={(e) =>
									setNewData({ ...newData, status: e.target.value })
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
								Add
							</button>
							<button
								type='button'
								onClick={() => setShowAddForm(false)}
								className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors'>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Edit Grade-Subject Form */}
			{selectedGradeSubject && (
				<div className='mb-8 bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						Edit Grade-Subject
					</h2>
					<form
						onSubmit={(e) => handleUpdate(e, selectedGradeSubject._id)}
						className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade
							</label>
							<Select
								options={gradeOptions}
								value={editData.gradeId}
								onChange={(selected) =>
									setEditData({ ...editData, gradeId: selected })
								}
								className='mt-1'
								placeholder='Select grade...'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Subject
							</label>
							<Select
								options={subjectOptions}
								value={editData.subjectId}
								onChange={(selected) =>
									setEditData({ ...editData, subjectId: selected })
								}
								className='mt-1'
								placeholder='Select subject...'
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

			{/* Grade-Subjects Table */}
			{!selectedGradeSubject && !showAddForm && (
				<div className='bg-white p-6 rounded-lg shadow-lg'>
					<button
						onClick={() => setShowAddForm(true)}
						className='bg-blue-500 text-white px-6 py-2 rounded mb-6 hover:bg-blue-600 transition-colors'>
						Add Grade-Subject
					</button>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-200'>
								<th className='border px-6 py-3 text-left text-gray-700'>
									Grade
								</th>
								<th className='border px-6 py-3 text-left text-gray-700'>
									Subject
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
										{gradeOptions.find(
											(opt) => opt.value === gs.gradeId?._id?.toString()
										)?.label ||
											gs.gradeId?.name ||
											gs.gradeId?._id ||
											'N/A'}
									</td>
									<td className='border px-6 py-3'>
										{subjectOptions.find(
											(opt) => opt.value === gs.subjectId?._id?.toString()
										)?.label ||
											gs.subjectId?.name ||
											gs.subjectId?._id ||
											'N/A'}
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
			)}
		</div>
	);
};

export default GradeSubjects;
