import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
	getAllStudents,
	getStudentById,
	createStudent,
	deleteStudent,
	updateStudentStatus,
	getAllParents,
	getAllGrades,
	getAllSubjects,
	getAllTeachers, // For teacher options in subjects
} from '../../lib/axios';

const Students = () => {
	const [students, setStudents] = useState([]);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [editStatus, setEditStatus] = useState('');
	const [newStudentData, setNewStudentData] = useState({
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
		parentId: null, // { value, label } object
		gradeId: null, // { value, label } object
		subjects: [], // Array of { subjectId: { value, label }, teacherId: { value, label }, status }
		status: 'Live',
	});
	const [parentOptions, setParentOptions] = useState([]);
	const [gradeOptions, setGradeOptions] = useState([]);
	const [subjectOptions, setSubjectOptions] = useState([]);
	const [teacherOptions, setTeacherOptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);

	// Fetch all data
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [studentsRes, parentsRes, gradesRes, subjectsRes, teachersRes] =
					await Promise.all([
						getAllStudents(),
						getAllParents(),
						getAllGrades(),
						getAllSubjects(),
						getAllTeachers(),
					]);

				if (!studentsRes.data.success)
					throw new Error(
						studentsRes.data.message || 'Failed to fetch students'
					);
				if (!parentsRes.data.success)
					throw new Error(parentsRes.data.message || 'Failed to fetch parents');
				if (!gradesRes.data.success)
					throw new Error(gradesRes.data.message || 'Failed to fetch grades');
				if (!subjectsRes.data.success)
					throw new Error(
						subjectsRes.data.message || 'Failed to fetch subjects'
					);
				if (!teachersRes.data.success)
					throw new Error(
						teachersRes.data.message || 'Failed to fetch teachers'
					);

				setStudents(studentsRes.data.data);

				setParentOptions(
					parentsRes.data.data.map((p) => ({
						value: p._id,
						label: p.name,
					}))
				);
				setGradeOptions(
					gradesRes.data.data.map((g) => ({
						value: g._id,
						label: g.name,
					}))
				);
				setSubjectOptions(
					subjectsRes.data.data.map((s) => ({
						value: s._id,
						label: s.name,
					}))
				);
				setTeacherOptions(
					teachersRes.data.data.map((t) => ({
						value: t._id,
						label: t.name,
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

	// View student details and set status for editing
	const handleViewDetails = async (id) => {
		try {
			const res = await getStudentById(id);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to fetch student');
			const student = res.data.data;
			setSelectedStudent(student);
			setEditStatus(student.status);
		} catch (err) {
			setError(err.message || 'Failed to load student details');
		}
	};

	// Update student status
	const handleUpdateStatus = async (e, id) => {
		e.preventDefault();
		try {
			const res = await updateStudentStatus(id, editStatus);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to update student status');
			setStudents(
				students.map((student) =>
					student._id === id
						? { ...student, status: res.data.data.status }
						: student
				)
			);
			setSelectedStudent(null);
			setEditStatus('');
		} catch (err) {
			setError(err.message || 'Failed to update student status');
		}
	};

	// Delete student
	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this student?')) {
			try {
				const res = await deleteStudent(id);
				if (!res.data.success)
					throw new Error(res.data.message || 'Failed to delete student');
				setStudents(students.filter((student) => student._id !== id));
				setSelectedStudent(null);
			} catch (err) {
				setError(err.message || 'Failed to delete student');
			}
		}
	};

	// Add new student
	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			if (!newStudentData.parentId) throw new Error('Parent is required');
			if (!newStudentData.gradeId) throw new Error('Grade is required');
			if (!newStudentData.subjects.length)
				throw new Error('At least one subject is required');

			const formattedData = {
				...newStudentData,
				parentId: newStudentData.parentId.value,
				gradeId: newStudentData.gradeId.value,
				subjects: newStudentData.subjects.map((sub) => ({
					subjectId: sub.subjectId.value,
					teacherId: sub.teacherId.value,
					status: 'Live', // Default status for new subjects
				})),
			};
			const res = await createStudent(formattedData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to add student');
			setStudents([...students, res.data.data]);
			setNewStudentData({
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
				parentId: null,
				gradeId: null,
				subjects: [],
				status: 'Live',
			});
			setShowAddForm(false);
		} catch (err) {
			setError(err.message || 'Failed to add student');
		}
	};

	// Handle adding a new subject entry
	const handleAddSubject = () => {
		setNewStudentData({
			...newStudentData,
			subjects: [
				...newStudentData.subjects,
				{ subjectId: null, teacherId: null, status: 'Live' },
			],
		});
	};

	// Handle subject change
	const handleSubjectChange = (index, field, selectedOption) => {
		const updatedSubjects = [...newStudentData.subjects];
		updatedSubjects[index][field] = selectedOption;
		setNewStudentData({ ...newStudentData, subjects: updatedSubjects });
	};

	// Remove subject
	const handleRemoveSubject = (index) => {
		const updatedSubjects = newStudentData.subjects.filter(
			(_, i) => i !== index
		);
		setNewStudentData({ ...newStudentData, subjects: updatedSubjects });
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6 text-gray-800'>Manage Students</h1>
			<button
				onClick={() => setShowAddForm(!showAddForm)}
				className='bg-blue-500 text-white px-6 py-2 rounded mb-6 hover:bg-blue-600 transition-colors'>
				{showAddForm ? 'Cancel' : 'Add Student'}
			</button>

			{/* Add Student Form */}
			{showAddForm && (
				<div className='mb-8 bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						Add New Student
					</h2>
					<form onSubmit={handleAdd} className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name *
							</label>
							<input
								type='text'
								value={newStudentData.name}
								onChange={(e) =>
									setNewStudentData({ ...newStudentData, name: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Mobile (10 digits)
							</label>
							<input
								type='text'
								value={newStudentData.mobile}
								onChange={(e) =>
									setNewStudentData({
										...newStudentData,
										mobile: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								pattern='[0-9]{10}'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Email
							</label>
							<input
								type='email'
								value={newStudentData.email}
								onChange={(e) =>
									setNewStudentData({
										...newStudentData,
										email: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Password *
							</label>
							<input
								type='password'
								value={newStudentData.password}
								onChange={(e) =>
									setNewStudentData({
										...newStudentData,
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
								value={newStudentData.residentialAddress.address}
								onChange={(e) =>
									setNewStudentData({
										...newStudentData,
										residentialAddress: {
											...newStudentData.residentialAddress,
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
								value={newStudentData.residentialAddress.city}
								onChange={(e) =>
									setNewStudentData({
										...newStudentData,
										residentialAddress: {
											...newStudentData.residentialAddress,
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
								value={newStudentData.residentialAddress.state}
								onChange={(e) =>
									setNewStudentData({
										...newStudentData,
										residentialAddress: {
											...newStudentData.residentialAddress,
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
								value={newStudentData.residentialAddress.country}
								onChange={(e) =>
									setNewStudentData({
										...newStudentData,
										residentialAddress: {
											...newStudentData.residentialAddress,
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
								value={newStudentData.residentialAddress.zipCode}
								onChange={(e) =>
									setNewStudentData({
										...newStudentData,
										residentialAddress: {
											...newStudentData.residentialAddress,
											zipCode: e.target.value,
										},
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Parent *
							</label>
							<Select
								options={parentOptions}
								value={newStudentData.parentId}
								onChange={(selectedOption) =>
									setNewStudentData({
										...newStudentData,
										parentId: selectedOption,
									})
								}
								className='mt-1'
								placeholder='Select parent...'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade *
							</label>
							<Select
								options={gradeOptions}
								value={newStudentData.gradeId}
								onChange={(selectedOption) =>
									setNewStudentData({
										...newStudentData,
										gradeId: selectedOption,
									})
								}
								className='mt-1'
								placeholder='Select grade...'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Subjects *
							</label>
							{newStudentData.subjects.map((sub, index) => (
								<div key={index} className='flex space-x-4 mb-2'>
									<Select
										options={subjectOptions}
										value={sub.subjectId}
										onChange={(selectedOption) =>
											handleSubjectChange(index, 'subjectId', selectedOption)
										}
										className='flex-1'
										placeholder='Select subject...'
									/>
									<Select
										options={teacherOptions}
										value={sub.teacherId}
										onChange={(selectedOption) =>
											handleSubjectChange(index, 'teacherId', selectedOption)
										}
										className='flex-1'
										placeholder='Select teacher...'
									/>
									<button
										type='button'
										onClick={() => handleRemoveSubject(index)}
										className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>
										Remove
									</button>
								</div>
							))}
							<button
								type='button'
								onClick={handleAddSubject}
								className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
								Add Subject
							</button>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Status *
							</label>
							<select
								value={newStudentData.status}
								onChange={(e) =>
									setNewStudentData({
										...newStudentData,
										status: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required>
								<option value='Live'>Live</option>
								<option value='Archive'>Archive</option>
							</select>
						</div>
						<button
							type='submit'
							className='bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors'>
							Add Student
						</button>
					</form>
				</div>
			)}

			{/* Students Table */}
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
						{students.map((student) => (
							<tr
								key={student._id}
								className='hover:bg-gray-50 transition-colors'>
								<td className='border px-6 py-3'>{student.name}</td>
								<td className='border px-6 py-3'>{student.email || 'N/A'}</td>
								<td className='border px-6 py-3'>{student.mobile || 'N/A'}</td>
								<td className='border px-6 py-3'>{student.status}</td>
								<td className='border px-6 py-3 space-x-2'>
									<button
										onClick={() => handleViewDetails(student._id)}
										className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
										Edit Status
									</button>
									<button
										onClick={() => handleDelete(student._id)}
										className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Edit Student Status Form */}
			{selectedStudent && (
				<div className='mt-8 bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						Edit Student Status
					</h2>
					<form
						onSubmit={(e) => handleUpdateStatus(e, selectedStudent._id)}
						className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name
							</label>
							<input
								type='text'
								value={selectedStudent.name}
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
								value={selectedStudent.mobile || 'N/A'}
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
								value={selectedStudent.email || 'N/A'}
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
								value={selectedStudent.residentialAddress.address}
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
								value={selectedStudent.residentialAddress.city}
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
								value={selectedStudent.residentialAddress.state}
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
								value={selectedStudent.residentialAddress.country}
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
								value={selectedStudent.residentialAddress.zipCode || 'N/A'}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Parent
							</label>
							<input
								type='text'
								value={
									parentOptions.find(
										(p) => p.value === selectedStudent.parentId.toString()
									)?.label || selectedStudent.parentId
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade
							</label>
							<input
								type='text'
								value={
									gradeOptions.find(
										(g) => g.value === selectedStudent.gradeId.toString()
									)?.label || selectedStudent.gradeId
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2'
								disabled
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Subjects
							</label>
							<input
								type='text'
								value={
									selectedStudent.subjects
										.map((sub) => {
											const subjectLabel =
												subjectOptions.find(
													(s) => s.value === sub.subjectId.toString()
												)?.label || sub.subjectId;
											const teacherLabel =
												teacherOptions.find(
													(t) => t.value === sub.teacherId.toString()
												)?.label || sub.teacherId;
											return `${subjectLabel} (Teacher: ${teacherLabel})`;
										})
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
								onClick={() => setSelectedStudent(null)}
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

export default Students;
