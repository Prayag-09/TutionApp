// pages/principal/Assignments.jsx
import React, { useState, useEffect } from 'react';

const Assignments = () => {
	const [assignments, setAssignments] = useState([]);
	const [selectedAssignment, setSelectedAssignment] = useState(null);
	const [editData, setEditData] = useState({
		title: '',
		description: '',
		dueDate: '',
		status: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Placeholder data (since no API endpoints exist for assignments)
	useEffect(() => {
		const fetchAssignments = async () => {
			try {
				setLoading(true);
				// Replace this with actual API call when available
				const mockAssignments = [
					{
						_id: '1',
						title: 'Math Assignment 1',
						description: 'Solve 10 problems',
						dueDate: '2025-04-01',
						status: 'Live',
					},
					{
						_id: '2',
						title: 'Science Assignment 1',
						description: 'Write a report',
						dueDate: '2025-04-05',
						status: 'Live',
					},
				];
				setAssignments(mockAssignments);
			} catch (err) {
				setError('Failed to load assignments');
			} finally {
				setLoading(false);
			}
		};

		fetchAssignments();
	}, []);

	const handleViewDetails = (assignment) => {
		setSelectedAssignment(assignment);
		setEditData({
			title: assignment.title,
			description: assignment.description,
			dueDate: assignment.dueDate,
			status: assignment.status,
		});
	};

	const handleUpdate = (id) => {
		// Replace this with actual API call when available
		const updatedAssignment = { _id: id, ...editData };
		setAssignments(
			assignments.map((assignment) =>
				assignment._id === id ? updatedAssignment : assignment
			)
		);
		setSelectedAssignment(null);
		setEditData({ title: '', description: '', dueDate: '', status: '' });
	};

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this assignment?')) {
			setAssignments(assignments.filter((assignment) => assignment._id !== id));
			setSelectedAssignment(null);
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='assignments'>
			<h1 className='text-2xl font-bold mb-6'>Manage Assignments</h1>
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>Title</th>
							<th className='border px-4 py-2 text-left'>Due Date</th>
							<th className='border px-4 py-2 text-left'>Status</th>
							<th className='border px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{assignments.map((assignment) => (
							<tr key={assignment._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{assignment.title}</td>
								<td className='border px-4 py-2'>{assignment.dueDate}</td>
								<td className='border px-4 py-2'>{assignment.status}</td>
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
								Title:
							</label>
							<input
								type='text'
								value={editData.title}
								onChange={(e) =>
									setEditData({ ...editData, title: e.target.value })
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
								Due Date:
							</label>
							<input
								type='date'
								value={editData.dueDate}
								onChange={(e) =>
									setEditData({ ...editData, dueDate: e.target.value })
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
							six
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
