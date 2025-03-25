import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// User Management apis
export const getAllTeachers = () => api.get('/users/teachers');
export const getTeacherById = (id) => api.get(`/users/teachers/${id}`);
export const deleteTeacher = (id) => api.delete(`/users/teachers/${id}`);
export const getAllStudents = () => api.get('/users/students');
export const getStudentById = (id) => api.get(`/users/students/${id}`);
export const deleteStudent = (id) => api.delete(`/users/students/${id}`);
export const getAllParents = () => api.get('/users/parents');
export const getParentById = (id) => api.get(`/users/parents/${id}`);
export const deleteParent = (id) => api.delete(`/users/parents/${id}`);
export const getUserRoles = () => api.get('/users/roles');
export const updateUserRole = (id, role) =>
	api.put(`/users/roles/${id}`, { role });

// Tuition apis
export const getAllGrades = () => api.get('/tution/grades');
export const getGradeById = (id) => api.get(`/tution/grades/${id}`);
export const updateGrade = (id, data) => api.put(`/tution/grades/${id}`, data);
export const deleteGrade = (id) => api.delete(`/tution/grades/${id}`);

export const getAllSubjects = () => api.get('/tution/subjects');
export const getSubjectById = (id) => api.get(`/tution/subjects/${id}`);
export const updateSubject = (id, data) =>
	api.put(`/tution/subjects/${id}`, data);
export const deleteSubject = (id) => api.delete(`/tution/subjects/${id}`);

export const getAllGradeSubjects = () => api.get('/tution/grade-subject');
export const getGradeSubjectById = (id) =>
	api.get(`/tution/grade-subject/${id}`);
export const updateGradeSubject = (id, data) =>
	api.put(`/tution/grade-subject/${id}`, data);
export const deleteGradeSubject = (id) =>
	api.delete(`/tution/grade-subject/${id}`);

export const getAllStudentSubjects = () => api.get('/tution/student-subject');
export const getAllAttendance = () => api.get('/tution/attendance');

// Fee apis
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

// Report apis
export const getUserReport = () => api.get('/reports/users');
export const getTuitionReport = () => api.get('/reports/tuition');
export const getFeeReport = () => api.get('/reports/fees');
export const getAttendanceReport = () => api.get('/reports/attendance');


export default api;