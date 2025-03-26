import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// User Management APIs
export const getAllTeachers = () => api.get('/users/teachers');
export const getTeacherById = (id) => api.get(`/users/teachers/${id}`);
export const createTeacher = (data) => api.post('/users/teachers', data); // Added
export const deleteTeacher = (id) => api.delete(`/users/teachers/${id}`);

export const getAllStudents = () => api.get('/users/students');
export const getStudentById = (id) => api.get(`/users/students/${id}`);
export const createStudent = (data) => api.post('/users/students', data); // Added
export const deleteStudent = (id) => api.delete(`/users/students/${id}`);

export const getAllParents = () => api.get('/users/parents');
export const getParentById = (id) => api.get(`/users/parents/${id}`);
export const createParent = (data) => api.post('/users/parents', data); // Added
export const deleteParent = (id) => api.delete(`/users/parents/${id}`);

export const getUserRoles = () => api.get('/users/roles');
// Removed updateUserRole as per feedback: export const updateUserRole = (id, role) => api.put(`/users/roles/${id}`, { role });

// Tuition APIs
export const getAllGrades = () => api.get('/tution/grades');
export const getGradeById = (id) => api.get(`/tution/grades/${id}`);
export const createGrade = (data) => api.post('/tution/grades/add', data); // Added
export const updateGrade = (id, data) => api.put(`/tution/grades/${id}`, data);
export const deleteGrade = (id) => api.delete(`/tution/grades/${id}`);

export const getAllSubjects = () => api.get('/tution/subjects');
export const getSubjectById = (id) => api.get(`/tution/subjects/${id}`);
export const createSubject = (data) => api.post('/tution/subjects/add', data); // Added
export const updateSubject = (id, data) =>
	api.put(`/tution/subjects/${id}`, data);
export const deleteSubject = (id) => api.delete(`/tution/subjects/${id}`);

export const getAllGradeSubjects = () => api.get('/tution/grade-subject');
export const getGradeSubjectById = (id) =>
	api.get(`/tution/grade-subject/${id}`);
export const createGradeSubject = (data) =>
	api.post('/tution/grade-subject/add', data); // Added
export const updateGradeSubject = (id, data) =>
	api.put(`/tution/grade-subject/${id}`, data);
export const deleteGradeSubject = (id) =>
	api.delete(`/tution/grade-subject/${id}`);

export const getAllStudentSubjects = () => api.get('/tution/student-subject');
export const createStudentSubject = (data) =>
	api.post('/tution/student-subject/add', data); // Added

export const getAllAttendance = () => api.get('/tution/attendance');
export const recordAttendance = (data) =>
	api.post('/tution/attendance/add', data); // Added

// Assignment APIs
export const getAllAssignments = () => api.get('/tution/assignments');
export const getAssignmentById = (id) => api.get(`/tution/assignments/${id}`);
export const createAssignment = (data) =>
	api.post('/tution/assignments/add', data); // Added
export const updateAssignment = (id, data) =>
	api.put(`/tution/assignments/${id}`, data);
export const deleteAssignment = (id) => api.delete(`/tution/assignments/${id}`);

// Quiz APIs
export const getAllQuizzes = () => api.get('/tution/quizzes');
export const getQuizById = (id) => api.get(`/tution/quizzes/${id}`);
export const createQuiz = (data) => api.post('/tution/quizzes/add', data); // Added
export const updateQuiz = (id, data) => api.put(`/tution/quizzes/${id}`, data);
export const deleteQuiz = (id) => api.delete(`/tution/quizzes/${id}`);

// QuizStudent APIs
export const getAllQuizStudents = () => api.get('/tution/quiz-student');
export const getQuizStudentById = (id) => api.get(`/tution/quiz-student/${id}`);
export const createQuizStudent = (data) =>
	api.post('/tution/quiz-student/add', data); // Added
export const updateQuizStudent = (id, data) =>
	api.put(`/tution/quiz-student/${id}`, data);

// Fee APIs
export const addFee = (data) => api.post('/fees/add', data);
export const getAllFees = () => api.get('/fees');
export const updateFeeStatus = (id, status) =>
	api.put(`/fees/${id}/status`, { status });
export const updateFee = (id, data) => api.put(`/fees/${id}`, data);
export const deleteFee = (id) => api.delete(`/fees/${id}`);

export const createFeeRemittance = (data) =>
	api.post('/fees/remittance/add', data);
export const getAllFeeRemittances = () => api.get('/fees/remittance');
export const getRemittancesByStudent = (studentId) =>
	api.get(`/fees/remittance/student/${studentId}`);
export const getRemittanceById = (id) => api.get(`/fees/remittance/${id}`);
export const deleteFeeRemittance = (id) => api.delete(`/fees/remittance/${id}`);

// Report APIs
export const getUserReport = () => api.get('/reports/users');
export const getTuitionReport = () => api.get('/reports/tuition');
export const getFeeReport = () => api.get('/reports/fees');
export const getAttendanceReport = () => api.get('/reports/attendance');
export const getAttendanceByStudent = (studentId) =>
	api.get(`/reports/attendance/student/${studentId}`);
export const getMarksReport = () => api.get('/reports/marks');
export const getFeesByStudent = (studentId) =>
	api.get(`/fees/student/${studentId}`);
export const createNote = (data) => api.post('/tution/notes/add', data);
export const getAllNotes = () => api.get('/tution/notes');
export const getNoteById = (id) => api.get(`/tution/notes/${id}`);

export default api;
