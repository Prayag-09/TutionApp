// pages/principal/Fees.jsx
import React, { useState, useEffect } from 'react';
import {
	getAllFees,
	updateFee,
	updateFeeStatus,
	deleteFee,
} from '../../lib/axios';

const Fees = () => {
	const [fees, setFees] = useState([]);
	const [selectedFee, setSelectedFee] = useState(null);
	const [editData, setEditData] = useState({
		amount: '',
		dueDate: '',
		status: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFees = async () => {
			try {
				setLoading(true);
				const res = await getAllFees();
				setFees(res.data.data);
			} catch (err) {
				setError('Failed to load fees');
			} finally {
				setLoading(false);
			}
		};

		fetchFees();
	}, []);

	const handleViewDetails = (fee) => {
		setSelectedFee(fee);
		setEditData({
			amount: fee.amount,
			dueDate: fee.dueDate,
			status: fee.status,
		});
	};

	const handleUpdate = async (id) => {
		try {
			const res = await updateFee(id, editData);
			setFees(fees.map((fee) => (fee._id === id ? res.data.data : fee)));
			setSelectedFee(null);
			setEditData({ amount: '', dueDate: '', status: '' });
		} catch (err) {
			setError('Failed to update fee');
		}
	};

	const handleUpdateStatus = async (id, newStatus) => {
		try {
			const res = await updateFeeStatus(id, newStatus);
			setFees(fees.map((fee) => (fee._id === id ? res.data.data : fee)));
		} catch (err) {
			setError('Failed to update fee status');
		}
	};

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

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='fees'>
			<h1 className='text-2xl font-bold mb-6'>Fee Management</h1>
			<div className='bg-white p-6 rounded-lg shadow-md'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>Student ID</th>
							<th className='border px-4 py-2 text-left'>Amount</th>
							<th className='border px-4 py-2 text-left'>Due Date</th>
							<th className='border px-4 py-2 text-left'>Status</th>
							<th className='border px-4 py-2 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{fees.map((fee) => (
							<tr key={fee._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{fee.studentId}</td>
								<td className='border px-4 py-2'>{fee.amount}</td>
								<td className='border px-4 py-2'>{fee.dueDate}</td>
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
												fee.status === 'Pending' ? 'Paid' : 'Pending'
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
								<option value='Pending'>Pending</option>
								<option value='Paid'>Paid</option>
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
