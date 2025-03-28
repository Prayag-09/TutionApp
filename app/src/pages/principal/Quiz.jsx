import React, { useState, useEffect } from 'react';
import {
	getAllQuizzes,
	getQuizById,
	updateQuiz,
	deleteQuiz,
} from '../../lib/axios';

const Quizzes = () => {
	const [quizzes, setQuizzes] = useState([]);
	const [selectedQuiz, setSelectedQuiz] = useState(null);
	const [editData, setEditData] = useState({
		title: '',
		description: '',
		dueDate: '',
		status: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				setLoading(true);
				const res = await getAllQuizzes();
				if (!res.data.success)
					throw new Error(res.data.message || 'Failed to fetch quizzes');
				setQuizzes(res.data.data);
			} catch (err) {
				setError(err.message || 'Failed to load quizzes');
			} finally {
				setLoading(false);
			}
		};

		fetchQuizzes();
	}, []);

	const handleViewDetails = async (id) => {
		try {
			const res = await getQuizById(id);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to fetch quiz');
			setSelectedQuiz(res.data.data);
			setEditData({
				title: res.data.data.title,
				description: res.data.data.description || '',
				dueDate: res.data.data.dueDate.split('T')[0], // Format for date input
				status: res.data.data.status,
			});
		} catch (err) {
			setError(err.message || 'Failed to load quiz details');
		}
	};

	const handleUpdate = async (e, id) => {
		e.preventDefault();
		try {
			const res = await updateQuiz(id, editData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to update quiz');
			setQuizzes(
				quizzes.map((quiz) => (quiz._id === id ? res.data.data : quiz))
			);
			setSelectedQuiz(null);
			setEditData({ title: '', description: '', dueDate: '', status: '' });
		} catch (err) {
			setError(err.message || 'Failed to update quiz');
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this quiz?')) {
			try {
				const res = await deleteQuiz(id);
				if (!res.data.success)
					throw new Error(res.data.message || 'Failed to delete quiz');
				setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
				setSelectedQuiz(null);
			} catch (err) {
				setError(err.message || 'Failed to delete quiz');
			}
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6 text-gray-800'>Manage Quizzes</h1>
			<div className='bg-white p-6 rounded-lg shadow-lg'>
				<table className='min-w-full border-collapse'>
					<thead>
						<tr className='bg-gray-200'>
							<th className='border px-6 py-3 text-left text-gray-700'>
								Title
							</th>
							<th className='border px-6 py-3 text-left text-gray-700'>
								Due Date
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
						{quizzes.map((quiz) => (
							<tr key={quiz._id} className='hover:bg-gray-50 transition-colors'>
								<td className='border px-6 py-3'>{quiz.title}</td>
								<td className='border px-6 py-3'>
									{quiz.dueDate.split('T')[0]}
								</td>
								<td className='border px-6 py-3'>{quiz.status}</td>
								<td className='border px-6 py-3 space-x-2'>
									<button
										onClick={() => handleViewDetails(quiz._id)}
										className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>
										Edit
									</button>
									<button
										onClick={() => handleDelete(quiz._id)}
										className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedQuiz && (
				<div className='mt-8 bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
						Edit Quiz
					</h2>
					<form
						onSubmit={(e) => handleUpdate(e, selectedQuiz._id)}
						className='space-y-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Title
							</label>
							<input
								type='text'
								value={editData.title}
								onChange={(e) =>
									setEditData({ ...editData, title: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Description
							</label>
							<textarea
								value={editData.description}
								onChange={(e) =>
									setEditData({ ...editData, description: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Due Date
							</label>
							<input
								type='date'
								value={editData.dueDate}
								onChange={(e) =>
									setEditData({ ...editData, dueDate: e.target.value })
								}
								className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
								required
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Status
							</label>
							<select
								value={editData.status}
								onChange={(e) =>
									setEditData({ ...editData, status: e.target.value })
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
								Update
							</button>
							<button
								type='button'
								onClick={() => setSelectedQuiz(null)}
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

export default Quizzes;
