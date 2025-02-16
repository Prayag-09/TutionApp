import express from 'express';
import * as tutionController from '../controllers/tution-controller';
import { authenticate, authorize } from '../middlewares/auth';

const router = express.Router();

/* ---------- Grades ---------- */
// Add a new grade (only principal)
router.post('/grades/add', authenticate, authorize(['principal']), tutionController.addGrade);
// Get all grades (accessible by principal, teacher, or student)
router.get('/grades', authenticate, authorize(['principal', 'teacher', 'student']), tutionController.getAllGrades);
// Update grade status (e.g., Live/Archived)
router.put('/grades/:gradeId/status', authenticate, authorize(['principal']), tutionController.updateGradeStatus);

/* ---------- Grade-Subject ---------- */
// Add a new grade–subject relation (only principal)
router.post('/grade-subject/add', authenticate, authorize(['principal']), tutionController.addGradeSubject);
// Get all grade–subject relations (accessible by principal and teacher)
router.get('/grade-subject', authenticate, authorize(['principal', 'teacher']), tutionController.getAllGradeSubjects);
// Update grade–subject relation status
router.put('/grade-subject/:gradeSubjectId/status', authenticate, authorize(['principal']), tutionController.updateGradeSubjectStatus);

/* ---------- Subjects ---------- */
// Add a new subject (only principal)
router.post('/subjects/add', authenticate, authorize(['principal']), tutionController.addSubject);
// Get all subjects (accessible by principal, teacher, and student)
router.get('/subjects', authenticate, authorize(['principal', 'teacher', 'student']), tutionController.getAllSubjects);
// Update subject status
router.put('/subjects/:subjectId/status', authenticate, authorize(['principal']), tutionController.updateSubjectStatus);

/* ---------- Student-Subject ---------- */
// Add a new student–subject relation (accessible by principal and teacher)
router.post('/student-subject/add', authenticate, authorize(['principal', 'teacher']), tutionController.addStudentSubject);
// Get all student–subject relations
router.get('/student-subject', authenticate, authorize(['principal', 'teacher']), tutionController.getAllStudentSubjects);
// Update student–subject relation status
router.put('/student-subject/:studentSubjectId/status', authenticate, authorize(['principal', 'teacher']), tutionController.updateStudentSubjectStatus);

/* ---------- Attendance ---------- */
// Record attendance (accessible only by teacher)
router.post('/attendance/add', authenticate, authorize(['teacher']), tutionController.recordAttendance);
// Get all attendance records (accessible by principal and teacher)
router.get('/attendance', authenticate, authorize(['principal', 'teacher']), tutionController.getAllAttendance);
// Update attendance status
router.put('/attendance/:attendanceId/status', authenticate, authorize(['principal', 'teacher']), tutionController.updateAttendanceStatus);

export default router; 