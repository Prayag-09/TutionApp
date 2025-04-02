import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
	getAllTeachers,
	getTeacherById,
	createTeacher,
	deleteTeacher,
	updateTeacherStatus,
	getAllGradeSubjects,
} from '../../lib/axios';

const Teachers = () => {
	const [teachers, setTeachers] = useState([]);
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [editStatus, setEditStatus] = useState('');
	const [newTeacherData, setNewTeacherData] = useState({
		name: '',
		mobile: '',
		email: '',
		password: '',
		residentialAddress: {
			address: '',
			city: '',
			state: '',
			country: '',
			zipCode: '',
		},
		qualification: '',
		status: 'Live',
		gradeSubjects: [], // Array of { value, label } objects from react-select
	});
	const [gradeSubjectOptions, setGradeSubjectOptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);

	// Fetch all teachers and grade-subjects
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [teachersRes, gradeSubjectsRes] = await Promise.all([
					getAllTeachers(),
					getAllGradeSubjects(),
				]);

				if (!teachersRes.data.success) {
					throw new Error(
						teachersRes.data.message || 'Failed to fetch teachers'
					);
				}
				if (!gradeSubjectsRes.data.success) {
					throw new Error(
						gradeSubjectsRes.data.message || 'Failed to fetch grade-subjects'
					);
				}

				setTeachers(teachersRes.data.data);

				// Format grade-subject options for react-select
				const options = gradeSubjectsRes.data.data.map((gs) => ({
					value: gs._id, // gradeSubjectId
					label: `${gs.gradeId.name} - ${gs.subjectId.name}`, // e.g., "Grade 1 - Mathematics"
				}));
				setGradeSubjectOptions(options);
			} catch (err) {
				setError(err.message || 'Failed to load data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// View teacher details and set status for editing
	const handleViewDetails = async (id) => {
		try {
			const res = await getTeacherById(id);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to fetch teacher');
			const teacher = res.data.data;
			setSelectedTeacher(teacher);
			setEditStatus(teacher.status);
		} catch (err) {
			setError(err.message || 'Failed to load teacher details');
		}
	};

	// Update teacher status
	const handleUpdateStatus = async (e, id) => {
		e.preventDefault();
		try {
			const res = await updateTeacherStatus(id, editStatus);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to update teacher status');
			setTeachers(
				teachers.map((teacher) =>
					teacher._id === id
						? { ...teacher, status: res.data.data.status }
						: teacher
				)
			);
			setSelectedTeacher(null);
			setEditStatus('');
		} catch (err) {
			setError(err.message || 'Failed to update teacher status');
		}
	};

	// Delete teacher
	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this teacher?')) {
			try {
				const res = await deleteTeacher(id);
				if (!res.data.success)
					throw new Error(res.data.message || 'Failed to delete teacher');
				setTeachers(teachers.filter((teacher) => teacher._id !== id));
				setSelectedTeacher(null);
			} catch (err) {
				setError(err.message || 'Failed to delete teacher');
			}
		}
	};

	// Add new teacher
	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			if (!newTeacherData.gradeSubjects.length) {
				throw new Error('At least one grade-subject is required');
			}

			const formattedData = {
				...newTeacherData,
				gradeSubjects: newTeacherData.gradeSubjects.map((option) => ({
					gradeSubjectId: option.value, // Format as [{ gradeSubjectId: "id" }, ...]
				})),
			};
			const res = await createTeacher(formattedData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to add teacher');
			setTeachers([...teachers, res.data.data]);
			setNewTeacherData({
				name: '',
				mobile: '',
				email: '',
				password: '',
				residentialAddress: {
					address: '',
					city: '',
					state: '',
					country: '',
					zipCode: '',
				},
				qualification: '',
				status: 'Live',
				gradeSubjects: [],
			});
			setShowAddForm(false);
		} catch (err) {
			setError(err.message || 'Failed to add teacher');
			console.error('Error details:', err.response?.data); // Log detailed error from backend
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6 text-gray-800'>Manage Teachers</h1>
			<button
				onClick={() => setShowAddForm(!showAddForm)}
				className='bg-blue-500 text-white px-6 py-2 rounded mb-6 hover:bg-blue-600 transition-colors'>
				{showAddForm ? 'Cancel' : 'Add Teacher'}
			</button>

			{/* Add Teacher Form */}
			{showAddForm && (
				<div className='mb-8 bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						Add New Teacher
					</h2>
					<form onSubmit={handleAdd} className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name *
							</label>
							<input
								type='text'
								value={newTeacherData.name}
								onChange={(e) =>
									setNewTeacherData({ ...newTeacherData, name: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Mobile (10 digits) *
							</label>
							<input
								type='text'
								value={newTeacherData.mobile}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										mobile: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								pattern='[0-9]{10}'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Email *
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
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Password *
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
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Address *
							</label>
							<input
								type='text'
								value={newTeacherData.residentialAddress.address}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										residentialAddress: {
											...newTeacherData.residentialAddress,
											address: e.target.value,
										},
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								City *
							</label>
							<input
								type='text'
								value={newTeacherData.residentialAddress.city}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										residentialAddress: {
											...newTeacherData.residentialAddress,
											city: e.target.value,
										},
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								State *
							</label>
							<input
								type='text'
								value={newTeacherData.residentialAddress.state}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										residentialAddress: {
											...newTeacherData.residentialAddress,
											state: e.target.value,
										},
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Country *
							</label>
							<input
								type='text'
								value={newTeacherData.residentialAddress.country}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										residentialAddress: {
											...newTeacherData.residentialAddress,
											country: e.target.value,
										},
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Zip Code
							</label>
							<input
								type='text'
								value={newTeacherData.residentialAddress.zipCode}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										residentialAddress: {
											...newTeacherData.residentialAddress,
											zipCode: e.target.value,
										},
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Qualification
							</label>
							<input
								type='text'
								value={newTeacherData.qualification}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										qualification: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Status *
							</label>
							<select
								value={newTeacherData.status}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										status: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required>
								<option value='Live'>Live</option>
								<option value='Archive'>Archive</option>
							</select>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade-Subjects *
							</label>
							<Select
								isMulti
								options={gradeSubjectOptions}
								value={newTeacherData.gradeSubjects}
								onChange={(selectedOptions) =>
									setNewTeacherData({
										...newTeacherData,
										gradeSubjects: selectedOptions || [],
									})
								}
								className='mt-1'
								placeholder='Select grade-subjects...'
							/>
						</div>
						<button
							type='submit'
							className='bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors'>
							Add Teacher
						</button>
					</form>
				</div>
			)}

			{/* Teachers Table */}
			<div className='bg-white p-6 rounded-lg shadow-lg'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-200'>
							<th className='border px-6 py-3 text-left text-gray-700'>Name</th>
							<th className='border px-6 py-3 text-left text-gray-700'>
								Email
							</th>
							<th className='border px-6 py-3 text-left text-gray-700'>
								Mobile
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
						{teachers.map((teacher) => (
							<tr
								key={teacher._id}
								className='hover:bg-gray-50 transition-colors'>
								<td className='border px-6 py-3'>{teacher.name}</td>
								<td className='border px-6 py-3'>{teacher.email}</td>
								<td className='border px-6 py-3'>{teacher.mobile}</td>
								<td className='border px-6 py-3'>{teacher.status}</td>
								<td className='border px-6 py-3 space-x-2'>
									<button
										onClick={() => handleViewDetails(teacher._id)}
										className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
										Edit Status
									</button>
									<button
										onClick={() => handleDelete(teacher._id)}
										className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Edit Teacher Status Form */}
			{selectedTeacher && (
				<div className='mt-8 bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						Edit Teacher Status
					</h2>
					<form
						onSubmit={(e) => handleUpdateStatus(e, selectedTeacher._id)}
						className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name
							</label>
							<input
								type='text'
								value={selectedTeacher.name}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Mobile
							</label>
							<input
								type='text'
								value={selectedTeacher.mobile}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Email
							</label>
							<input
								type='email'
								value={selectedTeacher.email}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Address
							</label>
							<input
								type='text'
								value={selectedTeacher.residentialAddress.address}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								City
							</label>
							<input
								type='text'
								value={selectedTeacher.residentialAddress.city}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								State
							</label>
							<input
								type='text'
								value={selectedTeacher.residentialAddress.state}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Country
							</label>
							<input
								type='text'
								value={selectedTeacher.residentialAddress.country}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Zip Code
							</label>
							<input
								type='text'
								value={selectedTeacher.residentialAddress.zipCode || 'N/A'}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Qualification
							</label>
							<input
								type='text'
								value={selectedTeacher.qualification || 'N/A'}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade-Subjects
							</label>
							<input
								type='text'
								value={
									selectedTeacher.gradeSubjects
										.map(
											(gs) =>
												gradeSubjectOptions.find(
													(opt) => opt.value === gs.gradeSubjectId
												)?.label || gs.gradeSubjectId
										)
										.join(', ') || 'None'
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Status
							</label>
							<select
								value={editStatus}
								onChange={(e) => setEditStatus(e.target.value)}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'>
								<option value='Live'>Live</option>
								<option value='Archive'>Archive</option>
							</select>
						</div>
						<div className='flex space-x-4'>
							<button
								type='submit'
								className='bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors'>
								Update Status
							</button>
							<button
								type='button'
								onClick={() => setSelectedTeacher(null)}
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

export default Teachers;
