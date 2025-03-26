import React, { useState, useEffect } from 'react';
import {
	getAllFees,
	addFee,
	updateFee,
	updateFeeStatus,
	deleteFee,
} from '../../lib/axios.js';

const Fees = () => {
	const [fees, setFees] = useState([]);
	const [selectedFee, setSelectedFee] = useState(null);
	const [editData, setEditData] = useState({
		feeName: '',
		gradeId: '', // Placeholder
		subjectId: '', // Placeholder
		teacherId: '', // Placeholder
		amount: '',
	});
	const [newFeeData, setNewFeeData] = useState({
		feeName: '',
		gradeId: '',
		subjectId: '',
		teacherId: '',
		amount: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);

	// Fetch all fees
	useEffect(() => {
		const fetchFees = async () => {
			try {
				setLoading(true);
				const res = await getAllFees();
				setFees(res.data.fees || res.data.data); // Adjust based on your API response
			} catch (err) {
				setError('Failed to load fees');
			} finally {
				setLoading(false);
			}
		};

		fetchFees();
	}, []);

	// View/Edit fee details
	const handleViewDetails = (fee) => {
		setSelectedFee(fee);
		setEditData({
			feeName: fee.feeName,
			gradeId: fee.gradeId?._id || fee.gradeId || '', // Handle populated data
			subjectId: fee.subjectId?._id || fee.subjectId || '',
			teacherId: fee.teacherId?._id || fee.teacherId || '',
			amount: fee.amount,
		});
	};

	// Update fee
	const handleUpdate = async (id) => {
		try {
			const res = await updateFee(id, editData);
			setFees(fees.map((fee) => (fee._id === id ? res.data.data : fee)));
			setSelectedFee(null);
			setEditData({
				feeName: '',
				gradeId: '',
				subjectId: '',
				teacherId: '',
				amount: '',
			});
		} catch (err) {
			setError('Failed to update fee');
		}
	};

	// Update fee status
	const handleUpdateStatus = async (id, newStatus) => {
		try {
			const res = await updateFeeStatus(id, newStatus);
			setFees(fees.map((fee) => (fee._id === id ? res.data.data : fee)));
		} catch (err) {
			setError('Failed to update fee status');
		}
	};

	// Delete fee
	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this fee?')) {
			try {
				await deleteFee(id);
				setFees(fees.filter((fee) => fee._id !== id));
				setSelectedFee(null);
			} catch (err) {
				setError('Failed to delete fee');
			}
		}
	};

	// Add new fee
	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			const res = await addFee(newFeeData);
			setFees([...fees, res.data.data]);
			setNewFeeData({
				feeName: '',
				gradeId: '',
				subjectId: '',
				teacherId: '',
				amount: '',
			});
			setShowAddForm(false);
		} catch (err) {
			setError('Failed to add fee');
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='fees'>
			<h1 className='text-2xl font-bold mb-6'>Fee Management</h1>
			<button
				onClick={() => setShowAddForm(!showAddForm)}
				className='bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600'>
				{showAddForm ? 'Cancel' : 'Add Fee'}
			</button>

			{/* Add Fee Form */}
			{showAddForm && (
				<div className='mb-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Add New Fee</h2>
					<form onSubmit={handleAdd} className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Fee Name:
							</label>
							<input
								type='text'
								value={newFeeData.feeName}
								onChange={(e) =>
									setNewFeeData({ ...newFeeData, feeName: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Grade ID:
							</label>
							<input
								type='text'
								value={newFeeData.gradeId}
								onChange={(e) =>
									setNewFeeData({ ...newFeeData, gradeId: e.target.value })
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
								value={newFeeData.subjectId}
								onChange={(e) =>
									setNewFeeData({ ...newFeeData, subjectId: e.target.value })
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
								value={newFeeData.teacherId}
								onChange={(e) =>
									setNewFeeData({ ...newFeeData, teacherId: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Amount:
							</label>
							<input
								type='number'
								value={newFeeData.amount}
								onChange={(e) =>
									setNewFeeData({ ...newFeeData, amount: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<button
							type='submit'
							className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
							Add Fee
						</button>
					</form>
				</div>
			)}

			{/* Fees Table */}
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>Fee Name</th>
							<th className='border px-4 py-2 text-left'>Grade</th>
							<th className='border px-4 py-2 text-left'>Subject</th>
							<th className='border px-4 py-2 text-left'>Teacher</th>
							<th className='border px-4 py-2 text-left'>Amount</th>
							<th className='border px-4 py-2 text-left'>Status</th>
							<th className='border px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{fees.map((fee) => (
							<tr key={fee._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{fee.feeName}</td>
								<td className='border px-4 py-2'>
									{fee.gradeId?.gradeName || fee.gradeId}
								</td>
								<td className='border px-4 py-2'>
									{fee.subjectId?.subjectName || fee.subjectId}
								</td>
								<td className='border px-4 py-2'>
									{fee.teacherId?.name || fee.teacherId}
								</td>
								<td className='border px-4 py-2'>{fee.amount}</td>
								<td className='border px-4 py-2'>{fee.status}</td>
								<td className='border px-4 py-2'>
									<button
										onClick={() => handleViewDetails(fee)}
										className='bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600'>
										View/Edit
									</button>
									<button
										onClick={() =>
											handleUpdateStatus(
												fee._id,
												fee.status === 'pending' ? 'paid' : 'pending'
											)
										}
										className='bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600'>
										Toggle Status
									</button>
									<button
										onClick={() => handleDelete(fee._id)}
										className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Edit Fee Form */}
			{selectedFee && (
				<div className='mt-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Fee Details</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleUpdate(selectedFee._id);
						}}
						className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Fee Name:
							</label>
							<input
								type='text'
								value={editData.feeName}
								onChange={(e) =>
									setEditData({ ...editData, feeName: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
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
								Teacher ID:
							</label>
							<input
								type='text'
								value={editData.teacherId}
								onChange={(e) =>
									setEditData({ ...editData, teacherId: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Amount:
							</label>
							<input
								type='number'
								value={editData.amount}
								onChange={(e) =>
									setEditData({ ...editData, amount: e.target.value })
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
								<option value='pending'>Pending</option>
								<option value='paid'>Paid</option>
								<option value='canceled'>Canceled</option>
							</select>
						</div>
						<div className='flex space-x-3'>
							<button
								type='submit'
								className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
								Update Fee
							</button>
							<button
								type='button'
								onClick={() => setSelectedFee(null)}
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

export default Fees;
