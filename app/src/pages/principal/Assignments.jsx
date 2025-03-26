import React, { useState, useEffect } from 'react';
import {
	getAllAssignments,
	createAssignment,
	updateAssignment,
	deleteAssignment,
} from '../../lib/axios'; // Adjust path to your api.js

const Assignments = () => {
	const [assignments, setAssignments] = useState([]);
	const [selectedAssignment, setSelectedAssignment] = useState(null);
	const [editData, setEditData] = useState({
		name: '', // Changed from title to match Assignment schema
		details: '', // Changed from description
		dueDate: '', // Added to match schema (assuming it’s in your Assignment model)
		maximumMark: '', // Added to match schema
	});
	const [newAssignmentData, setNewAssignmentData] = useState({
		name: '',
		gradeSubjectId: '', // Placeholder; fetch from GradeSubject API if needed
		teacherId: '', // Placeholder; fetch from Teacher API if needed
		details: '',
		maximumMark: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);

	// Fetch all assignments
	useEffect(() => {
		const fetchAssignments = async () => {
			try {
				setLoading(true);
				const res = await getAllAssignments();
				setAssignments(res.data.data);
			} catch (err) {
				setError('Failed to load assignments');
			} finally {
				setLoading(false);
			}
		};

		fetchAssignments();
	}, []);

	// View/Edit assignment details
	const handleViewDetails = (assignment) => {
		setSelectedAssignment(assignment);
		setEditData({
			name: assignment.name,
			details: assignment.details,
			dueDate: assignment.dueDate || '', // Add if part of schema
			maximumMark: assignment.maximumMark || '',
		});
	};

	// Update assignment
	const handleUpdate = async (id) => {
		try {
			const res = await updateAssignment(id, editData);
			setAssignments(
				assignments.map((assignment) =>
					assignment._id === id ? res.data.data : assignment
				)
			);
			setSelectedAssignment(null);
			setEditData({ name: '', details: '', dueDate: '', maximumMark: '' });
		} catch (err) {
			setError('Failed to update assignment');
		}
	};

	// Delete assignment
	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this assignment?')) {
			try {
				await deleteAssignment(id);
				setAssignments(
					assignments.filter((assignment) => assignment._id !== id)
				);
				setSelectedAssignment(null);
			} catch (err) {
				setError('Failed to delete assignment');
			}
		}
	};

	// Add new assignment
	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			const res = await createAssignment(newAssignmentData);
			setAssignments([...assignments, res.data.data]);
			setNewAssignmentData({
				name: '',
				gradeSubjectId: '',
				teacherId: '',
				details: '',
				maximumMark: '',
			});
			setShowAddForm(false);
		} catch (err) {
			setError('Failed to add assignment');
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='assignments'>
			<h1 className='text-2xl font-bold mb-6'>Manage Assignments</h1>
			<button
				onClick={() => setShowAddForm(!showAddForm)}
				className='bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600'>
				{showAddForm ? 'Cancel' : 'Add Assignment'}
			</button>

			{/* Add Assignment Form */}
			{showAddForm && (
				<div className='mb-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Add New Assignment</h2>
					<form onSubmit={handleAdd} className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name:
							</label>
							<input
								type='text'
								value={newAssignmentData.name}
								onChange={(e) =>
									setNewAssignmentData({
										...newAssignmentData,
										name: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade-Subject ID:
							</label>
							<input
								type='text'
								value={newAssignmentData.gradeSubjectId}
								onChange={(e) =>
									setNewAssignmentData({
										...newAssignmentData,
										gradeSubjectId: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Teacher ID:
							</label>
							<input
								type='text'
								value={newAssignmentData.teacherId}
								onChange={(e) =>
									setNewAssignmentData({
										...newAssignmentData,
										teacherId: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Details:
							</label>
							<textarea
								value={newAssignmentData.details}
								onChange={(e) =>
									setNewAssignmentData({
										...newAssignmentData,
										details: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Maximum Mark:
							</label>
							<input
								type='number'
								value={newAssignmentData.maximumMark}
								onChange={(e) =>
									setNewAssignmentData({
										...newAssignmentData,
										maximumMark: e.target.value,
									})
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<button
							type='submit'
							className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
							Add Assignment
						</button>
					</form>
				</div>
			)}

			{/* Assignments Table */}
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>Name</th>
							<th className='border px-4 py-2 text-left'>Due Date</th>
							<th className='border px-4 py-2 text-left'>Max Mark</th>
							<th className='border px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{assignments.map((assignment) => (
							<tr key={assignment._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{assignment.name}</td>
								<td className='border px-4 py-2'>
									{assignment.dueDate || 'N/A'}
								</td>
								<td className='border px-4 py-2'>{assignment.maximumMark}</td>
								<td className='border px-4 py-2'>
									<button
										onClick={() => handleViewDetails(assignment)}
										className='bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600'>
										View/Edit
									</button>
									<button
										onClick={() => handleDelete(assignment._id)}
										className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Edit Assignment Form */}
			{selectedAssignment && (
				<div className='mt-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Assignment Details</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleUpdate(selectedAssignment._id);
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
								Details:
							</label>
							<textarea
								value={editData.details}
								onChange={(e) =>
									setEditData({ ...editData, details: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Due Date:
							</label>
							<input
								type='date'
								value={editData.dueDate}
								onChange={(e) =>
									setEditData({ ...editData, dueDate: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Maximum Mark:
							</label>
							<input
								type='number'
								value={editData.maximumMark}
								onChange={(e) =>
									setEditData({ ...editData, maximumMark: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div className='flex space-x-3'>
							<button
								type='submit'
								className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
								Update Assignment
							</button>
							<button
								type='button'
								onClick={() => setSelectedAssignment(null)}
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

export default Assignments;
