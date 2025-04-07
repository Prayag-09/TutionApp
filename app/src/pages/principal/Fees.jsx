import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	DollarSign,
	Plus,
	Edit,
	Trash2,
	Check,
	X,
	Loader2,
	AlertCircle,
	ChevronDown,
	ChevronUp,
} from 'lucide-react';
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
		gradeId: '',
		subjectId: '',
		teacherId: '',
		amount: '',
		status: 'pending',
	});
	const [newFeeData, setNewFeeData] = useState({
		feeName: '',
		gradeId: '',
		subjectId: '',
		teacherId: '',
		amount: '',
		status: 'pending',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [expandedRows, setExpandedRows] = useState({});

	// Fetch all fees
	useEffect(() => {
		const fetchFees = async () => {
			try {
				setLoading(true);
				const res = await getAllFees();
				setFees(res.data.fees || res.data.data);
				setError(null);
			} catch (err) {
				setError('Failed to load fees. Please try again later.');
				console.error('Error fetching fees:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchFees();
	}, []);

	// Toggle row expansion
	const toggleRowExpand = (id) => {
		setExpandedRows((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	// View/Edit fee details
	const handleViewDetails = (fee) => {
		setSelectedFee(fee);
		setEditData({
			feeName: fee.feeName,
			gradeId: fee.gradeId?._id || fee.gradeId || '',
			subjectId: fee.subjectId?._id || fee.subjectId || '',
			teacherId: fee.teacherId?._id || fee.teacherId || '',
			amount: fee.amount,
			status: fee.status || 'pending',
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
				status: 'pending',
			});
		} catch (err) {
			setError('Failed to update fee. Please try again.');
		}
	};

	// Update fee status
	const handleUpdateStatus = async (id, newStatus) => {
		try {
			const res = await updateFeeStatus(id, newStatus);
			setFees(fees.map((fee) => (fee._id === id ? res.data.data : fee)));
		} catch (err) {
			setError('Failed to update fee status. Please try again.');
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
				setError('Failed to delete fee. Please try again.');
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
				status: 'pending',
			});
			setShowAddForm(false);
		} catch (err) {
			setError('Failed to add fee. Please try again.');
		}
	};

	// Status badge component
	const StatusBadge = ({ status }) => {
		const statusMap = {
			pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
			paid: { color: 'bg-green-100 text-green-800', text: 'Paid' },
			canceled: { color: 'bg-red-100 text-red-800', text: 'Canceled' },
		};

		return (
			<span
				className={`px-2 py-1 rounded-full text-xs font-medium ${
					statusMap[status]?.color || 'bg-gray-100 text-gray-800'
				}`}>
				{statusMap[status]?.text || status}
			</span>
		);
	};

	if (loading) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[50vh]'>
				<Loader2 className='h-12 w-12 animate-spin text-indigo-600' />
				<p className='mt-4 text-lg text-gray-600'>Loading fee data...</p>
			</div>
		);
	}

	if (error) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md'>
				<div className='flex items-center'>
					<AlertCircle className='h-5 w-5 mr-2' />
					<p>{error}</p>
				</div>
				<button
					onClick={() => window.location.reload()}
					className='mt-2 text-sm text-red-600 hover:underline'>
					Try again
				</button>
			</motion.div>
		);
	}

	return (
		<div className='p-4 md:p-6 lg:p-8'>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}>
				<div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
					<div>
						<h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
							Fee Management
						</h1>
						<p className='text-gray-600 mt-1'>
							Manage all school fees and payments
						</p>
					</div>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => setShowAddForm(!showAddForm)}
						className={`mt-4 md:mt-0 px-4 py-2 rounded-lg flex items-center ${
							showAddForm
								? 'bg-gray-200 text-gray-800'
								: 'bg-indigo-600 text-white'
						}`}>
						{showAddForm ? (
							<>
								<X className='h-5 w-5 mr-2' />
								Cancel
							</>
						) : (
							<>
								<Plus className='h-5 w-5 mr-2' />
								Add Fee
							</>
						)}
					</motion.button>
				</div>
			</motion.div>

			{/* Add Fee Form */}
			<AnimatePresence>
				{showAddForm && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className='mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
						<h2 className='text-xl font-semibold mb-4 flex items-center'>
							<DollarSign className='h-5 w-5 mr-2 text-indigo-600' />
							Add New Fee
						</h2>
						<form onSubmit={handleAdd} className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Fee Name
									</label>
									<input
										type='text'
										value={newFeeData.feeName}
										onChange={(e) =>
											setNewFeeData({ ...newFeeData, feeName: e.target.value })
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										placeholder='e.g. Tuition Fee'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Amount
									</label>
									<div className='relative'>
										<span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
											$
										</span>
										<input
											type='number'
											value={newFeeData.amount}
											onChange={(e) =>
												setNewFeeData({ ...newFeeData, amount: e.target.value })
											}
											className='w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
											placeholder='0.00'
											min='0'
											step='0.01'
											required
										/>
									</div>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Grade
									</label>
									<input
										type='text'
										value={newFeeData.gradeId}
										onChange={(e) =>
											setNewFeeData({ ...newFeeData, gradeId: e.target.value })
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										placeholder='Grade ID'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Subject
									</label>
									<input
										type='text'
										value={newFeeData.subjectId}
										onChange={(e) =>
											setNewFeeData({
												...newFeeData,
												subjectId: e.target.value,
											})
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										placeholder='Subject ID'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Teacher
									</label>
									<input
										type='text'
										value={newFeeData.teacherId}
										onChange={(e) =>
											setNewFeeData({
												...newFeeData,
												teacherId: e.target.value,
											})
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										placeholder='Teacher ID'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Status
									</label>
									<select
										value={newFeeData.status}
										onChange={(e) =>
											setNewFeeData({ ...newFeeData, status: e.target.value })
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'>
										<option value='pending'>Pending</option>
										<option value='paid'>Paid</option>
										<option value='canceled'>Canceled</option>
									</select>
								</div>
							</div>
							<div className='flex justify-end space-x-3 pt-2'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									type='button'
									onClick={() => setShowAddForm(false)}
									className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'>
									Cancel
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									type='submit'
									className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center'>
									<Plus className='h-5 w-5 mr-2' />
									Add Fee
								</motion.button>
							</div>
						</form>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Fees Table */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th
									scope='col'
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Fee Details
								</th>
								<th
									scope='col'
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Amount
								</th>
								<th
									scope='col'
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Status
								</th>
								<th
									scope='col'
									className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{fees.length === 0 ? (
								<tr>
									<td
										colSpan='4'
										className='px-6 py-4 text-center text-gray-500'>
										No fees found
									</td>
								</tr>
							) : (
								fees.map((fee) => (
									<React.Fragment key={fee._id}>
										<tr
											className={`hover:bg-gray-50 cursor-pointer ${
												expandedRows[fee._id] ? 'bg-gray-50' : ''
											}`}
											onClick={() => toggleRowExpand(fee._id)}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<div className='flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center'>
														<DollarSign className='h-5 w-5 text-indigo-600' />
													</div>
													<div className='ml-4'>
														<div className='text-sm font-medium text-gray-900'>
															{fee.feeName}
														</div>
														<div className='text-sm text-gray-500'>
															{fee.gradeId?.gradeName || fee.gradeId} •{' '}
															{fee.subjectId?.subjectName || fee.subjectId}
														</div>
													</div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>
													${parseFloat(fee.amount).toFixed(2)}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<StatusBadge status={fee.status} />
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<div className='flex justify-end items-center space-x-2'>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleViewDetails(fee);
														}}
														className='text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50'
														title='Edit'>
														<Edit className='h-5 w-5' />
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleUpdateStatus(
																fee._id,
																fee.status === 'pending' ? 'paid' : 'pending'
															);
														}}
														className='text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50'
														title='Toggle Status'>
														{fee.status === 'pending' ? (
															<Check className='h-5 w-5' />
														) : (
															<X className='h-5 w-5' />
														)}
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleDelete(fee._id);
														}}
														className='text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50'
														title='Delete'>
														<Trash2 className='h-5 w-5' />
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															toggleRowExpand(fee._id);
														}}
														className='text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100'>
														{expandedRows[fee._id] ? (
															<ChevronUp className='h-5 w-5' />
														) : (
															<ChevronDown className='h-5 w-5' />
														)}
													</button>
												</div>
											</td>
										</tr>
										<AnimatePresence>
											{expandedRows[fee._id] && (
												<motion.tr
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.2 }}
													className='bg-gray-50'>
													<td colSpan='4' className='px-6 py-4'>
														<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
															<div>
																<h4 className='font-medium text-gray-900'>
																	Details
																</h4>
																<p className='text-gray-500 mt-1'>
																	{fee.feeName}
																</p>
																<p className='text-gray-500'>
																	Created:{' '}
																	{new Date(fee.createdAt).toLocaleDateString()}
																</p>
															</div>
															<div>
																<h4 className='font-medium text-gray-900'>
																	Associated With
																</h4>
																<p className='text-gray-500 mt-1'>
																	<span className='font-medium'>Grade:</span>{' '}
																	{fee.gradeId?.gradeName || fee.gradeId}
																</p>
																<p className='text-gray-500'>
																	<span className='font-medium'>Subject:</span>{' '}
																	{fee.subjectId?.subjectName || fee.subjectId}
																</p>
																<p className='text-gray-500'>
																	<span className='font-medium'>Teacher:</span>{' '}
																	{fee.teacherId?.name || fee.teacherId}
																</p>
															</div>
															<div>
																<h4 className='font-medium text-gray-900'>
																	Payment Info
																</h4>
																<p className='text-gray-500 mt-1'>
																	<span className='font-medium'>Amount:</span> $
																	{parseFloat(fee.amount).toFixed(2)}
																</p>
																<p className='text-gray-500'>
																	<span className='font-medium'>Status:</span>{' '}
																	<StatusBadge status={fee.status} />
																</p>
																{fee.updatedAt && (
																	<p className='text-gray-500'>
																		<span className='font-medium'>
																			Last Updated:
																		</span>{' '}
																		{new Date(
																			fee.updatedAt
																		).toLocaleDateString()}
																	</p>
																)}
															</div>
														</div>
													</td>
												</motion.tr>
											)}
										</AnimatePresence>
									</React.Fragment>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Edit Fee Modal */}
			<AnimatePresence>
				{selectedFee && (
					<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.2 }}
							className='bg-white rounded-xl shadow-xl w-full max-w-2xl'>
							<div className='p-6'>
								<div className='flex justify-between items-start'>
									<h2 className='text-xl font-semibold text-gray-900 flex items-center'>
										<Edit className='h-5 w-5 mr-2 text-indigo-600' />
										Edit Fee
									</h2>
									<button
										onClick={() => setSelectedFee(null)}
										className='text-gray-400 hover:text-gray-500'>
										<X className='h-6 w-6' />
									</button>
								</div>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleUpdate(selectedFee._id);
									}}
									className='mt-6 space-y-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Fee Name
											</label>
											<input
												type='text'
												value={editData.feeName}
												onChange={(e) =>
													setEditData({ ...editData, feeName: e.target.value })
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												required
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Amount
											</label>
											<div className='relative'>
												<span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
													$
												</span>
												<input
													type='number'
													value={editData.amount}
													onChange={(e) =>
														setEditData({ ...editData, amount: e.target.value })
													}
													className='w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
													min='0'
													step='0.01'
													required
												/>
											</div>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Grade
											</label>
											<input
												type='text'
												value={editData.gradeId}
												onChange={(e) =>
													setEditData({ ...editData, gradeId: e.target.value })
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												required
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Subject
											</label>
											<input
												type='text'
												value={editData.subjectId}
												onChange={(e) =>
													setEditData({
														...editData,
														subjectId: e.target.value,
													})
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												required
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Teacher
											</label>
											<input
												type='text'
												value={editData.teacherId}
												onChange={(e) =>
													setEditData({
														...editData,
														teacherId: e.target.value,
													})
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												required
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Status
											</label>
											<select
												value={editData.status}
												onChange={(e) =>
													setEditData({ ...editData, status: e.target.value })
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'>
												<option value='pending'>Pending</option>
												<option value='paid'>Paid</option>
												<option value='canceled'>Canceled</option>
											</select>
										</div>
									</div>
									<div className='flex justify-end space-x-3 pt-4'>
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											type='button'
											onClick={() => setSelectedFee(null)}
											className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'>
											Cancel
										</motion.button>
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											type='submit'
											className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center'>
											<Check className='h-5 w-5 mr-2' />
											Save Changes
										</motion.button>
									</div>
								</form>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Fees;
