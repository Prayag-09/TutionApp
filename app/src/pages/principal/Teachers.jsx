import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
	getAllTeachers,
	getTeacherById,
	createTeacher,
	deleteTeacher,
	updateTeacherStatus,
	getAllGradeSubjects,
	updateTeacher, // New API method for editing teacher details
} from '../../lib/axios';

const Teachers = () => {
	const [teachers, setTeachers] = useState([]);
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [editMode, setEditMode] = useState(false); // Track if in edit mode
	const [newTeacherData, setNewTeacherData] = useState({
		name: '',
		mobile: '',
		email: '',
		password: '',
		confirmPassword: '', // Added confirmPassword
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
	const [editTeacherData, setEditTeacherData] = useState(null); // For editing existing teacher
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

				if (!teachersRes.data.success)
					throw new Error(
						teachersRes.data.message || 'Failed to fetch teachers'
					);
				if (!gradeSubjectsRes.data.success)
					throw new Error(
						gradeSubjectsRes.data.message || 'Failed to fetch grade-subjects'
					);

				setTeachers(teachersRes.data.data);
				setGradeSubjectOptions(
					gradeSubjectsRes.data.data.map((gs) => ({
						value: gs._id,
						label: `${gs.gradeId.name} - ${gs.subjectId.name}`,
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

	// View/edit teacher details
	const handleViewDetails = async (id, isEdit = false) => {
		try {
			const res = await getTeacherById(id);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to fetch teacher');
			const teacher = res.data.data;
			setSelectedTeacher(teacher);
			if (isEdit) {
				setEditMode(true);
				setEditTeacherData({
					...teacher,
					gradeSubjects: teacher.gradeSubjects.map((gs) =>
						gradeSubjectOptions.find((opt) => opt.value === gs.gradeSubjectId)
					),
				});
			}
		} catch (err) {
			setError(err.message || 'Failed to load teacher details');
		}
	};

	// Update teacher status
	const handleUpdateStatus = async (e, id) => {
		e.preventDefault();
		try {
			const res = await updateTeacherStatus(id, editTeacherData.status);
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
			setEditMode(false);
		} catch (err) {
			setError(err.message || 'Failed to update teacher status');
		}
	};

	// Update teacher details
	const handleUpdateTeacher = async (e) => {
		e.preventDefault();
		try {
			const formattedData = {
				...editTeacherData,
				gradeSubjects: editTeacherData.gradeSubjects.map((option) => ({
					gradeSubjectId: option.value,
				})),
			};
			const res = await updateTeacher(selectedTeacher._id, formattedData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to update teacher');
			setTeachers(
				teachers.map((teacher) =>
					teacher._id === selectedTeacher._id ? res.data.data : teacher
				)
			);
			setSelectedTeacher(null);
			setEditMode(false);
			setEditTeacherData(null);
			setError(null);
		} catch (err) {
			setError(err.message || 'Failed to update teacher');
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
			if (newTeacherData.password !== newTeacherData.confirmPassword) {
				throw new Error('Passwords do not match');
			}
			if (!newTeacherData.gradeSubjects.length) {
				throw new Error('At least one grade-subject is required');
			}

			const formattedData = {
				...newTeacherData,
				gradeSubjects: newTeacherData.gradeSubjects.map((option) => ({
					gradeSubjectId: option.value,
				})),
			};
			const res = await createTeacher(formattedData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to add  teacher');
			setTeachers([...teachers, res.data.data]);
			setNewTeacherData({
				name: '',
				mobile: '',
				email: '',
				password: '',
				confirmPassword: '',
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
			setError(null);
		} catch (err) {
			setError(err.message || 'Failed to add teacher');
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6 text-gray-800'>Manage Teachers</h1>
			{!selectedTeacher && !showAddForm && (
				<button
					onClick={() => setShowAddForm(true)}
					className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-6'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						viewBox='0 0 20 20'
						fill='currentColor'>
						<path
							fillRule='evenodd'
							d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
							clipRule='evenodd'
						/>
					</svg>
					Add Teacher
				</button>
			)}

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
								Confirm Password *
							</label>
							<input
								type='password'
								value={newTeacherData.confirmPassword}
								onChange={(e) =>
									setNewTeacherData({
										...newTeacherData,
										confirmPassword: e.target.value,
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
						<div className='flex space-x-4'>
							<button
								type='submit'
								className='bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors'>
								Add Teacher
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

			{/* Edit Teacher Form (Moved to Top) */}
			{selectedTeacher && (
				<div className='mb-8 bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						{editMode ? 'Edit Teacher Details' : 'Edit Teacher Status'}
					</h2>
					<form
						onSubmit={
							editMode
								? handleUpdateTeacher
								: (e) => handleUpdateStatus(e, selectedTeacher._id)
						}
						className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name
							</label>
							<input
								type='text'
								value={editMode ? editTeacherData.name : selectedTeacher.name}
								onChange={(e) =>
									editMode &&
									setEditTeacherData({
										...editTeacherData,
										name: e.target.value,
									})
								}
								className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
									editMode
										? 'focus:ring-blue-500 focus:border-blue-500'
										: 'bg-gray-100'
								}`}
								disabled={!editMode}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Mobile
							</label>
							<input
								type='text'
								value={
									editMode ? editTeacherData.mobile : selectedTeacher.mobile
								}
								onChange={(e) =>
									editMode &&
									setEditTeacherData({
										...editTeacherData,
										mobile: e.target.value,
									})
								}
								className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
									editMode
										? 'focus:ring-blue-500 focus:border-blue-500'
										: 'bg-gray-100'
								}`}
								disabled={!editMode}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Email
							</label>
							<input
								type='email'
								value={editMode ? editTeacherData.email : selectedTeacher.email}
								onChange={(e) =>
									editMode &&
									setEditTeacherData({
										...editTeacherData,
										email: e.target.value,
									})
								}
								className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
									editMode
										? 'focus:ring-blue-500 focus:border-blue-500'
										: 'bg-gray-100'
								}`}
								disabled={!editMode}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Address
							</label>
							<input
								type='text'
								value={
									editMode
										? editTeacherData.residentialAddress.address
										: selectedTeacher.residentialAddress.address
								}
								onChange={(e) =>
									editMode &&
									setEditTeacherData({
										...editTeacherData,
										residentialAddress: {
											...editTeacherData.residentialAddress,
											address: e.target.value,
										},
									})
								}
								className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
									editMode
										? 'focus:ring-blue-500 focus:border-blue-500'
										: 'bg-gray-100'
								}`}
								disabled={!editMode}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								City
							</label>
							<input
								type='text'
								value={
									editMode
										? editTeacherData.residentialAddress.city
										: selectedTeacher.residentialAddress.city
								}
								onChange={(e) =>
									editMode &&
									setEditTeacherData({
										...editTeacherData,
										residentialAddress: {
											...editTeacherData.residentialAddress,
											city: e.target.value,
										},
									})
								}
								className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
									editMode
										? 'focus:ring-blue-500 focus:border-blue-500'
										: 'bg-gray-100'
								}`}
								disabled={!editMode}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								State
							</label>
							<input
								type='text'
								value={
									editMode
										? editTeacherData.residentialAddress.state
										: selectedTeacher.residentialAddress.state
								}
								onChange={(e) =>
									editMode &&
									setEditTeacherData({
										...editTeacherData,
										residentialAddress: {
											...editTeacherData.residentialAddress,
											state: e.target.value,
										},
									})
								}
								className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
									editMode
										? 'focus:ring-blue-500 focus:border-blue-500'
										: 'bg-gray-100'
								}`}
								disabled={!editMode}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Country
							</label>
							<input
								type='text'
								value={
									editMode
										? editTeacherData.residentialAddress.country
										: selectedTeacher.residentialAddress.country
								}
								onChange={(e) =>
									editMode &&
									setEditTeacherData({
										...editTeacherData,
										residentialAddress: {
											...editTeacherData.residentialAddress,
											country: e.target.value,
										},
									})
								}
								className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
									editMode
										? 'focus:ring-blue-500 focus:border-blue-500'
										: 'bg-gray-100'
								}`}
								disabled={!editMode}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Zip Code
							</label>
							<input
								type='text'
								value={
									editMode
										? editTeacherData.residentialAddress.zipCode || ''
										: selectedTeacher.residentialAddress.zipCode || 'N/A'
								}
								onChange={(e) =>
									editMode &&
									setEditTeacherData({
										...editTeacherData,
										residentialAddress: {
											...editTeacherData.residentialAddress,
											zipCode: e.target.value,
										},
									})
								}
								className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
									editMode
										? 'focus:ring-blue-500 focus:border-blue-500'
										: 'bg-gray-100'
								}`}
								disabled={!editMode}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Qualification
							</label>
							<input
								type='text'
								value={
									editMode
										? editTeacherData.qualification || ''
										: selectedTeacher.qualification || 'N/A'
								}
								onChange={(e) =>
									editMode &&
									setEditTeacherData({
										...editTeacherData,
										qualification: e.target.value,
									})
								}
								className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 ${
									editMode
										? 'focus:ring-blue-500 focus:border-blue-500'
										: 'bg-gray-100'
								}`}
								disabled={!editMode}
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade-Subjects
							</label>
							{editMode ? (
								<Select
									isMulti
									options={gradeSubjectOptions}
									value={editTeacherData.gradeSubjects}
									onChange={(selectedOptions) =>
										setEditTeacherData({
											...editTeacherData,
											gradeSubjects: selectedOptions || [],
										})
									}
									className='mt-1'
									placeholder='Select grade-subjects...'
								/>
							) : (
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
							)}
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Status
							</label>
							<select
								value={
									editMode
										? editTeacherData.status
										: editTeacherData?.status || selectedTeacher.status
								}
								onChange={(e) =>
									editMode
										? setEditTeacherData({
												...editTeacherData,
												status: e.target.value,
										  })
										: setEditTeacherData({
												...editTeacherData,
												status: e.target.value,
										  })
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
								{editMode ? 'Update Teacher' : 'Update Status'}
							</button>
							<button
								type='button'
								onClick={() => {
									setSelectedTeacher(null);
									setEditMode(false);
									setEditTeacherData(null);
								}}
								className='bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors'>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Teachers Table (Hidden when editing or adding) */}
			{!selectedTeacher && !showAddForm && (
				<div className='bg-white p-6 rounded-lg shadow-lg'>
					<table className='min-w-full border-collapse'>
						<thead>
							<tr className='bg-gray-200'>
								<th className='border px-6 py-3 text-left text-gray-700'>
									Name
								</th>
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
									className='hover:bg-gray-50 transition-colors even:bg-gray-50/50'>
									<td className='border px-6 py-3 font-medium text-gray-700'>
										{teacher.name}
									</td>
									<td className='border px-6 py-3 text-gray-600'>
										{teacher.email}
									</td>
									<td className='border px-6 py-3 text-gray-600'>
										{teacher.mobile}
									</td>
									<td className='border px-6 py-3'>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${
												teacher.status === 'Active'
													? 'bg-green-100 text-green-800'
													: 'bg-red-100 text-red-800'
											}`}>
											{teacher.status}
										</span>
									</td>
									<td className='border px-6 py-3 space-x-2'>
										<button
											onClick={() => handleViewDetails(teacher._id, false)}
											className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
											Edit Status
										</button>
										<button
											onClick={() => handleViewDetails(teacher._id, true)}
											className='bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'>
											Edit Details
										</button>
										<button
											onClick={() => handleDelete(teacher._id)}
											className='bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors focus:ring-2 focus:ring-rose-500 focus:ring-offset-2'>
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

export default Teachers;
