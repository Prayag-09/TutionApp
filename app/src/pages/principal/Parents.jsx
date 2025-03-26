
import React, { useState, useEffect } from 'react';
import {
	getAllParents,
	getParentById,
	deleteParent,
} from '../../lib/axios';

const Parents = () => {
	const [parents, setParents] = useState([]);
	const [selectedParent, setSelectedParent] = useState(null);
	const [editData, setEditData] = useState({ role: '' });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchParents = async () => {
			try {
				setLoading(true);
				const res = await getAllParents();
				setParents(res.data.data);
			} catch (err) {
				setError('Failed to load parents');
			} finally {
				setLoading(false);
			}
		};

		fetchParents();
	}, []);

	const handleViewDetails = async (id) => {
		try {
			const res = await getParentById(id);
			setSelectedParent(res.data.data);
			setEditData({ role: res.data.data.role || 'parent' });
		} catch (err) {
			setError('Failed to load parent details');
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this parent?')) {
			try {
				await deleteParent(id);
				setParents(parents.filter((parent) => parent._id !== id));
				setSelectedParent(null);
			} catch (err) {
				setError('Failed to delete parent');
			}
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='parents'>
			<h1 className='text-2xl font-bold mb-6'>Manage Parents</h1>
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>Name</th>
							<th className='border px-4 py-2 text-left'>Email</th>
							<th className='border px-4 py-2 text-left'>Role</th>
							<th className='border px-4 py-2 text-left'>Status</th>
							<th className='border px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{parents.map((parent) => (
							<tr key={parent._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{parent.name}</td>
								<td className='border px-4 py-2'>{parent.email}</td>
								<td className='border px-4 py-2'>{parent.role}</td>
								<td className='border px-4 py-2'>{parent.status}</td>
								<td className='border px-4 py-2'>
									<button
										onClick={() => handleViewDetails(parent._id)}
										className='bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600'>
										View/Edit Role
									</button>
									<button
										onClick={() => handleDelete(parent._id)}
										className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedParent && (
				<div className='mt-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Parent Details</h2>
					<p className='mb-2'>
						<strong>Name:</strong> {selectedParent.name}
					</p>
					<p className='mb-4'>
						<strong>Email:</strong> {selectedParent.email}
					</p>
				</div>
			)}
		</div>
	);
};

export default Parents;
