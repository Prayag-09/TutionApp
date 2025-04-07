import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	BookOpen,
	Plus,
	Edit,
	Trash2,
	Check,
	X,
	Loader2,
	AlertCircle,
	ChevronDown,
	ChevronUp,
	Calendar,
	FileText,
	Award,
	User,
} from 'lucide-react';
import {
	getAllAssignments,
	createAssignment,
	updateAssignment,
	deleteAssignment,
} from '../../lib/axios';

const Assignments = () => {
	const [assignments, setAssignments] = useState([]);
	const [selectedAssignment, setSelectedAssignment] = useState(null);
	const [editData, setEditData] = useState({
		name: '',
		details: '',
		dueDate: '',
		maximumMark: '',
		status: 'Live',
	});
	const [newAssignmentData, setNewAssignmentData] = useState({
		name: '',
		gradeSubjectId: '',
		teacherId: '',
		details: '',
		maximumMark: '',
		status: 'Live',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [expandedRows, setExpandedRows] = useState({});

	// Fetch all assignments
	useEffect(() => {
		const fetchAssignments = async () => {
			try {
				setLoading(true);
				const res = await getAllAssignments();
				setAssignments(res.data.data);
				setError(null);
			} catch (err) {
				setError('Failed to load assignments. Please try again later.');
				console.error('Error fetching assignments:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchAssignments();
	}, []);

	// Toggle row expansion
	const toggleRowExpand = (id) => {
		setExpandedRows((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	// View/Edit assignment details
	const handleViewDetails = (assignment) => {
		setSelectedAssignment(assignment);
		setEditData({
			name: assignment.name,
			details: assignment.details,
			dueDate: assignment.dueDate
				? new Date(assignment.dueDate).toISOString().split('T')[0]
				: '',
			maximumMark: assignment.maximumMark,
			status: assignment.status || 'Live',
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
			setEditData({
				name: '',
				details: '',
				dueDate: '',
				maximumMark: '',
				status: 'Live',
			});
		} catch (err) {
			setError('Failed to update assignment. Please try again.');
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
				setError('Failed to delete assignment. Please try again.');
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
				status: 'Live',
			});
			setShowAddForm(false);
		} catch (err) {
			setError('Failed to add assignment. Please try again.');
		}
	};

	// Status badge component
	const StatusBadge = ({ status }) => {
		const statusMap = {
			Live: { color: 'bg-green-100 text-green-800', text: 'Live' },
			Archive: { color: 'bg-gray-100 text-gray-800', text: 'Archived' },
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

	// Format date for display
	const formatDate = (dateString) => {
		if (!dateString) return 'No due date';
		const options = { year: 'numeric', month: 'short', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	if (loading) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[50vh]'>
				<Loader2 className='h-12 w-12 animate-spin text-indigo-600' />
				<p className='mt-4 text-lg text-gray-600'>Loading assignments...</p>
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
							Assignment Management
						</h1>
						<p className='text-gray-600 mt-1'>
							Create and manage all assignments
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
								Add Assignment
							</>
						)}
					</motion.button>
				</div>
			</motion.div>

			{/* Add Assignment Form */}
			<AnimatePresence>
				{showAddForm && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className='mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
						<h2 className='text-xl font-semibold mb-4 flex items-center'>
							<BookOpen className='h-5 w-5 mr-2 text-indigo-600' />
							Create New Assignment
						</h2>
						<form onSubmit={handleAdd} className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Assignment Name
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
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										placeholder='e.g. Math Homework #1'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Maximum Mark
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
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										placeholder='100'
										min='0'
										step='1'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Grade-Subject ID
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
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										placeholder='Grade-Subject ID'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Teacher ID
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
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										placeholder='Teacher ID'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Due Date
									</label>
									<div className='relative'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<Calendar className='h-5 w-5 text-gray-400' />
										</div>
										<input
											type='date'
											value={newAssignmentData.dueDate}
											onChange={(e) =>
												setNewAssignmentData({
													...newAssignmentData,
													dueDate: e.target.value,
												})
											}
											className='w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										/>
									</div>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Status
									</label>
									<select
										value={newAssignmentData.status}
										onChange={(e) =>
											setNewAssignmentData({
												...newAssignmentData,
												status: e.target.value,
											})
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'>
										<option value='Live'>Live</option>
										<option value='Archive'>Archive</option>
									</select>
								</div>
								<div className='md:col-span-2'>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Assignment Details
									</label>
									<textarea
										value={newAssignmentData.details}
										onChange={(e) =>
											setNewAssignmentData({
												...newAssignmentData,
												details: e.target.value,
											})
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										rows='3'
										placeholder='Enter assignment details and instructions...'
									/>
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
									Create Assignment
								</motion.button>
							</div>
						</form>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Assignments Table */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th
									scope='col'
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Assignment
								</th>
								<th
									scope='col'
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Due Date
								</th>
								<th
									scope='col'
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Max Mark
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
							{assignments.length === 0 ? (
								<tr>
									<td
										colSpan='5'
										className='px-6 py-4 text-center text-gray-500'>
										No assignments found
									</td>
								</tr>
							) : (
								assignments.map((assignment) => (
									<React.Fragment key={assignment._id}>
										<tr
											className={`hover:bg-gray-50 cursor-pointer ${
												expandedRows[assignment._id] ? 'bg-gray-50' : ''
											}`}
											onClick={() => toggleRowExpand(assignment._id)}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<div className='flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center'>
														<BookOpen className='h-5 w-5 text-indigo-600' />
													</div>
													<div className='ml-4'>
														<div className='text-sm font-medium text-gray-900'>
															{assignment.name}
														</div>
														<div className='text-sm text-gray-500'>
															{assignment.gradeSubjectId?.name ||
																assignment.gradeSubjectId}
														</div>
													</div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<Calendar className='h-4 w-4 mr-1 text-gray-500' />
													<span className='text-sm text-gray-900'>
														{formatDate(assignment.dueDate)}
													</span>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<Award className='h-4 w-4 mr-1 text-gray-500' />
													<span className='text-sm text-gray-900'>
														{assignment.maximumMark}
													</span>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<StatusBadge status={assignment.status} />
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<div className='flex justify-end items-center space-x-2'>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleViewDetails(assignment);
														}}
														className='text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50'
														title='Edit'>
														<Edit className='h-5 w-5' />
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleDelete(assignment._id);
														}}
														className='text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50'
														title='Delete'>
														<Trash2 className='h-5 w-5' />
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															toggleRowExpand(assignment._id);
														}}
														className='text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100'>
														{expandedRows[assignment._id] ? (
															<ChevronUp className='h-5 w-5' />
														) : (
															<ChevronDown className='h-5 w-5' />
														)}
													</button>
												</div>
											</td>
										</tr>
										<AnimatePresence>
											{expandedRows[assignment._id] && (
												<motion.tr
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.2 }}
													className='bg-gray-50'>
													<td colSpan='5' className='px-6 py-4'>
														<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
															<div>
																<h4 className='font-medium text-gray-900'>
																	Details
																</h4>
																<p className='text-gray-500 mt-1'>
																	{assignment.details || 'No details provided'}
																</p>
															</div>
															<div>
																<h4 className='font-medium text-gray-900'>
																	Assigned To
																</h4>
																<p className='text-gray-500 mt-1'>
																	<span className='font-medium'>
																		Grade-Subject:
																	</span>{' '}
																	{assignment.gradeSubjectId?.name ||
																		assignment.gradeSubjectId}
																</p>
																<p className='text-gray-500'>
																	<span className='font-medium'>Teacher:</span>{' '}
																	{assignment.teacherId?.name ||
																		assignment.teacherId}
																</p>
															</div>
															<div>
																<h4 className='font-medium text-gray-900'>
																	Status
																</h4>
																<p className='text-gray-500 mt-1'>
																	<StatusBadge status={assignment.status} />
																</p>
																<p className='text-gray-500'>
																	<span className='font-medium'>Created:</span>{' '}
																	{new Date(
																		assignment.createdAt
																	).toLocaleDateString()}
																</p>
																{assignment.updatedAt && (
																	<p className='text-gray-500'>
																		<span className='font-medium'>
																			Last Updated:
																		</span>{' '}
																		{new Date(
																			assignment.updatedAt
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

			{/* Edit Assignment Modal */}
			<AnimatePresence>
				{selectedAssignment && (
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
										Edit Assignment
									</h2>
									<button
										onClick={() => setSelectedAssignment(null)}
										className='text-gray-400 hover:text-gray-500'>
										<X className='h-6 w-6' />
									</button>
								</div>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleUpdate(selectedAssignment._id);
									}}
									className='mt-6 space-y-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Assignment Name
											</label>
											<input
												type='text'
												value={editData.name}
												onChange={(e) =>
													setEditData({ ...editData, name: e.target.value })
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												required
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Maximum Mark
											</label>
											<input
												type='number'
												value={editData.maximumMark}
												onChange={(e) =>
													setEditData({
														...editData,
														maximumMark: e.target.value,
													})
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												min='0'
												step='1'
												required
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Due Date
											</label>
											<div className='relative'>
												<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
													<Calendar className='h-5 w-5 text-gray-400' />
												</div>
												<input
													type='date'
													value={editData.dueDate}
													onChange={(e) =>
														setEditData({
															...editData,
															dueDate: e.target.value,
														})
													}
													className='w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												/>
											</div>
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
												<option value='Live'>Live</option>
												<option value='Archive'>Archive</option>
											</select>
										</div>
										<div className='md:col-span-2'>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Assignment Details
											</label>
											<textarea
												value={editData.details}
												onChange={(e) =>
													setEditData({ ...editData, details: e.target.value })
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												rows='3'
											/>
										</div>
									</div>
									<div className='flex justify-end space-x-3 pt-4'>
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											type='button'
											onClick={() => setSelectedAssignment(null)}
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

export default Assignments;
