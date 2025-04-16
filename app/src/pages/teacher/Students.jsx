import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	UserCheck,
	Loader2,
	AlertCircle,
	ChevronDown,
	ChevronUp,
} from 'lucide-react';
import { getAllStudents, getAllGradeSubjects } from '../../lib/axios.js';

const Students = () => {
	const [students, setStudents] = useState([]);
	const [gradeSubjects, setGradeSubjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [expandedRows, setExpandedRows] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [studentsRes, gradeSubjectsRes] = await Promise.all([
					getAllStudents(),
					getAllGradeSubjects(),
				]);
				setStudents(
					Array.isArray(studentsRes.data.data) ? studentsRes.data.data : []
				);
				setGradeSubjects(
					Array.isArray(gradeSubjectsRes.data.data)
						? gradeSubjectsRes.data.data
						: []
				);
				setError(null);
			} catch (err) {
				setError('Failed to load students.');
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

	if (loading) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[50vh]'>
				<Loader2 className='h-12 w-12 animate-spin text-indigo-600' />
				<p className='mt-4 text-lg text-gray-600'>Loading students...</p>
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
				<div className='mb-6'>
					<h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
						Students
					</h1>
					<p className='text-gray-600 mt-1'>View students in your classes</p>
				</div>
			</motion.div>

			{/* Students Table */}
			<div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Student Details
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Grade-Subject
								</th>
								<th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{students.length === 0 ? (
								<tr>
									<td
										colSpan='3'
										className='px-6 py-4 text-center text-gray-500'>
										No students found
									</td>
								</tr>
							) : (
								students.map((student) => (
									<React.Fragment key={student._id}>
										<tr
											className={`hover:bg-gray-50 cursor-pointer ${
												expandedRows[student._id] ? 'bg-gray-50' : ''
											}`}
											onClick={() => toggleRowExpand(student._id)}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<div className='flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center'>
														<UserCheck className='h-5 w-5 text-green-600' />
													</div>
													<div className='ml-4'>
														<div className='text-sm font-medium text-gray-900'>
															{student.name}
														</div>
														<div className='text-sm text-gray-500'>
															{student.email}
														</div>
													</div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>
													{(student.gradeSubjectIds || [])
														.map((gsId) => {
															const gs = gradeSubjects.find(
																(g) => g._id === gsId
															);
															return gs
																? `${gs.name} (Grade ${gs.grade})`
																: gsId;
														})
														.join(', ')}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
												<button
													onClick={(e) => {
														e.stopPropagation();
														toggleRowExpand(student._id);
													}}
													className='text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100'>
													{expandedRows[student._id] ? (
														<ChevronUp className='h-5 w-5' />
													) : (
														<ChevronDown className='h-5 w-5' />
													)}
												</button>
											</td>
										</tr>
										{expandedRows[student._id] && (
											<motion.tr
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.2 }}
												className='bg-gray-50'>
												<td colSpan='3' className='px-6 py-4'>
													<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
														<div>
															<h4 className='font-medium text-gray-900'>
																Details
															</h4>
															<p className='text-gray-500 mt-1'>
																<span className='font-medium'>Name:</span>{' '}
																{student.name}
															</p>
															<p className='text-gray-500'>
																<span className='font-medium'>Email:</span>{' '}
																{student.email}
															</p>
														</div>
														<div>
															<h4 className='font-medium text-gray-900'>
																Enrollment
															</h4>
															<p className='text-gray-500 mt-1'>
																<span className='font-medium'>
																	Grade-Subjects:
																</span>{' '}
																{(student.gradeSubjectIds || [])
																	.map((gsId) => {
																		const gs = gradeSubjects.find(
																			(g) => g._id === gsId
																		);
																		return gs
																			? `${gs.name} (Grade ${gs.grade})`
																			: gsId;
																	})
																	.join(', ') || 'N/A'}
															</p>
														</div>
													</div>
												</td>
											</motion.tr>
										)}
									</React.Fragment>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Students;
