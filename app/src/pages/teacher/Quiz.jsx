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
} from 'lucide-react';
import {
	getAllQuizzes,
	createQuiz as addQuiz,
	updateQuiz,
	deleteQuiz,
	getAllGradeSubjects,
} from '../../lib/axios.js';

const Quiz = () => {
	const [quizzes, setQuizzes] = useState([]);
	const [gradeSubjects, setGradeSubjects] = useState([]);
	const [selectedQuiz, setSelectedQuiz] = useState(null);
	const [editData, setEditData] = useState({
		title: '',
		gradeSubjectId: '',
		duration: '',
		status: 'draft',
	});
	const [newQuizData, setNewQuizData] = useState({
		title: '',
		gradeSubjectId: '',
		duration: '',
		status: 'draft',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [expandedRows, setExpandedRows] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [quizzesRes, gradeSubjectsRes] = await Promise.all([
					getAllQuizzes(),
					getAllGradeSubjects(),
				]);
				setQuizzes(
					Array.isArray(quizzesRes.data.data) ? quizzesRes.data.data : []
				);
				setGradeSubjects(
					Array.isArray(gradeSubjectsRes.data.data)
						? gradeSubjectsRes.data.data
						: []
				);
				setError(null);
			} catch (err) {
				setError('Failed to load quizzes.');
				console.error('Error:', err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const toggleRowExpand = (id) => {
		setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const handleViewDetails = (quiz) => {
		setSelectedQuiz(quiz);
		setEditData({
			title: quiz.title,
			gradeSubjectId: quiz.gradeSubjectId?._id || quiz.gradeSubjectId || '',
			duration: quiz.duration || '',
			status: quiz.status || 'draft',
		});
	};

	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			const quizData = {
				...newQuizData,
				duration: parseInt(newQuizData.duration) || undefined,
			};
			const res = await addQuiz(quizData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to add quiz');
			setQuizzes([...quizzes, res.data.data]);
			setNewQuizData({
				title: '',
				gradeSubjectId: '',
				duration: '',
				status: 'draft',
			});
			setShowAddForm(false);
			setError(null);
		} catch (err) {
			setError(err.message || 'Failed to add quiz.');
			console.error('Error:', err);
		}
	};

	const handleUpdate = async (id) => {
		try {
			const quizData = {
				...editData,
				duration: parseInt(editData.duration) || undefined,
			};
			const res = await updateQuiz(id, quizData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to update');
			setQuizzes(
				quizzes.map((quiz) => (quiz._id === id ? res.data.data : quiz))
			);
			setSelectedQuiz(null);
			setEditData({
				title: '',
				gradeSubjectId: '',
				duration: '',
				status: 'draft',
			});
			setError(null);
		} catch (err) {
			setError(err.message || 'Failed to update quiz.');
			console.error('Error:', err);
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this quiz?')) {
			try {
				await deleteQuiz(id);
				setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
				setSelectedQuiz(null);
				setError(null);
			} catch (err) {
				setError('Failed to delete quiz.');
				console.error('Error:', err);
			}
		}
	};

	const StatusBadge = ({ status }) => {
		const statusMap = {
			draft: { color: 'bg-gray-100 text-gray-800', text: 'Draft' },
			published: { color: 'bg-green-100 text-green-800', text: 'Published' },
			closed: { color: 'bg-red-100 text-red-800', text: 'Closed' },
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
				<p className='mt-4 text-lg text-gray-600'>Loading quizzes...</p>
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
							Quizzes
						</h1>
						<p className='text-gray-600 mt-1'>
							Manage quizzes for your classes
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
								Add Quiz
							</>
						)}
					</motion.button>
				</div>
			</motion.div>

			{/* Add Quiz Form */}
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
							Add New Quiz
						</h2>
						<form onSubmit={handleAdd} className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Title
									</label>
									<input
										type='text'
										value={newQuizData.title}
										onChange={(e) =>
											setNewQuizData({
												...newQuizData,
												title: e.target.value,
											})
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										placeholder='e.g. Algebra Quiz'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Grade-Subject
									</label>
									<select
										value={newQuizData.gradeSubjectId}
										onChange={(e) =>
											setNewQuizData({
												...newQuizData,
												gradeSubjectId: e.target.value,
											})
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										required>
										<option value=''>Select Grade-Subject</option>
										{gradeSubjects.map((gs) => (
											<option key={gs._id} value={gs._id}>
												{gs.name} (Grade {gs.grade})
											</option>
										))}
									</select>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Duration (minutes)
									</label>
									<input
										type='number'
										value={newQuizData.duration}
										onChange={(e) =>
											setNewQuizData({
												...newQuizData,
												duration: e.target.value,
											})
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
										placeholder='e.g. 30'
										min='1'
										required
									/>
								</div>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>
										Status
									</label>
									<select
										value={newQuizData.status}
										onChange={(e) =>
											setNewQuizData({
												...newQuizData,
												status: e.target.value,
											})
										}
										className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'>
										<option value='draft'>Draft</option>
										<option value='published'>Published</option>
										<option value='closed'>Closed</option>
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
									Add Quiz
								</motion.button>
							</div>
						</form>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Quizzes Table */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Quiz Details
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Duration
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Status
								</th>
								<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{quizzes.length === 0 ? (
								<tr>
									<td
										colSpan='4'
										className='px-6 py-4 text-center text-gray-500'>
										No quizzes found
									</td>
								</tr>
							) : (
								quizzes.map((quiz) => (
									<React.Fragment key={quiz._id}>
										<tr
											className={`hover:bg-gray-50 cursor-pointer ${
												expandedRows[quiz._id] ? 'bg-gray-50' : ''
											}`}
											onClick={() => toggleRowExpand(quiz._id)}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<div className='flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center'>
														<BookOpen className='h-5 w-5 text-indigo-600' />
													</div>
													<div className='ml-4'>
														<div className='text-sm font-medium text-gray-900'>
															{quiz.title}
														</div>
														<div className='text-sm text-gray-500'>
															{quiz.gradeSubjectId?.name || quiz.gradeSubjectId}
														</div>
													</div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>
													{quiz.duration ? `${quiz.duration} min` : 'N/A'}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<StatusBadge status={quiz.status} />
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<div className='flex justify-end items-center space-x-2'>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleViewDetails(quiz);
														}}
														className='text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50'
														title='Edit'>
														<Edit className='h-5 w-5' />
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleDelete(quiz._id);
														}}
														className='text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50'
														title='Delete'>
														<Trash2 className='h-5 w-5' />
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															toggleRowExpand(quiz._id);
														}}
														className='text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100'>
														{expandedRows[quiz._id] ? (
															<ChevronUp className='h-5 w-5' />
														) : (
															<ChevronDown className='h-5 w-5' />
														)}
													</button>
												</div>
											</td>
										</tr>
										<AnimatePresence>
											{expandedRows[quiz._id] && (
												<motion.tr
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: 'auto' }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.2 }}
													className='bg-gray-50'>
													<td colSpan='4' className='px-6 py-4'>
														<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
															<div>
																<h4 className='font-medium text-gray-900'>
																	Details
																</h4>
																<p className='text-gray-500 mt-1'>
																	<span className='font-medium'>Title:</span>{' '}
																	{quiz.title}
																</p>
															</div>
															<div>
																<h4 className='font-medium text-gray-900'>
																	Quiz Info
																</h4>
																<p className='text-gray-500 mt-1'>
																	<span className='font-medium'>
																		Grade-Subject:
																	</span>{' '}
																	{quiz.gradeSubjectId?.name ||
																		quiz.gradeSubjectId}
																</p>
																<p className='text-gray-500'>
																	<span className='font-medium'>Duration:</span>{' '}
																	{quiz.duration
																		? `${quiz.duration} min`
																		: 'N/A'}
																</p>
																<p className='text-gray-500'>
																	<span className='font-medium'>Status:</span>{' '}
																	<StatusBadge status={quiz.status} />
																</p>
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

			{/* Edit Quiz Modal */}
			<AnimatePresence>
				{selectedQuiz && (
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
										Edit Quiz
									</h2>
									<button
										onClick={() => setSelectedQuiz(null)}
										className='text-gray-400 hover:text-gray-500'>
										<X className='h-6 w-6' />
									</button>
								</div>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleUpdate(selectedQuiz._id);
									}}
									className='mt-6 space-y-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Title
											</label>
											<input
												type='text'
												value={editData.title}
												onChange={(e) =>
													setEditData({
														...editData,
														title: e.target.value,
													})
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												required
											/>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Grade-Subject
											</label>
											<select
												value={editData.gradeSubjectId}
												onChange={(e) =>
													setEditData({
														...editData,
														gradeSubjectId: e.target.value,
													})
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												required>
												<option value=''>Select Grade-Subject</option>
												{gradeSubjects.map((gs) => (
													<option key={gs._id} value={gs._id}>
														{gs.name} (Grade {gs.grade})
													</option>
												))}
											</select>
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700 mb-1'>
												Duration (minutes)
											</label>
											<input
												type='number'
												value={editData.duration}
												onChange={(e) =>
													setEditData({
														...editData,
														duration: e.target.value,
													})
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
												min='1'
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
													setEditData({
														...editData,
														status: e.target.value,
													})
												}
												className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'>
												<option value='draft'>Draft</option>
												<option value='published'>Published</option>
												<option value='closed'>Closed</option>
											</select>
										</div>
									</div>
									<div className='flex justify-end space-x-3 pt-4'>
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											type='button'
											onClick={() => setSelectedQuiz(null)}
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

export default Quiz;
