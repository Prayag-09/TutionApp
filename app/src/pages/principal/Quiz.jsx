// pages/principal/Quizzes.jsx
import React, { useState, useEffect } from 'react';

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

	// Placeholder data (since no API endpoints exist for quizzes)
	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				setLoading(true);
				// Replace this with actual API call when available
				const mockQuizzes = [
					{
						_id: '1',
						title: 'Math Quiz 1',
						description: '10 questions',
						dueDate: '2025-04-01',
						status: 'Live',
					},
					{
						_id: '2',
						title: 'Science Quiz 1',
						description: '15 questions',
						dueDate: '2025-04-05',
						status: 'Live',
					},
				];
				setQuizzes(mockQuizzes);
			} catch (err) {
				setError('Failed to load quizzes');
			} finally {
				setLoading(false);
			}
		};

		fetchQuizzes();
	}, []);

	const handleViewDetails = (quiz) => {
		setSelectedQuiz(quiz);
		setEditData({
			title: quiz.title,
			description: quiz.description,
			dueDate: quiz.dueDate,
			status: quiz.status,
		});
	};

	const handleUpdate = (id) => {
		// Replace this with actual API call when available
		const updatedQuiz = { _id: id, ...editData };
		setQuizzes(quizzes.map((quiz) => (quiz._id === id ? updatedQuiz : quiz)));
		setSelectedQuiz(null);
		setEditData({ title: '', description: '', dueDate: '', status: '' });
	};

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this quiz?')) {
			setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
			setSelectedQuiz(null);
		}
	};

	if (loading)
		return <div className='text-center text-gray-500'>Loading...</div>;
	if (error) return <div className='text-center text-red-500'>{error}</div>;

	return (
		<div className='quizzes'>
			<h1 className='text-2xl font-bold mb-6'>Manage Quizzes</h1>
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
						{quizzes.map((quiz) => (
							<tr key={quiz._id} className='hover:bg-gray-50'>
								<td className='border px-4 py-2'>{quiz.title}</td>
								<td className='border px-4 py-2'>{quiz.dueDate}</td>
								<td className='border px-4 py-2'>{quiz.status}</td>
								<td className='border px-4 py-2'>
									<button
										onClick={() => handleViewDetails(quiz)}
										className='bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600'>
										View/Edit
									</button>
									<button
										onClick={() => handleDelete(quiz._id)}
										className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedQuiz && (
				<div className='mt-6 bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>Quiz Details</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleUpdate(selectedQuiz._id);
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
							<button
								type='submit'
								className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
								Update Quiz
							</button>
							<button
								type='button'
								onClick={() => setSelectedQuiz(null)}
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

export default Quizzes;
