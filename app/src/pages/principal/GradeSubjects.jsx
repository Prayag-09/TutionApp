import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import {
	getAllGradeSubjects,
	getGradeSubjectById,
	createGradeSubject,
	updateGradeSubject,
	deleteGradeSubject,
	getAllGrades,
	getAllSubjects,
} from '../../lib/axios';
import {
	FiEdit2,
	FiTrash2,
	FiPlus,
	FiX,
	FiCheck,
	FiLoader,
} from 'react-icons/fi';

const GradeSubjects = () => {
	const [gradeSubjects, setGradeSubjects] = useState([]);
	const [selectedGradeSubject, setSelectedGradeSubject] = useState(null);
	const [editData, setEditData] = useState({
		gradeId: null,
		subjectId: null,
		status: 'Live',
	});
	const [newData, setNewData] = useState({
		gradeId: null,
		subjectId: null,
		status: 'Live',
	});
	const [gradeOptions, setGradeOptions] = useState([]);
	const [subjectOptions, setSubjectOptions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Fetch all data
	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const [gsRes, gradesRes, subjectsRes] = await Promise.all([
				getAllGradeSubjects(),
				getAllGrades(),
				getAllSubjects(),
			]);

			if (
				!gsRes.data.success ||
				!gradesRes.data.success ||
				!subjectsRes.data.success
			) {
				throw new Error(
					gsRes.data.message ||
						gradesRes.data.message ||
						subjectsRes.data.message ||
						'Failed to fetch data'
				);
			}

			setGradeSubjects(gsRes.data.data);
			setGradeOptions(
				gradesRes.data.data.map((grade) => ({
					value: grade._id,
					label: grade.name,
				}))
			);
			setSubjectOptions(
				subjectsRes.data.data.map((subject) => ({
					value: subject._id,
					label: subject.name,
				}))
			);
		} catch (err) {
			setError(err.message || 'Failed to load data');
			console.error('Fetch error:', err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	// Handle view details for editing
	const handleViewDetails = async (id) => {
		try {
			setLoading(true);
			const res = await getGradeSubjectById(id);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to fetch details');

			const data = res.data.data;
			setSelectedGradeSubject(data);
			setEditData({
				gradeId: {
					value: data.gradeId._id,
					label: data.gradeId.name,
				},
				subjectId: {
					value: data.subjectId._id,
					label: data.subjectId.name,
				},
				status: data.status || 'Live',
			});
		} catch (err) {
			setError(err.message || 'Failed to load details');
			console.error('Details error:', err);
		} finally {
			setLoading(false);
		}
	};

	// Add new grade-subject
	const handleAdd = async (e) => {
		e.preventDefault();
		if (!newData.gradeId || !newData.subjectId) {
			setError('Please select both grade and subject');
			return;
		}

		try {
			setIsSubmitting(true);
			setError(null);

			const formattedData = {
				gradeId: newData.gradeId.value,
				subjectId: newData.subjectId.value,
				status: newData.status,
			};

			const res = await createGradeSubject(formattedData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to add');

			setGradeSubjects([...gradeSubjects, res.data.data]);
			setNewData({ gradeId: null, subjectId: null, status: 'Live' });
			setShowAddForm(false);
		} catch (err) {
			setError(err.message || 'Failed to add mapping');
			console.error('Add error:', err);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Update grade-subject
	const handleUpdate = async (e, id) => {
		e.preventDefault();
		try {
			setIsSubmitting(true);
			setError(null);

			const formattedData = {
				gradeId: editData.gradeId.value,
				subjectId: editData.subjectId.value,
				status: editData.status,
			};

			const res = await updateGradeSubject(id, formattedData);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to update');

			setGradeSubjects(
				gradeSubjects.map((gs) => (gs._id === id ? res.data.data : gs))
			);
			setSelectedGradeSubject(null);
		} catch (err) {
			setError(err.message || 'Failed to update');
			console.error('Update error:', err);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Delete grade-subject
	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this mapping?'))
			return;

		try {
			setIsSubmitting(true);
			const res = await deleteGradeSubject(id);
			if (!res.data.success)
				throw new Error(res.data.message || 'Failed to delete');

			setGradeSubjects(gradeSubjects.filter((gs) => gs._id !== id));
			if (selectedGradeSubject?._id === id) {
				setSelectedGradeSubject(null);
			}
		} catch (err) {
			setError(err.message || 'Failed to delete');
			console.error('Delete error:', err);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Reset forms
	const resetForms = () => {
		setSelectedGradeSubject(null);
		setShowAddForm(false);
		setEditData({ gradeId: null, subjectId: null, status: 'Live' });
		setNewData({ gradeId: null, subjectId: null, status: 'Live' });
		setError(null);
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center h-64'>
				<FiLoader className='animate-spin text-3xl text-blue-500' />
			</div>
		);
	}

	if (error) {
		return (
			<div className='bg-red-50 border-l-4 border-red-500 p-4 mb-6'>
				<div className='flex items-center'>
					<div className='flex-shrink-0'>
						<FiX className='h-5 w-5 text-red-500' />
					</div>
					<div className='ml-3'>
						<p className='text-sm text-red-700'>{error}</p>
						<button
							onClick={fetchData}
							className='mt-2 text-sm text-red-500 hover:text-red-700'>
							Try again
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='container mx-auto p-4 max-w-6xl'>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
					Grade-Subject Mappings
				</h1>
				{!selectedGradeSubject && !showAddForm && (
					<button
						onClick={() => setShowAddForm(true)}
						className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors duration-200'>
						<FiPlus className='h-5 w-5' />
						Add Mapping
					</button>
				)}
			</div>

			{/* Forms */}
			{(showAddForm || selectedGradeSubject) && (
				<div className='bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-xl font-semibold text-gray-800'>
							{showAddForm ? 'Add New Mapping' : 'Edit Mapping'}
						</h2>
						<button
							onClick={resetForms}
							className='text-gray-500 hover:text-gray-700'>
							<FiX className='h-5 w-5' />
						</button>
					</div>

					<form
						onSubmit={
							showAddForm
								? handleAdd
								: (e) => handleUpdate(e, selectedGradeSubject._id)
						}
						className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Grade *
								</label>
								<Select
									options={gradeOptions}
									value={showAddForm ? newData.gradeId : editData.gradeId}
									onChange={(selected) =>
										showAddForm
											? setNewData({ ...newData, gradeId: selected })
											: setEditData({ ...editData, gradeId: selected })
									}
									className='react-select-container'
									classNamePrefix='react-select'
									placeholder='Select grade...'
									isClearable
									required
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Subject *
								</label>
								<Select
									options={subjectOptions}
									value={showAddForm ? newData.subjectId : editData.subjectId}
									onChange={(selected) =>
										showAddForm
											? setNewData({ ...newData, subjectId: selected })
											: setEditData({ ...editData, subjectId: selected })
									}
									className='react-select-container'
									classNamePrefix='react-select'
									placeholder='Select subject...'
									isClearable
									required
								/>
							</div>
						</div>

						<div className='w-full md:w-1/2'>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Status
							</label>
							<select
								value={showAddForm ? newData.status : editData.status}
								onChange={(e) =>
									showAddForm
										? setNewData({ ...newData, status: e.target.value })
										: setEditData({ ...editData, status: e.target.value })
								}
								className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500'>
								<option value='Live'>Live</option>
								<option value='Archive'>Archive</option>
							</select>
						</div>

						<div className='flex justify-end space-x-3 pt-4'>
							<button
								type='button'
								onClick={resetForms}
								className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'>
								Cancel
							</button>
							<button
								type='submit'
								disabled={isSubmitting}
								className='flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-70'>
								{isSubmitting ? (
									<FiLoader className='animate-spin h-5 w-5' />
								) : showAddForm ? (
									<>
										<FiCheck className='h-5 w-5' />
										Add Mapping
									</>
								) : (
									<>
										<FiCheck className='h-5 w-5' />
										Update
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Grade-Subjects Table */}
			{!selectedGradeSubject && !showAddForm && (
				<div className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Grade
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Subject
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
								{gradeSubjects.length > 0 ? (
									gradeSubjects.map((gs) => (
										<tr
											key={gs._id}
											className='hover:bg-gray-50 transition-colors'>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm font-medium text-gray-900'>
													{gradeOptions.find(
														(opt) => opt.value === gs.gradeId?._id
													)?.label ||
														gs.gradeId?.name ||
														'N/A'}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>
													{subjectOptions.find(
														(opt) => opt.value === gs.subjectId?._id
													)?.label ||
														gs.subjectId?.name ||
														'N/A'}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<span
													className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
														gs.status === 'Live'
															? 'bg-green-100 text-green-800'
															: 'bg-gray-100 text-gray-800'
													}`}>
													{gs.status}
												</span>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<div className='flex justify-end space-x-2'>
													<button
														onClick={() => handleViewDetails(gs._id)}
														className='text-blue-600 hover:text-blue-900 transition-colors'
														title='Edit'>
														<FiEdit2 className='h-5 w-5' />
													</button>
													<button
														onClick={() => handleDelete(gs._id)}
														className='text-red-600 hover:text-red-900 transition-colors'
														title='Delete'>
														<FiTrash2 className='h-5 w-5' />
													</button>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan='4'
											className='px-6 py-4 text-center text-sm text-gray-500'>
											No grade-subject mappings found. Add one to get started.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default GradeSubjects;
