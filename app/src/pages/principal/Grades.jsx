// Grades.jsx
import React, { useState, useEffect } from 'react';
import { getAllGrades, getGradeById, updateGrade, deleteGrade } from '../api';

const Grades = () => {
	const [grades, setGrades] = useState([]);
	const [selectedGrade, setSelectedGrade] = useState(null);
	const [editData, setEditData] = useState({
		name: '',
		description: '',
		status: '',
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchGrades = async () => {
			try {
				setLoading(true);
				const res = await getAllGrades();
				setGrades(res.data.data);
			} catch (err) {
				setError('Failed to load grades');
			} finally {
				setLoading(false);
			}
		};

		fetchGrades();
	}, []);

	const handleViewDetails = async (id) => {
		try {
			const res = await getGradeById(id);
			setSelectedGrade(res.data.data);
			setEditData({
				name: res.data.data.name,
				description: res.data.data.description || '',
				status: res.data.data.status,
			});
		} catch (err) {
			setError('Failed to load grade details');
		}
	};

	const handleUpdate = async (id) => {
		try {
			const res = await updateGrade(id, editData);
			setGrades(
				grades.map((grade) => (grade._id === id ? res.data.data : grade))
			);
			setSelectedGrade(null);
			setEditData({ name: '', description: '', status: '' });
		} catch (err) {
			setError('Failed to update grade');
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this grade?')) {
			try {
				await deleteGrade(id);
				setGrades(grades.filter((grade) => grade._id !== id));
				setSelectedGrade(null);
			} catch (err) {
				setError('Failed to delete grade');
			}
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className='grades'>
			<h1>Manage Grades</h1>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{grades.map((grade) => (
						<tr key={grade._id}>
							<td>{grade.name}</td>
							<td>{grade.status}</td>
							<td>
								<button onClick={() => handleViewDetails(grade._id)}>
									View/Edit
								</button>
								<button onClick={() => handleDelete(grade._id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{selectedGrade && (
				<div className='grade-details'>
					<h2>Grade Details</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleUpdate(selectedGrade._id);
						}}>
						<div>
							<label>Name:</label>
							<input
								type='text'
								value={editData.name}
								onChange={(e) =>
									setEditData({ ...editData, name: e.target.value })
								}
								required
							/>
						</div>
						<div>
							<label>Description:</label>
							<textarea
								value={editData.description}
								onChange={(e) =>
									setEditData({ ...editData, description: e.target.value })
								}
							/>
						</div>
						<div>
							<label>Status:</label>
							<select
								value={editData.status}
								onChange={(e) =>
									setEditData({ ...editData, status: e.target.value })
								}>
								<option value='Live'>Live</option>
								<option value='Archive'>Archive</option>
							</select>
						</div>
						<button type='submit'>Update Grade</button>
						<button type='button' onClick={() => setSelectedGrade(null)}>
							Cancel
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Grades;
